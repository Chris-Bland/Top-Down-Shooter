var GameMenu = function() {};

GameMenu.prototype = {

  menuConfig: {
    startY: 260,
    startX: 30
  },
  preload: function () {
    this.optionCount = 1;
  },

  init: function () {
    this.titleText = game.make.text(game.camera.width / 2, 150, "Game Title", {
      font: 'bold 70pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  },

  create: function () {

    if (music.name !== "music" && playMusic) {
      music.stop();
      music = game.add.audio('music');
      music.loop = true;
      music.play();
    }
    game.stage.disableVisibilityChange = true;
    background = game.add.sprite(0, 0, 'menu-bg');
    background.width = 1200;
    background.height = 700;
    game.add.existing(this.titleText);

    this.addMenuOption('Start', 50, (this.optionCount * 80) + 350, function () {
        game.state.start("levelOutside");
      });
      this.addMenuOption('Controls', 50, (this.optionCount * 80) + 350, function () {
        game.state.start("Controls");
      });
      this.addMenuOption('Credits', 50, (this.optionCount * 80) + 350, function () {
        game.state.start("Credits");
      });

  },

addMenuOption: function(text, x, y, callback) {
    var optionStyle = { font: '40pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(x, y, text, optionStyle);

    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "white";
      target.stroke = "rgba(0,0,0,0)";
      txt.useHandCursor = false;
    };
    txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.fixedToCamera = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;
  },
};
