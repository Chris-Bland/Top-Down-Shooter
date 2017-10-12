var Merc = function() {};

Merc.prototype = {

    create: function(State){

        let mercs = game.add.group();
        let mercsTotal = gameStatHandler.prototype.mercsAmount;
        for(let i = 0; i < mercsTotal; i++){
            let merc = mercs.create(2977 + i, 1060 + i, 'merc');
            merc.tint = 0x00ff00;
            merc.MOVE_SPEED = 500;
            merc.anchor.set(0.5);
            merc.scale.set(0.2);
            merc.animations.add('idle', [0, 1, 2, 3, 5, 6, 7, 8, 14, 19, 20], 20, true);
            merc.animations.add('move', [4, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], 18, true);
            merc.play('idle');
            merc.maxHealth = 100;
            merc.health = merc.maxHealth;
            game.physics.arcade.enable(merc);
            merc.body.setSize(100, 150, 100, 50);
            merc.body.collideWorldBounds = true;
            merc.hitPoints = 10;
            merc.gun = Rifle.prototype;
            merc.bullets = merc.gun.create(State, merc);
            merc.shootTime = 0;
        }
    
        State.mercs = mercs;

    },

    update: function(State){

        behaviorsObj.prototype.selfCollide(State, State.mercs);

        State.mercs.forEachAlive(function(merc){

            behaviorsObj.prototype.bodyCollide(State, merc);
            behaviorsObj.prototype.bodyOverlap(State, merc, [State.waveEnemies]);
            behaviorsObj.prototype.bulletCollide(State, merc.bullets);
            behaviorsObj.prototype.bulletOverlap(State, merc.bullets, [State.waveEnemies]);
            behaviorsObj.prototype.shoot(State, merc, State.boss, [State.waveEnemies]);
            behaviorsObj.prototype.mercMove(State, merc);

        });

    }

};
