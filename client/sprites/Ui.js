function Ui() { }

Ui.prototype = {

    create: function (State) {

        State.hud = State.game.add.sprite(0, 0, 'hero-ui');
        State.hud.fixedToCamera = true;

        State.heroHealthTic = State.game.add.sprite(88,6, 'hero-ui-health-tic');
        State.heroHealthTic.fixedToCamera = true;

        State.heroXpTic = State.game.add.sprite(88, 26, 'hero-ui-xp-tic');
        State.heroXpTic.fixedToCamera = true;

        State.weaponHud = State.game.add.sprite(State.game.camera.width / 2, 630, 'weapon-ui');
        State.weaponHud.fixedToCamera = true;
        State.weaponHud.anchor.setTo(.5, 0);

        State.bit = State.game.add.sprite(500, 3, 'currency-icon');
        State.bit.fixedToCamera = true;
        State.bit.scale.setTo(0.03);

        State.selectedPistol = State.game.add.sprite(439, 632, 'selected-ui');
        State.selectedPistol.fixedToCamera = true;
        State.selectedPistol.visible = true;

        State.selectedShotgun = State.game.add.sprite(502, 632, 'selected-ui');
        State.selectedShotgun.fixedToCamera = true;
        State.selectedShotgun.visible = false;

        State.selectedRifle = State.game.add.sprite(568, 632, 'selected-ui');
        State.selectedRifle.fixedToCamera = true;
        State.selectedRifle.visible = false;

        State.selectedLaser = State.game.add.sprite(630, 632, 'selected-ui');
        State.selectedLaser.fixedToCamera = true;
        State.selectedLaser.visible = false;

        State.bossAlive = false;
        State.bossUi = State.game.add.sprite(25, 100, 'boss-ui');
        State.bossUi.fixedToCamera = true;
        State.bossUi.scale.setTo(0.11);
        State.bossUi.visible = false;

        State.bossHealthBar = State.game.add.sprite(5, 135, 'boss-health-bar');
        State.bossHealthBar.fixedToCamera = true;
        State.bossHealthBar.scale.setTo(1);
        State.bossHealthBar.visible = false;

        State.bossHealthTic = State.game.add.sprite(15, 145, 'boss-health-tic');
        State.bossHealthTic.fixedToCamera = true;
        State.bossHealthTic.visible = false;

        State.levelUi = State.game.add.sprite(60, 43, 'level-ui');
        State.levelUi.fixedToCamera = true;
        State.levelUi.scale.setTo(1);
        State.levelUi.visible = true;

        State.mercUi = State.game.add.sprite(95, 45, 'merc-ui');
        State.mercUi.fixedToCamera = true;
        State.mercUi.scale.setTo(1);
        State.mercUi.visible = true;

        State.mercUiGreen1 = State.game.add.sprite(96, 48, 'merc-ui-green');
        State.mercUiGreen1.fixedToCamera = true;
        State.mercUiGreen1.scale.setTo(1);
        State.mercUiGreen1.visible = false;

        State.mercUiGreen2 = State.game.add.sprite(118, 48, 'merc-ui-green');
        State.mercUiGreen2.fixedToCamera = true;
        State.mercUiGreen2.scale.setTo(1);
        State.mercUiGreen2.visible = false;

        State.mercUiGreen3 = State.game.add.sprite(140, 48, 'merc-ui-green');
        State.mercUiGreen3.fixedToCamera = true;
        State.mercUiGreen3.scale.setTo(1);
        State.mercUiGreen3.visible = false;

        State.mercUiRed1 = State.game.add.sprite(99, 49, 'merc-ui-red');
        State.mercUiRed1.fixedToCamera = true;
        State.mercUiRed1.scale.setTo(1);
        State.mercUiRed1.visible = false;

        State.mercUiRed2 = State.game.add.sprite(121, 49, 'merc-ui-red');
        State.mercUiRed2.fixedToCamera = true;
        State.mercUiRed2.scale.setTo(1);
        State.mercUiRed2.visible = false;

        State.mercUiRed3 = State.game.add.sprite(143, 49, 'merc-ui-red');
        State.mercUiRed3.fixedToCamera = true;
        State.mercUiRed3.scale.setTo(1);
        State.mercUiRed3.visible = false;

        State.waveUi = State.game.add.sprite(0, 70, 'wave-ui');
        State.waveUi.fixedToCamera = true;
        State.waveUi.scale.setTo(1);
        State.waveUi.visible = true;
    },

    update: function (State) {
        State.heroHealthTic.width = (State.player.health/State.player.maxHealth) * 81;
        State.heroXpTic.width = (State.player.playerXP/Math.pow(2, (State.player.playerLevel+1))) * 81;

        if ((State.wave % 5) === 0) {
            if(State.shaken ===false){
                game.camera.shake(0.005, 500);
                State.shaken = true;
            }
            if (State.bossAlive === true) {
                State.bossHealthTic.width = (State.boss.health / State.boss.maxHealth) * 50;
            }
            State.bossHealthBar.visible = true;
            State.bossUi.visible = true;
            State.bossHealthTic.visible = true;

        } else {
            State.shaken = false;
            State.bossHealthBar.visible = false;
            State.bossUi.visible = false;
            State.bossHealthTic.visible = false;
        }
        
        State.mercMax = 0;
      
        if (State.mercs.length > State.mercMax){
            State.mercMax = State.mercs.length
        }
        switch (State.mercMax) {
            case 1:

                if (State.mercs.countDead() === 1){
                    resetMercUi(State);
                    State.mercUiRed1.visible = true;
                }else {
                    resetMercUi(State);
                    State.mercUiGreen1.visible = true;
                }
                break;
            case 2:
            if(State.mercs.countDead() === 1){
                resetMercUi(State);
                State.mercUiGreen1.visible = true; 
                State.mercUiRed2.visible = true;
            } else if(State.mercs.countDead() === 2){
                resetMercUi(State);
                State.mercUiRed1.visible = true;
                State.mercUiRed2.visible = true;
            } else {
                resetMercUi(State);
                State.mercUiGreen1.visible = true;
                State.mercUiGreen2 = true;
            }
                break;
            case 3:
            if(State.mercs.countDead() === 1){
                resetMercUi(State);
                State.mercUiGreen1.visible = true; 
                State.mercUiGreen2.visible = true;
                State.mercUiRed3.visible = true;

            } else if(State.mercs.countDead() === 2){
                resetMercUi(State);
                State.mercUiGreen1.visible = true;
                State.mercUiRed2.visible = true;
                State.mercUiRed3.visble= true;
            } else if(State.mercs.countDead() === 3){
                resetMercUi(State);
                State.mercUiRed1.visible = true;
                State.mercUiRed2.visible = true;
                State.mercUiRed3.visible = true;
            } else {
                resetMercUi(State);
                State.mercUiGreen1.visible = true;
                State.mercUiGreen2.visible = true;
                State.mercUiGreen3.visible = true;
            }
          
                break;
            
        }
        function resetMercUi(State){
            State.mercUiGreen1.visible = false;
            State.mercUiGreen2.visible = false;
            State.mercUiGreen3.visible = false;

            State.mercUiRed1.visible = false;
            State.mercUiRed2.visible = false;
            State.mercUiRed3.visible = false;

        }
    }

};