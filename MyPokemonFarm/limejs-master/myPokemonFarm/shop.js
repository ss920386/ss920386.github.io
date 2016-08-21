goog.provide('shopping.Scene');

goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Sprite');
goog.require('lime.GlossyButton');

/**
 * Land elements
 * 
 * @param {} gameObj
 */

shopping.Scene = function(sceneObj, gameObj, playerObj) {
    goog.base(this);
    this.setRenderer(lime.Renderer.CANVAS);
    var shopLayer = new lime.Layer().setAnchorPoint(0, 0);

    /***pokemon shop***/
    var shopBackground = new lime.Sprite().setAnchorPoint(0, 0).setPosition(0, 0)
        .setSize(gameObj.width, gameObj.height).setFill('image/shop.png');
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

    //evolve shop button
    var evolveButton = new lime.GlossyButton().setColor('#FFF700').setText('Evolve')
        .setPosition(50, gameObj.height - 25)
        .setSize(70, 30);
    shopLayer.appendChild(evolveButton);

    //evolve shop event
    goog.events.listen(evolveButton, ['mousedown', 'touchstart'], function(e) {
        sceneObj.switch_evolveScene();
    });

    //shop items
    for (var i = 0; i < gameObj.pokemons.length; i++) {
        var item = new lime.Sprite().setAnchorPoint(0, 0).setPosition(gameObj.shop_margin_x, gameObj.shop_margin_y + (gameObj.shop_margin_y + gameObj.tile_size) * i)
            .setFill(gameObj.pokemons[i].image).setSize(gameObj.tile_size, gameObj.tile_size);
        shopLayer.appendChild(item);

        var timeLabel = new lime.Label().setText(gameObj.pokemons[i].name + ' (' + gameObj.pokemons[i].time_to_capture + ' minutes)').setFontColor('#FF3D3D')
            .setPosition(gameObj.shop_margin_x + 175, gameObj.shop_margin_y * 1.5 + (gameObj.shop_margin_y + gameObj.tile_size) * i);
        shopLayer.appendChild(timeLabel);
        var costLabel = new lime.Label().setText('cost: $' + gameObj.pokemons[i].cost).setFontColor('#3C3C3C')
            .setPosition(gameObj.shop_margin_x + 175, gameObj.shop_margin_y * 2.5 + (gameObj.shop_margin_y + gameObj.tile_size) * i);
        shopLayer.appendChild(costLabel);
        var label = new lime.Label().setText('revenue: $' + gameObj.pokemons[i].revenue).setFontColor('#3C3C3C')
            .setPosition(gameObj.shop_margin_x + 175, gameObj.shop_margin_y * 3.4 + (gameObj.shop_margin_y + gameObj.tile_size) * i);
        shopLayer.appendChild(label);

        //buy stuff
        (function(item, i) {
            goog.events.listen(item, ['mousedown', 'touchstart'], function(e) {
                playerObj.currentPokemon = i;
                sceneObj.switch_gameScene();
            });
        })(item, i);

    }

}

goog.inherits(shopping.Scene, lime.Scene);
