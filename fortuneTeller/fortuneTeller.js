function getImageCoords(event,img) {
        var posX = event.offsetX?(event.offsetX):event.pageX-img.offsetLeft;
        var posY = event.offsetY?(event.offsetY):event.pageY-img.offsetTop;
        alert("You clicked at: ("+posX+","+posY+")");
    }