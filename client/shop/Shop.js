var shop = function () { };

shop.prototype = {
    create: function (State) {

        State.store = State.game.add.sprite(State.game.camera.width / 2, (State.game.camera.height / 4) + 150, 'store');
        State.store.fixedToCamera = true;
        State.store.anchor.setTo(.5);
        State.store.scale.setTo(.80);
        State.store.visible = false;
        State.buttons = game.add.group();
        State.texts = game.add.group();

        this.createButton(State,game, "tower-shop", "Purchase a Tower", (State.game.camera.width / 2) - 105, (State.game.camera.height / 4) - 12, 68, 68, "500", function () {
            if (gameStatHandler.prototype.currency >= 500 && gameStatHandler.prototype.towersAmount < 50) {
                gameStatHandler.prototype.towersAmount += 1;
                gameStatHandler.prototype.currency -= 500;
            }
        });
        this.createButton(State, game, "dungeon-shop", "Unlock the Dungeon!",(State.game.camera.width / 2), (State.game.camera.height / 4) - 12, 68, 68, "2000", function () {
            if (gameStatHandler.prototype.currency >= 2000 && gameStatHandler.prototype.dungeonKey == false) {
                gameStatHandler.prototype.dungeonKey = true;
                gameStatHandler.prototype.currency -= 2000;
            }
        });
        this.createButton(State,game, "health-shop", "Increase your Hero's Max Health by 100",(State.game.camera.width / 2) + 105, (State.game.camera.height / 4) - 12, 68, 68, "100", function () {
            if (gameStatHandler.prototype.currency >= 100) {
                gameStatHandler.prototype.healthPoints += 1;
                State.player.maxHealth += 50;
                State.player.health = State.player.maxHealth;
                gameStatHandler.prototype.currency -= 100;
            }
        });
        this.createButton(State, game, "laser-shop", "Unlock the Lazer! Pew Pew",(State.game.camera.width / 2) - 105, (State.game.camera.height / 4) + 100, 68, 68, "3000", function () {
            if (gameStatHandler.prototype.currency >= 3000 && gameStatHandler.prototype.laser == false) {
                gameStatHandler.prototype.laser = true;
                gameStatHandler.prototype.currency -= 3000;
            }

        });
        this.createButton(State, game, "melee-shop", "Purchase a Melee Mercenary", (State.game.camera.width / 2) + 5, (State.game.camera.height / 4) + 100, 68, 68, "5000", function () {
            if (gameStatHandler.prototype.currency >= 5000 && gameStatHandler.prototype.mercsAmount + gameStatHandler.prototype.mercTanksAmount + gameStatHandler.prototype.mercHealersAmount < 3 ) {
                gameStatHandler.prototype.mercTanksAmount +=1;
                gameStatHandler.prototype.currency -= 5000;
            }
        });
        this.createButton(State,  game, "merc-shop", "Purchase an All Around Mercenary",(State.game.camera.width / 2) + 110, (State.game.camera.height / 4) + 100, 68, 68, "2000", function () {
            if (gameStatHandler.prototype.currency >= 2000 && gameStatHandler.prototype.mercsAmount + gameStatHandler.prototype.mercTanksAmount + gameStatHandler.prototype.mercHealersAmount < 3 ) {
                gameStatHandler.prototype.mercsAmount +=1;
                gameStatHandler.prototype.currency -= 2000;
            }
        });
        this.createButton(State, game, "heal-shop", "Purchase a Healing Mercenary",(State.game.camera.width / 2) - 105, (State.game.camera.height / 4) + 230, 68, 68, "4500", function () {
            if (gameStatHandler.prototype.currency >= 4500 && gameStatHandler.prototype.mercsAmount + gameStatHandler.prototype.mercTanksAmount + gameStatHandler.prototype.mercHealersAmount < 3 ) {
                gameStatHandler.prototype.mercHealersAmount +=1;
                gameStatHandler.prototype.currency -= 4500;
            }
        });
        this.createButton(State, game, "beer-shop", "Boost your hero's bullet damage",(State.game.camera.width / 2) + 5, (State.game.camera.height / 4) + 230, 68, 68, "500", function () {
            if (gameStatHandler.prototype.currency >= 500) {
                gameStatHandler.prototype.damagePoints += 1;
                gameStatHandler.prototype.currency -= 500;
            }
        });
        this.createButton(State, game, "speed-shop", "Boost your hero's walk speed",(State.game.camera.width / 2) + 110, (State.game.camera.height / 4) + 230, 68, 68, "500", function () {
            if (gameStatHandler.prototype.currency >= 500) {
                gameStatHandler.prototype.speedPoints += 1;
                gameStatHandler.prototype.currency -= 500;
            }
        });
    },

    buyStuff: function (State, npc, player) {
        State.buttons.visible = true;
        State.store.visible = true;
        State.texts.visible = true;
        State.npc.rotation = State.game.physics.arcade.angleToXY(State.npc, State.player.x, State.player.y);
    },

    createButton: function (State, game, sprite, description, x, y, width, height, string, callback) {
   
        
        var button = game.add.button(x, y, sprite, callback, game, 2, 1, 0);
        button.anchor.setTo(0.5, 0.5);
        button.width = width;
        button.height = height;
        button.fixedToCamera = true;
        State.buttons.add(button);
        State.buttons.visible = false;


        var descriptiveText = game.add.text((State.game.camera.width/2), (State.game.camera.height / 2)+150, description, { font: "20px Arial", fill: "#fff", align: "center" });
        descriptiveText.fixedToCamera = true;
        descriptiveText.anchor.setTo(.5);
        descriptiveText.visible = false;

        var onOver = function (target) {
           button.scale.setTo(1.25);
           descriptiveText.visible = true;
          };
          var onOut = function (target) {
            button.scale.setTo(1);
            descriptiveText.visible = false;
          };

          button.events.onInputUp.add(callback, this);
          button.events.onInputOver.add(onOver, this);
          button.events.onInputOut.add(onOut, this);

        var text = game.add.text(button.x + 5, button.y + 63, string, { font: "20px Arial", fill: "#fff", align: "center" });
        text.anchor.setTo(0.5, 0.5);
        text.fixedToCamera = true;
        State.texts.add(text);
        State.texts.visible = false;

    },
    hideShop: function (State) {
        State.buttons.visible = false;
        State.texts.visible = false;
        State.store.visible = false;
    }

};