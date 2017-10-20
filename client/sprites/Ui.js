function Ui () {}

Ui.prototype = {

    create: function(State){

State.hud = State.game.add.sprite(0,0, 'hero-ui');
State.hud.fixedToCamera = true;

State.weaponHud = State.game.add.sprite(State.game.camera.width / 2,630, 'weapon-ui');
State.weaponHud.fixedToCamera = true;
State.weaponHud.anchor.setTo(.5,0);

State.bit = State.game.add.sprite(500,3, 'currency-icon');
State.bit.fixedToCamera = true;
State.bit.scale.setTo(0.03);

State.selectedPistol = State.game.add.sprite(439,632, 'selected-ui');
State.selectedPistol.fixedToCamera = true;
State.selectedPistol.visible = true;

State.selectedShotgun = State.game.add.sprite(502,632, 'selected-ui');
State.selectedShotgun.fixedToCamera = true;
State.selectedShotgun.visible = false;

State.selectedRifle = State.game.add.sprite(568,632, 'selected-ui');
State.selectedRifle.fixedToCamera = true;
State.selectedRifle.visible = false;

State.selectedLaser = State.game.add.sprite(630,632, 'selected-ui');
State.selectedLaser.fixedToCamera = true;
State.selectedLaser.visible = false;

State.bossUi = State.game.add.sprite(25,100, 'boss-ui');
State.bossUi.fixedToCamera = true;
State.bossUi.scale.setTo(0.11);
State.bossUi.visible = true;

State.bossHealthBar = State.game.add.sprite(5,135, 'boss-health-bar');
State.bossHealthBar.fixedToCamera = true;
State.bossHealthBar.scale.setTo(1);
State.bossHealthBar.visible = true;

State.bossHealthTic = State.game.add.sprite(10,145, 'boss-health-tic');
State.bossHealthTic.fixedToCamera = true;
State.bossHealthTic.scale.setTo(5, 1);
State.bossHealthTic.visible = true;

State.levelUi = State.game.add.sprite(60,43, 'level-ui');
State.levelUi.fixedToCamera = true;
State.levelUi.scale.setTo(1);
State.levelUi.visible = true;

State.mercUi = State.game.add.sprite(95,45, 'merc-ui');
State.mercUi.fixedToCamera = true;
State.mercUi.scale.setTo(1);
State.mercUi.visible = true;

State.mercUiGreen1 = State.game.add.sprite(96,48, 'merc-ui-green');
State.mercUiGreen1.fixedToCamera = true;
State.mercUiGreen1.scale.setTo(1);
State.mercUiGreen1.visible = true;

State.mercUiGreen2 = State.game.add.sprite(118,48, 'merc-ui-green');
State.mercUiGreen2.fixedToCamera = true;
State.mercUiGreen2.scale.setTo(1);
State.mercUiGreen2.visible = false;

State.mercUiGreen3 = State.game.add.sprite(140,48, 'merc-ui-green');
State.mercUiGreen3.fixedToCamera = true;
State.mercUiGreen3.scale.setTo(1);
State.mercUiGreen3.visible = false;

State.mercUiRed1 = State.game.add.sprite(99,49, 'merc-ui-red');
State.mercUiRed1.fixedToCamera = true;
State.mercUiRed1.scale.setTo(1);
State.mercUiRed1.visible = false;

State.mercUiRed2 = State.game.add.sprite(121,49, 'merc-ui-red');
State.mercUiRed2.fixedToCamera = true;
State.mercUiRed2.scale.setTo(1);
State.mercUiRed2.visible = true;

State.mercUiRed3 = State.game.add.sprite(143,49, 'merc-ui-red');
State.mercUiRed3.fixedToCamera = true;
State.mercUiRed3.scale.setTo(1);
State.mercUiRed3.visible = false;

State.waveUi = State.game.add.sprite(0,70, 'wave-ui');
State.waveUi.fixedToCamera = true;
State.waveUi.scale.setTo(1);
State.waveUi.visible = true;

    }
};