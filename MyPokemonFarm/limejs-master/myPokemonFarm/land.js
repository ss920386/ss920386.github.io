goog.provide('farming.Land');

goog.require('lime.Sprite');

/**
 * Land elements
 * 
 * @param {} gameObj
 */

farming.Land = function(id, gameObj, playerObj) {
    goog.base(this);
    this.setAnchorPoint(0, 0);
    this.setSize(gameObj.tile_size, gameObj.tile_size);
    switch (id) {
        case "1":
            this.setFill('image/grass_1.png');
            break;
        case "2":
            this.setFill('image/grass_2.png');
            break;
        case "3":
            this.setFill('image/grass_3.png');
            break;
        case "4":
            this.setFill('image/grass_4.png');
            break;
        case "5":
            this.setFill('image/grass_5.png');
            break;
        case "6":
            this.setFill('image/grass_6.png');
            break;
        case "7":
            this.setFill('image/grass_7.png');
            break;
        case "8":
            this.setFill('image/grass_8.png');
            break;
        case "9":
            this.setFill('image/grass_9.png');
            break;

    }

}

goog.inherits(farming.Land, lime.Sprite);
