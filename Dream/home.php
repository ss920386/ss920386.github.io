<!DOCTYPE html>
<html>
<title>Home</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="home.css">
<style>
body,h1 {font-family: "Montserrat", sans-serif}
img {margin-bottom: -7px}
.w3-row-padding img {margin-bottom: 12px}
</style>
<body>

<!-- Sidebar -->
<nav class="w3-sidebar w3-animate-top w3-xxlarge w3-light-grey" style="display:none;padding-top:150px" id="mySidebar">
  <a href="javascript:void(0)" onclick="w3_close()" class="w3-button w3-black w3-xxlarge w3-padding w3-display-topright" style="padding:6px 24px">
    <i class="fa fa-remove"></i>
  </a>
  <div class="w3-bar-block w3-center">
    <form class="myForm" action="/action_page.php">
	  <textarea name="diary" placeholder="Write down your day"></textarea><br>
	  <input type="url" name="pic" value="" style="width:80%" placeholder="Enter your image URL"><br>
	  <input type="submit" value="Submit">
	</form>
  </div>
</nav>

<!-- !PAGE CONTENT! -->
<div class="w3-content" style="max-width:1500px">

<!-- Header -->
<div class="w3-opacity">
<span class="w3-button w3-xxlarge w3-white w3-right" onclick="w3_open()"><i class="fa fa-plus"></i></span> 
<div class="w3-clear"></div>
<header class="w3-center w3-margin-bottom" style="padding-bottom:20px">
  <h1><b>Your Heart Decides Your World</b></h1>
  <p><b>"One eye sees, the other feels." – Paul Klee</b></p>
  <p>Uplaod your diary with an image and see how your feelings affect your sight.</p>
 <!-- <p class="w3-padding-16"><button class="w3-button w3-black" onclick="myFunction()">Toggle Grid Padding</button></p>-->
</header>
</div>

<!-- Photo Grid -->
<div class="w3-row" id="myGrid" style="margin-bottom:128px">
  <div class="w3-third">
    <img src="http://d2tbfnbweol72x.cloudfront.net/wp-content/blogs.dir/5566/files/2014/10/forestbanner03.png?v=1.1" style="width:100%">
    <img src="https://www.forestcarbonpartnership.org/sites/fcp/files/sabah_1463%20webversion_0.jpg" style="width:100%">
    <img src="https://hfpi.ca/files/4414/7638/9709/forest.jpg" style="width:100%">
    <img src="https://i1.wallpaperscraft.com/image/forest_trees_summer_84562_225x300.jpg" style="width:100%">
    <img src="https://cdn.theculturetrip.com/wp-content/uploads/2016/02/10562132523_55de17dd35_k-650x488.jpg" style="width:100%">
    <img src="http://jllsly.com/wallpapers/forest-wallpaper-phone-Is-Cool-Wallpapers.jpg" style="width:100%">
  </div>

  <div class="w3-third">
    <img src="http://d2tbfnbweol72x.cloudfront.net/wp-content/blogs.dir/5566/files/2014/10/forestbanner03.png?v=1.1" style="width:100%">
    <img src="https://hfpi.ca/files/4414/7638/9709/forest.jpg" style="width:100%">
    <img src="https://www.forestcarbonpartnership.org/sites/fcp/files/sabah_1463%20webversion_0.jpg" style="width:100%">
    <img src="https://cdn.theculturetrip.com/wp-content/uploads/2016/02/10562132523_55de17dd35_k-650x488.jpg" style="width:100%">
    <img src="https://i1.wallpaperscraft.com/image/forest_trees_summer_84562_225x300.jpg" style="width:100%">
    <img src="http://jllsly.com/wallpapers/forest-wallpaper-phone-Is-Cool-Wallpapers.jpg" style="width:100%">
  </div>

  <div class="w3-third">
    <img src="https://www.forestcarbonpartnership.org/sites/fcp/files/sabah_1463%20webversion_0.jpg" style="width:100%">
    <img src="https://hfpi.ca/files/4414/7638/9709/forest.jpg" style="width:100%">
    
    <img src="https://cdn.theculturetrip.com/wp-content/uploads/2016/02/10562132523_55de17dd35_k-650x488.jpg" style="width:100%">
    <img src="https://i1.wallpaperscraft.com/image/forest_trees_summer_84562_225x300.jpg" style="width:100%">

  </div>
</div>

<!-- End Page Content -->
</div>

<!-- Footer -->
<!--<footer class="w3-container w3-padding-64 w3-light-grey w3-center w3-opacity w3-xlarge" style="margin-top:128px"> 
  <i class="fa fa-facebook-official w3-hover-opacity"></i>
  <i class="fa fa-instagram w3-hover-opacity"></i>
  <i class="fa fa-snapchat w3-hover-opacity"></i>
  <i class="fa fa-pinterest-p w3-hover-opacity"></i>
  <i class="fa fa-twitter w3-hover-opacity"></i>
  <i class="fa fa-linkedin w3-hover-opacity"></i>
  <p class="w3-medium">Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank" class="w3-hover-text-green">w3.css</a></p>
</footer>-->
 
<script>
// Toggle grid padding
window.onload =function() {
    var x = document.getElementById("myGrid");
    if (x.className === "w3-row") {
        x.className = "w3-row-padding";
    } else { 
        x.className = x.className.replace("w3-row-padding", "w3-row");
    }
}

// Open and close sidebar
function w3_open() {
    document.getElementById("mySidebar").style.width = "100%";
    document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}
</script>

</body>
</html>
