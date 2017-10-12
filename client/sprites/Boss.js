function Boss () {}

Boss.prototype = {

    create: function(State){
        //B
        let spawnPoint = State.map.bossSpawn;
        let boss = State.waveEnemies.create(spawnPoint.x, spawnPoint.y, 'flashlight-enemy');
        boss.MOVE_SPEED = State.player.Move_SPEED - 100;
        boss.tint = 0xff0000;
        boss.anchor.set(0.5);
        boss.scale.set(0.4);
        boss.animations.add('melee', [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35], 35, true);
        boss.animations.add('idle', [0, 1, 2, 3, 5, 6, 7, 8, 14, 19, 20], 20, true);
        boss.animations.add('move', [4, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], 18, true);
        boss.play('idle');
        boss.maxHealth = 1000 * (State.wave/5);
        boss.health = boss.maxHealth;
        game.physics.arcade.enable(boss);
        boss.body.setSize(200, 300, 100, 50);
        boss.body.collideWorldBounds = true;
        boss.shootTime = 0;
        boss.hitPoints = 5 * (State.wave/5);
        behaviorsObj.prototype.findPathTo(State, 87, 6, boss.x, boss.y, boss)
        
        if(State.wave%35 == 0){
            boss.gun = Laser.prototype;
            boss.bullets = boss.gun.create(State);
        }
        else if(State.wave%30 == 0){
            boss.gun = Laser.prototype;
            boss.bullets = boss.gun.create(State);
        }
        else if(State.wave%25 == 0){
            boss.gun = Sniper.prototype;
            boss.bullets = boss.gun.create(State);
        }
        else if(State.wave%20 == 0){
            boss.gun = Rifle.prototype;
            boss.bullets = boss.gun.create(State);
        }
        else if(State.wave%15 == 0){
            boss.gun = Shotgun.prototype;
            boss.bullets = boss.gun.create(State);
        }
        else if(State.wave%10 == 0){
            boss.gun = Aoe.prototype;
            boss.bullets = boss.gun.create(State);
        }
        else if(State.wave%5 == 0){
            boss.gun = Pistol.prototype;
            boss.bullets = boss.gun.create(State);
        }

       
    }

};