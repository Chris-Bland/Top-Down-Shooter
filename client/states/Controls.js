var Controls = function () { };

Controls.prototype = {

    create: function () {

        let controlsSlide = game.add.sprite(game.camera.width / 2, 20, 'controls-slide');
        controlsSlide.fixedToCamera = true;
        controlsSlide.scale.setTo(.45);
        controlsSlide.anchor.setTo(.5,0);
        GameMenu.prototype.addMenuOption('Back',10 ,640 , function () {
            game.state.start("GameMenu");
          });
          GameMenu.prototype.addMenuOption('Next', 1080,640 , function () {
            game.state.start("OutsideUi");
          });
    },

};
