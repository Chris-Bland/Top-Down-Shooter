var BossUi = function () { };

BossUi.prototype = {

    create: function () {
        bossSlide = game.add.sprite(game.camera.width / 2, 20, 'boss-slide');
bossSlide.fixedToCamera = true;
bossSlide.scale.setTo(.45, .45);
bossSlide.anchor.setTo(.5,0);

GameMenu.prototype.addMenuOption('Back',10 ,640 , function () {
    game.state.start("OutsideUi");
  });
  GameMenu.prototype.addMenuOption('Next', 1080,640 , function () {
    game.state.start("InsideUi");
  });
    }
};