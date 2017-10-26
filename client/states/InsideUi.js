var InsideUi = function () { };

InsideUi.prototype = {

    create: function () {
        insideUiSlide = game.add.sprite(game.camera.width / 2, 20, 'inside-ui-slide');
        insideUiSlide.fixedToCamera = true;
        insideUiSlide.centered = true;
        insideUiSlide.scale.setTo(.39);
        insideUiSlide.anchor.setTo(.5, 0);


        GameMenu.prototype.addMenuOption('Back', 10 ,640, function () {
            game.state.start("BossUi");
        });
        GameMenu.prototype.addMenuOption('Menu', 1080, 640, function () {
            game.state.start("GameMenu");
        });

    }
};
