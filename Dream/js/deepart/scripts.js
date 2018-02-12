var imageBinary;
var styles;
var resultCheck;
var submissionId;
var maxImageSize;

var deepArtEffectsClient = apigClientFactory.newClient({
	apiKey: 'heWWR9Nefi3lBTo5XUvG19FqcicgJXI18OiLnet3',
	accessKey: 'AKIAIDUWEGLYZMSLZNDQ',
    secretKey: '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'
});

$(document).ready(function(){
	$("#result").hide();
	$("#progress-wrapper").hide();
	deepArtEffectsClient.stylesGet()
    .then(function(result){
    	console.log("Successfully loaded styles");
        //This is where you would put a success callback
        var ol = $('<ol id="selectable">');
        ol.appendTo('#style-list')
		styles = result.data;
        for (var i = 0, length = styles.length; i < length; i++) {	
  			var li = $("<li>");
  			li.attr('onClick',"uploadImage('"+styles[i].id+"')")
  			var div = $('<div class="style">');
			div.attr('style', "background-image: url("+styles[i].url+")");
			li.append(div);
			li.appendTo('#selectable');
		}
    }).catch(function(result){
        //This is where you would put an error callback
        console.log("Error loading styles");
    });
})
function uploadImage(styleId) {
	if(imageBinary==null) {
		alert('Please choose a picture first')
		return;
	}

	$("#styles").hide();
	$("#progress-wrapper").show();
	maxImageSize = $("#qualitySelect").val();

	optimizeForPrint = $('#optimzeForPrint').prop('checked');
	useOriginalColors = $('#useOriginalColors').prop('checked');

	var body = { 
		'styleId': styleId,
		'imageBase64Encoded': imageBinary,
		'optimizeForPrint': optimizeForPrint,
		'useOriginalColors': useOriginalColors,
		'imageSize': maxImageSize
	};

	deepArtEffectsClient.uploadPost(null, body)
	.then(function(result) {
		console.log("Successfully uploaded image");
		submissionId = result.data.submissionId
		resultCheck = setInterval(imageReadyCheck, 2500);
	}).catch(function(result){
        //This is where you would put an error callback
        console.log("Error uploading image");
    });
}
function imageReadyCheck() {
	var params = {
    	submissionId: submissionId,
	};
	deepArtEffectsClient.resultGet(params)
	.then(function(result) {
		console.log("Successfully status check");
		if(result.data.status=="finished") {
			var a = $('<a data-fancybox="gallery">');
			a.attr('href', result.data.url);
			/*var img = $('<img class="result-image">');
			img.attr('src', result.data.url);
			a.append(img);*/

			//Show original picture
			var img2 = document.createElement('img');
			img2.src = 'data:image/jpeg;base64,' + imageBinary;
			a.append(img2);

			a.appendTo('#artwork');
			
			

			clearInterval(resultCheck);
			$("#result").show();
			$("#styles").show();
			$("#progress-wrapper").hide();
		}
	}).catch(function(result){
        console.log("Error checking status");
    });
}
function onFileSelected(event) {
    var files = event.target.files;
    var file = files[0];

	maxImageSize = $("#qualitySelect").val();

    if (files && file) {
	    ImageTools.resize(file, {width: maxImageSize, height: maxImageSize}, 
	    	function(blob, didItResize) {
				var reader = new FileReader();
				reader.onload = function(readerEvt) {
	            	imageBinary = btoa(readerEvt.target.result);
	        	};
        		reader.readAsBinaryString(blob);
	    	}
	    );
	}
}
