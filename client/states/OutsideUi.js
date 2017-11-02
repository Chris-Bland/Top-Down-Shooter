var OutsideUi = function () { };
var buttons;
var texts;
OutsideUi.prototype = {

    create: function () {
        outsideUiSlide = game.add.sprite(game.camera.width / 2,10, 'outside-ui-slide');
        outsideUiSlide.fixedToCamera = true;
        outsideUiSlide.scale.setTo(.33);
        outsideUiSlide.anchor.setTo(.5,0);

        this.createButton(this, game, 'question-mark', 'Boss Health Bar', 103, 145, 25, 25, 150 ,145, function () {});
        this.createButton(this, game, 'question-mark', 'Wave Counter', 103, 85, 25, 25,  150,145, function () {});
        this.createButton(this, game, 'question-mark', 'Player Level', 120,55 , 25, 25,  150,145, function () {});
        this.createButton(this, game, 'question-mark', 'Player Health Bar', 160, 25, 25, 25, 150,145, function () {});
        this.createButton(this, game, 'question-mark', 'Player Experience Bar', 210, 40, 25, 25,  150,145, function () {});
        this.createButton(this, game, 'question-mark', 'Mercenary Counter', 185, 85, 25, 25,  150,145, function () {});


        this.createButton(this, game, 'question-mark', 'Fortress Health Bar', game.camera.width/2, 30, 25, 25, (game.camera.width/2)+75,225, function () {});
        this.createButton(this, game, 'question-mark', 'Dungeon Key Counter', (game.camera.width/2)+85, 55, 25, 25, (game.camera.width/2)+75,225, function () {});
        this.createButton(this, game, 'question-mark', 'Currency Counter', (game.camera.width/2)-115, 55, 25, 25, (game.camera.width/2)+75,225, function () {});
        this.createButton(this, game, 'question-mark', 'The Fortress!', (game.camera.width/2)+175, 150, 25, 25, (game.camera.width/2)+75,225, function () {});
        this.createButton(this, game, 'question-mark', 'Auto Target Tower', (game.camera.width/2)-60, 200, 25, 25, (game.camera.width/2)+75,225, function () {});
        this.createButton(this, game, 'question-mark', 'That is you!', (game.camera.width/2)+100, 330, 25, 25, (game.camera.width/2)+75,225, function () {});
        this.createButton(this, game, 'question-mark', 'Your Mercenary', (game.camera.width/2)+190, 390, 25, 25, (game.camera.width/2)+75,225, function () {});

        this.createButton(this, game, 'question-mark', 'Pistol: Pop Pop', (game.camera.width/2)-115, 555, 25, 25, (game.camera.width/2)-130,500, function () {});
        this.createButton(this, game, 'question-mark', 'Rocket: BOOOM', (game.camera.width/2)-60, 555, 25, 25, (game.camera.width/2)-130,500, function () {});
        this.createButton(this, game, 'question-mark', 'Rifle Brrrap Brrrap', (game.camera.width/2), 555, 25, 25, (game.camera.width/2)-130,500, function () {});
        this.createButton(this, game, 'question-mark', 'Laser: Pew Pew', (game.camera.width/2)+55, 555, 25, 25, (game.camera.width/2)-130,500, function () {});
        

        GameMenu.prototype.addMenuOption('Back', 10 ,640, function () {
            game.state.start("Controls");
        });
        GameMenu.prototype.addMenuOption('Next', 1080, 640, function () {
            game.state.start("BossUi");
        });
    },

    createButton: function (State, game, sprite, description, x, y, width, height, textx, texty, callback) {
        
             
             var button = game.add.button(x, y, sprite, callback, game, 2, 1, 0);
             button.anchor.setTo(0.5, 0.5);
             button.width = width;
             button.height = height;
             button.fixedToCamera = true;
        
     
             var descriptiveText = game.add.text(textx, texty, description, { font: "35px Arial", fill: "#FEFFD5", align: "center" });
             descriptiveText.fixedToCamera = true;
            //  descriptiveText.anchor.setTo(.5);
             descriptiveText.visible = false;
     
             var onOver = function (target) {
             button.width =(30+(30*.15));
                button.height = (30+(30*.15));
                descriptiveText.visible = true;
               };
               var onOut = function (target) {
                 button.width = width;
                 button.height = height;
                 descriptiveText.visible = false;
               };
     
               button.events.onInputUp.add(callback, this);
               button.events.onInputOver.add(onOver, this);
               button.events.onInputOut.add(onOut, this);
     
            //  var text = game.add.text(textx, texty, string, { font: "20px Arial", fill: "#fff", align: "center" });
            //  text.anchor.setTo(0.5, 0.5);
            //  text.fixedToCamera = true;

            },

};