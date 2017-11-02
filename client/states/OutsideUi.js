var OutsideUi = function () { };
var buttons;
var texts;
OutsideUi.prototype = {

    create: function () {
        outsideUiSlide = game.add.sprite(game.camera.width / 2,10, 'outside-ui-slide');
        outsideUiSlide.fixedToCamera = true;
        outsideUiSlide.scale.setTo(.33);
        outsideUiSlide.anchor.setTo(.5,0);

        this.createButton(this, game, 'question-mark', 'boss', 103, 145, 25, 25, '', function () {});
        this.createButton(this, game, 'question-mark', 'wave', 103, 85, 25, 25, '', function () {});
        this.createButton(this, game, 'question-mark', 'playerui level', 120,55 , 25, 25, '', function () {});
        this.createButton(this, game, 'question-mark', 'health', 160, 25, 25, 25, '', function () {});
        this.createButton(this, game, 'question-mark', 'xp', 210, 40, 25, 25, '', function () {});
        this.createButton(this, game, 'question-mark', 'merc', 185, 85, 25, 25, '', function () {});


        this.createButton(this, game, 'question-mark', 'house health', game.camera.width/2, 30, 25, 25, '', function () {});
        this.createButton(this, game, 'question-mark', 'key', (game.camera.width/2)+85, 55, 25, 25, '', function () {});
        this.createButton(this, game, 'question-mark', 'currency', (game.camera.width/2)-115, 55, 25, 25, '', function () {});
        
        this.createButton(this, game, 'question-mark', 'house', (game.camera.width/2)+160, 150, 25, 25, '', function () {});
        this.createButton(this, game, 'question-mark', 'tower', (game.camera.width/2)-20, 300, 25, 25, '', function () {});
        this.createButton(this, game, 'question-mark', 'player', (game.camera.width/2)+160, 350, 25, 25, '', function () {});
        this.createButton(this, game, 'question-mark', 'merc', (game.camera.width/2)+190, 390, 25, 25, '', function () {});

        this.createButton(this, game, 'question-mark', 'pistol', (game.camera.width/2)-115, 555, 25, 25, '', function () {});
        this.createButton(this, game, 'question-mark', 'rocket', (game.camera.width/2)-65, 555, 25, 25, '', function () {});
        this.createButton(this, game, 'question-mark', 'rifle', (game.camera.width/2), 555, 25, 25, '', function () {});
        this.createButton(this, game, 'question-mark', 'laser', (game.camera.width/2)+55, 555, 25, 25, '', function () {});
        

        GameMenu.prototype.addMenuOption('Back', 10 ,640, function () {
            game.state.start("Controls");
        });
        GameMenu.prototype.addMenuOption('Next', 1080, 640, function () {
            game.state.start("BossUi");
        });
    },

    createButton: function (State, game, sprite, description, x, y, width, height, string, callback) {
        
             
             var button = game.add.button(x, y, sprite, callback, game, 2, 1, 0);
             button.anchor.setTo(0.5, 0.5);
             button.width = width;
             button.height = height;
             button.fixedToCamera = true;
        
     
             var descriptiveText = game.add.text(button.x+80, button.y, description, { font: "20px Arial", fill: "#fff", align: "center" });
             descriptiveText.fixedToCamera = true;
             descriptiveText.anchor.setTo(.5);
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
     
             var text = game.add.text(button.x + 5, button.y + 63, string, { font: "20px Arial", fill: "#fff", align: "center" });
             text.anchor.setTo(0.5, 0.5);
             text.fixedToCamera = true;

            },

};