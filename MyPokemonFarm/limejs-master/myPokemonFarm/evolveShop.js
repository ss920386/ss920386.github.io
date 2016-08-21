goog.provide('evolve.Scene');

goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Sprite');
goog.require('lime.GlossyButton');

/**
 * Land elements
 * 
 * @param {} gameObj
 */

evolve.Scene = function(sceneObj, gameObj, playerObj) {
    goog.base(this);
    this.setRenderer(lime.Renderer.CANVAS);
    var shopLayer = new lime.Layer().setAnchorPoint(0, 0);

    /***pokemon shop***/
    var shopBackground = new lime.Sprite().setAnchorPoint(0, 0).setPosition(0, 0)
        .setSize(gameObj.width, gameObj.height).setFill('image/evolve.png');
    shopLayer.appendChild(shopBackground);
    this.appendChild(shopLayer);
    //close button
    var closeButton = new lime.GlossyButton().setColor('#FF3D3D').setText('Back')
        .setPosition(gameObj.width - 50, gameObj.height - 25)
        .setSize(70, 30);
    shopLayer.appendChild(closeButton);

    //close shop event
    goog.events.listen(closeButton, ['mousedown', 'touchstart'], function(e) {
        sceneObj.switch_gameScene();
    });

    //pokemon shop button
    var pokemonButton = new lime.GlossyButton().setColor('#FFF700').setText('Pokemon')
        .setPosition(50, gameObj.height - 25)
        .setSize(70, 30);
    shopLayer.appendChild(pokemonButton);

    //close shop event
    goog.events.listen(pokemonButton, ['mousedown', 'touchstart'], function(e) {
        sceneObj.switch_shopScene();
    });

    //shop items
    for (var i = 0; i < gameObj.evolves.length; i++) {
        var item = new lime.Sprite().setAnchorPoint(0, 0).setPosition(gameObj.shop_margin_x, gameObj.shop_margin_y + (gameObj.shop_margin_y + gameObj.tile_size) * i)
            .setFill(gameObj.evolves[i].image).setSize(gameObj.tile_size, gameObj.tile_size);
        shopLayer.appendChild(item);

        var timeLabel = new lime.Label().setText(gameObj.evolves[i].name).setFontColor('#FF3D3D')
            .setPosition(gameObj.shop_margin_x + 175, gameObj.shop_margin_y * 1.5 + (gameObj.shop_margin_y + gameObj.tile_size) * i);
        shopLayer.appendChild(timeLabel);
        var costLabel = new lime.Label().setText('cost: $' + gameObj.evolves[i].cost).setFontColor('#FFFFFF')
            .setPosition(gameObj.shop_margin_x + 175, gameObj.shop_margin_y * 2.5 + (gameObj.shop_margin_y + gameObj.tile_size) * i);
        shopLayer.appendChild(costLabel);

        //buy stuff
        (function(item, i) {
            goog.events.listen(item, ['mousedown', 'touchstart'], function(e) {
                playerObj.currentEvolve = i;
                sceneObj.switch_gameScene();
            });
        })(item, i);

    }

}

goog.inherits(evolve.Scene, lime.Scene);
