var OutsideUi = function () { };

OutsideUi.prototype = {

    create: function () {
        outsideUiSlide = game.add.sprite(game.camera.width / 2,10, 'outside-ui-slide');
        outsideUiSlide.fixedToCamera = true;
        outsideUiSlide.scale.setTo(.4, .348);
        outsideUiSlide.anchor.setTo(.5,0);
        GameMenu.prototype.addMenuOption('Back', 10 ,640, function () {
            game.state.start("Controls");
        });
        GameMenu.prototype.addMenuOption('Next', 1080, 640, function () {
            game.state.start("BossUi");
        });
    }
};