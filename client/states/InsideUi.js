var InsideUi = function () { };

InsideUi.prototype = {

    create: function () {
        insideUiSlide = game.add.sprite(game.camera.width / 2, 20, 'inside-ui-slide');
        insideUiSlide.fixedToCamera = true;
        insideUiSlide.centered = true;
        insideUiSlide.scale.setTo(.39);
        insideUiSlide.anchor.setTo(.5, 0);

        OutsideUi.prototype.createButton(this, game, 'question-mark', 'Total Tower Count', 333, 115, 25, 25,  106,145, function () {});
        OutsideUi.prototype.createButton(this, game, 'question-mark', 'Exit: Back to the Fight!', (game.camera.width/2)+20, 475, 25, 25, (game.camera.width/2)-130,400, function () {});
        OutsideUi.prototype.createButton(this, game, 'question-mark', 'Vendor: Interact to purchase upgrades!', (game.camera.width/2)+170, 240, 25, 25, (game.camera.width/2)-20,190, function () {});
        

        GameMenu.prototype.addMenuOption('Back', 10 ,640, function () {
            game.state.start("BossUi");
        });
        GameMenu.prototype.addMenuOption('Menu', 1060, 640, function () {
            game.state.start("GameMenu");
        });

    }
};
