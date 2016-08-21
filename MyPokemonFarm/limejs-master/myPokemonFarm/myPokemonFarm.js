//set main namespace
goog.provide('myPokemonFarm');

//get requirement
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.GlossyButton');
goog.require('farming.Land');
goog.require('farming.Item');
goog.require('shopping.Scene');
goog.require('evolve.Scene');

//entry point
myPokemonFarm.start = function() {

    //game object
    var gameObj = {
        width: 320,
        height: 480,
        tile_size: 64,
        num_tiles_x: 5,
        num_tiles_y: 6,
        landLayer_w: 64 * 5,
        landLayer_h: 64 * 6,
        controlsLayer_w: 64 * 5,
        controlsLayer_h: 64 * 1.5,

        //shop
        shop_margin_x: 20,
        shop_margin_y: 20
    }

    gameObj.record = [''];
    gameObj.collection_record = [''];

    //pokemon object
    gameObj.pokemons = [{
        no: 0,
        id: '016',
        name: 'Pidgey',
        cost: 50,
        revenue: 90,
        time_to_capture: 5, //secods
        odd_to_capture: 1,
        odd_to_evolve: 1,
        time_to_flee: 20, //second from when it can be captured
        image: 'image/pokemon/pm016.gif',
        evolveItem: ['0'],
        evolvePokemon: ['0']
    }, {
        no: 1,
        id: '025',
        name: 'Pikachu',
        cost: 1000,
        revenue: 1200,
        time_to_capture: 1, //secods
        odd_to_capture: 0.6,
        odd_to_evolve: 1,
        time_to_flee: 50, //second from when it can be captured
        image: 'image/pokemon/pm025.gif',
        evolveItem: ['3'],
        evolvePokemon: ['2']
    }, {
        no: 2,
        id: '133',
        name: 'Eevee',
        cost: 5000,
        revenue: 1200,
        time_to_capture: 1, //secods
        odd_to_capture: 0.6,
        odd_to_evolve: 0.5,
        time_to_flee: 50, //second from when it can be captured
        image: 'image/pokemon/pm133.gif',
        evolveItem: ['1', '2', '3'],
        evolvePokemon: ['3', '4', '5']
    }];

    gameObj.evolvePokemons = [{
        no: 0,
        id: '017',
        name: 'Pidgeotto',
        cost: 0, //evolution way
        revenue: 500,
        odd_to_evolve: 0.6,
        image: 'image/pokemon/pm017.gif',
        time_to_capture: 0, //evolution way
        odd_to_capture: 1,
        time_to_flee: 50,
        evolveItem: ['0'],
        evolvePokemon: ['1'],
        odd_to_evolve: 1
    }, {
        no: 1,
        id: '018',
        name: 'Pidgeot',
        cost: 0, //evolution way
        revenue: 1500,
        odd_to_evolve: 1,
        image: 'image/pokemon/pm018.gif',
        time_to_capture: 0, //evolution way
        odd_to_capture: 1,
        time_to_flee: 50,
        evolveItem: [''],
        evolvePokemon: [''],
        odd_to_evolve: 0
    }, {
        no: 2,
        id: '026',
        name: 'Raichu',
        cost: 0, //evolution way
        revenue: 2500,
        image: 'image/pokemon/pm026.gif',
        time_to_capture: 0, //evolution way
        odd_to_capture: 1,
        time_to_flee: 50,
        evolveItem: [''],
        evolvePokemon: [''],
        odd_to_evolve: 0
    }, {
        no: 3,
        id: '136',
        name: 'Flareon',
        cost: 0, //evolution way
        revenue: 6000,
        image: 'image/pokemon/pm136.gif',
        time_to_capture: 0, //evolution way
        odd_to_capture: 1,
        time_to_flee: 50,
        evolveItem: [''],
        evolvePokemon: [''],
        odd_to_evolve: 0
    }, {
        no: 4,
        id: '134',
        name: 'Vaporeon',
        cost: 0, //evolution way
        revenue: 6000,
        image: 'image/pokemon/pm134.gif',
        time_to_capture: 0, //evolution way
        odd_to_capture: 1,
        time_to_flee: 50,
        evolveItem: [''],
        evolvePokemon: [''],
        odd_to_evolve: 0
    }, {
        no: 5,
        id: '135',
        name: 'Jolteon',
        cost: 0, //evolution way
        revenue: 6000,
        image: 'image/pokemon/pm135.gif',
        time_to_capture: 0, //evolution way
        odd_to_capture: 1,
        time_to_flee: 50,
        evolveItem: [''],
        evolvePokemon: [''],
        odd_to_evolve: 0
    }];


    //evolve object
    gameObj.evolves = [{
        name: 'Rare Candy',
        cost: 5000,
        image: 'image/asset/candy.png'
    }, {
        name: 'Fire Stone',
        cost: 10000,
        image: 'image/asset/fireStone.png'
    }, {
        name: 'Water Stone',
        cost: 10000,
        image: 'image/asset/waterStone.png'
    }, {
        name: 'Thunder Stone',
        cost: 10000,
        image: 'image/asset/thunderStone.png'
    }];


    //player object
    var playerObj = {
        money: 500000,
        currentPokemon: -1,
        currentEvolve: -1
    }

    //scene object
    var sceneObj = {}
    sceneObj.switch_gameScene = function() {
        director.replaceScene(gameScene);
    };
    sceneObj.switch_shopScene = function() {
        director.replaceScene(shopScene);
    }
    sceneObj.switch_evolveScene = function() {
        director.replaceScene(evolveScene);
    }

    //director and gamescene setting
    var director = new lime.Director(document.body, gameObj.width, gameObj.height);
    director.makeMobileWebAppCapable();
    director.setDisplayFPS(false);

    var gameScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
    var landLayer = new lime.Layer().setAnchorPoint(0, 0);
    var controlsLayer = new lime.Layer().setAnchorPoint(0, 0);
    var itemLayer = new lime.Layer().setAnchorPoint(0, 0);

    gameScene.appendChild(landLayer);
    gameScene.appendChild(controlsLayer);

    //controls area
    var controlArea = new lime.RoundedRect().setAnchorPoint(0, 0).setPosition(0, gameObj.height - gameObj.controlsLayer_h + 15)
        .setSize(gameObj.controlsLayer_w, gameObj.controlsLayer_h - 30)
        .setFill('#505050').setRadius(10);
    controlsLayer.appendChild(controlArea);

    //shop button
    var shopButton = new lime.GlossyButton().setColor('#707DFF').setText('Shop')
        .setPosition(60, gameObj.height - gameObj.controlsLayer_h / 2)
        .setSize(80, 40);
    controlsLayer.appendChild(shopButton);

    //Collection button
    var collectionButton = new lime.GlossyButton().setColor('#707DFF').setText('Collection')
        .setPosition(150, gameObj.height - gameObj.controlsLayer_h / 2)
        .setSize(80, 40);
    controlsLayer.appendChild(collectionButton);

    //money
    var moneyLabel = new lime.Label().setText('$' + playerObj.money).setFontColor('#E8FC08')
        .setPosition(gameObj.controlsLayer_w - 50, gameObj.height - gameObj.controlsLayer_h / 2);
    controlsLayer.appendChild(moneyLabel);
    //updating money indicator
    gameObj.updateMoney = function() {
        moneyLabel.setText('$' + playerObj.money);
    };

    //create land element
    var landid = ["1", "2", "2", "2", "3",
        "4", "5", "5", "5", "6",
        "4", "5", "5", "5", "6",
        "4", "5", "5", "5", "6",
        "4", "5", "5", "5", "6",
        "7", "8", "8", "8", "9"
    ];
    var id = 0;
    for (var j = 0; j < gameObj.num_tiles_y; j++) {
        for (var i = 0; i < gameObj.num_tiles_x; i++) {
            var landElement = new farming.Land(landid[id], gameObj, playerObj).setPosition(i * gameObj.tile_size, j * gameObj.tile_size);
            landLayer.appendChild(landElement);
            id++;
        }
    }

    //create item element
    for (var j = 0; j < gameObj.num_tiles_y; j++) {
        for (var i = 0; i < gameObj.num_tiles_x; i++) {
            var landItem = new farming.Item(gameObj, playerObj).setPosition(i * gameObj.tile_size, j * gameObj.tile_size);
            landLayer.appendChild(landItem);
        }
    }

    director.replaceScene(gameScene);

    //shop: A new Scene
    var shopScene = new shopping.Scene(sceneObj, gameObj, playerObj);
    goog.events.listen(shopButton, ['mousedown', 'touchstart'], function(e) {
        director.replaceScene(shopScene);
    });
    var evolveScene = new evolve.Scene(sceneObj, gameObj, playerObj);

    /****Collection: A new Scene****/
    var collectionScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
    var collectionLayer = new lime.Layer().setAnchorPoint(0, 0);
    //collection.Scene.setLayer(collectionLayer, sceneObj);

    var collectionBackground = new lime.Sprite().setAnchorPoint(0, 0).setPosition(0, 0)
        .setSize(gameObj.width, gameObj.height).setFill('image/box.png');
    collectionLayer.appendChild(collectionBackground);

    //close button
    var closeButton = new lime.GlossyButton().setColor('#FF3D3D').setText('Back')
        .setPosition(gameObj.width - 50, gameObj.height - 25)
        .setSize(70, 30);
    collectionLayer.appendChild(closeButton);

    //close event
    goog.events.listen(closeButton, ['mousedown', 'touchstart'], function(e) {
        sceneObj.switch_gameScene();
    });

    //Append Layer
    collectionScene.appendChild(collectionLayer);
    goog.events.listen(collectionButton, ['mousedown', 'touchstart'], function(e) {
        /*var lab = new Label.setText(gameObj.record[0]).setPosition(50, 50).
        setColor('#FFF210');
        landLayer.appendChild(lab);*/

        for (var i = 0; i < gameObj.record.length; i++) {
            if (gameObj.collection_record.indexOf(gameObj.record[i]) < 0) {
                var add = new lime.Sprite().setFill('image/pokemon/pm' + gameObj.record[i] + '.gif')
                    .setPosition((parseInt(gameObj.record[i]) - 1) % 10 * 32, (parseInt(gameObj.record[i]) - 1) / 10 * 32)
                    .setSize(32, 32)
                    .setAnchorPoint(0, 0);
                collectionLayer.appendChild(add);
            }
        }
        director.replaceScene(collectionScene);
    });

    /****collection scene end****/
}

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('myPokemonFarm.start', myPokemonFarm.start);
