goog.provide('farming.Item');

goog.require('lime.Sprite');

farming.Item = function(gameObj, playerObj) {
    goog.base(this);
    this.setAnchorPoint(0, 0);
    this.setSize(gameObj.tile_size, gameObj.tile_size);
    this.setFill('');
    var state = 0;

    //attract pokemon
    goog.events.listen(this, ['mousedown', 'touchstart'], function(e) {
        //e.event.stopPropagation();
        if (state == 0 && playerObj.currentPokemon >= 0) {
            if (playerObj.money >= gameObj.pokemons[playerObj.currentPokemon].cost) {
                //put berry
                this.setFill('image/asset/Berry.png');
                state = 1;

                //store pokemon and left time for it to be ready and to die
                this.pokemon = gameObj.pokemons[playerObj.currentPokemon];
                this.odd = this.pokemon.odd_to_capture;
                this.attractingTime = this.pokemon.time_to_capture * 1000;
                this.evolvetime = 1000;
                this.balltime = 2000;
                this.fleeTime = this.pokemon.time_to_flee * 1000;

                //update player money
                playerObj.money -= gameObj.pokemons[playerObj.currentPokemon].cost;
                gameObj.updateMoney();
            }
        } else if (state == 2) {
            if (playerObj.currentEvolve >= 0) { //evolve case
                this.evolveItem = playerObj.currentEvolve;
                this.evolveIndex = this.pokemon.evolveItem.indexOf(this.evolveItem.toString()); //save the index of evolve item/pokemon from the data of pokemon object(=-1 if doesn't match)    
                this.evolvePokemonID = parseInt(this.pokemon.evolvePokemon[this.evolveIndex]);
                this.evolvePokemon = gameObj.evolvePokemons[this.evolvePokemonID];

                if (playerObj.money >= gameObj.evolves[playerObj.currentEvolve].cost && this.evolveIndex >= 0) {

                    this.odd = gameObj.pokemons[playerObj.currentPokemon].odd_to_evolve;
                    var getOdd = Math.random();
                    if (getOdd <= this.odd) {
                        //update player money                
                        playerObj.money -= gameObj.evolves[playerObj.currentEvolve].cost;
                        gameObj.updateMoney();
                        this.setFill(this.evolvePokemon.image);
                        playerObj.currentEvolve = -1;

                        this.pokemon = this.evolvePokemon;
                        this.odd = this.pokemon.odd_to_capture;
                        this.fleeTime = this.pokemon.time_to_flee * 1000;
                        state = 2;
                    } else { //pokemon doesn't want to evolve and flee; spend half money
                        playerObj.money -= gameObj.evolves[playerObj.currentEvolve].cost * 0.5;
                        gameObj.updateMoney();
                        this.setFill('image/asset/print.png');
                        state = 0;
                    }

                } else { //can't evolve
                    playerObj.currentEvolve = -1;
                }
            } else {
                //Capture
                playerObj.currentEvolve = -1;
                this.setFill('image/asset/pokeball.png');
                state = 3;
            }

        }
    });




    //attracting pokemons
    dt = 1000;
    lime.scheduleManager.scheduleWithDelay(function() {

        if (state == 1) {
            if (this.attractingTime <= 0) {
                state = 2;
                this.setFill(this.pokemon.image);
            } else {
                this.attractingTime -= dt;
            }
        } else if (state == 2) {
            if (this.fleeTime <= 0) {
                state = 0;
                this.setFill('image/asset/print.png');
            } else {
                this.fleeTime -= dt;
            }
        } else if (state == 3) {

            if (this.balltime <= 0) {
                var getOdd = Math.random();
                if (getOdd <= this.odd) {
                    this.setFill('');
                    //Add to record
                    if (gameObj.record.indexOf(this.pokemon.id) < 0) {
                        gameObj.record.push(this.pokemon.id);
                    }

                    //update player money
                    playerObj.money += this.pokemon.revenue;
                    gameObj.updateMoney();
                } else {
                    this.setFill('image/asset/print.png');
                }
                state = 0;
            } else {
                this.balltime -= dt;
            }
        }
    }, this, dt);


}

goog.inherits(farming.Item, lime.Sprite);

//states
farming.Land.prototype.EMPTY = 0;
farming.Land.prototype.ATTRACTING = 1;
farming.Land.prototype.READY = 2;
farming.Land.prototype.BALL = 3;
