var MercHealer = function() {};

MercHealer.prototype = {

    create: function(State){

        var mercHealers = game.add.group();
        var mercHealersTotal = gameStatHandler.prototype.mercHealersAmount;
        for(var i = 0; i < mercHealersTotal; i++){
            var mercHealer = mercHealers.create(2977 + i, 1060 + i, 'merc');
            mercHealer.tint = 0x00ff00;
            mercHealer.MOVE_SPEED = 500 + State.player.playerLevel * 5;
            mercHealer.anchor.set(0.5);
            mercHealer.scale.set(0.15);
            mercHealer.animations.add('idle', [0, 1, 2, 3, 5, 6, 7, 8, 14, 19, 20], 20, true);
            mercHealer.animations.add('move', [4, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], 18, true);
            mercHealer.play('idle');
            mercHealer.maxHealth = 100;
            mercHealer.health = mercHealer.maxHealth;
            game.physics.arcade.enable(mercHealer);
            mercHealer.body.setSize(100, 150, 100, 50);
            mercHealer.body.collideWorldBounds = true;
            mercHealer.hitPoints = 10;
            mercHealer.gun = Beam.prototype;
            mercHealer.bullets = mercHealer.gun.create(State, 0x00ff00);
            mercHealer.shootTime = 0;
        }

        State.mercHealers = mercHealers;

    },

    update: function(State){

        behaviorsObj.prototype.selfCollide(State, State.mercHealers);

        State.mercHealers.forEachAlive(function(healer){

            behaviorsObj.prototype.bodyCollide(State, healer);
            behaviorsObj.prototype.bodyOverlap(State, healer, [State.waveEnemies]);
            behaviorsObj.prototype.bulletCollide(State, healer.bullets);
            behaviorsObj.prototype.beamOverlap(State, healer.bullets, [[State.player], State.mercs, State.mercHealers, State.mercTanks]); //BeamOverlap
            behaviorsObj.prototype.mercMove(State, healer);
            behaviorsObj.prototype.healShoot(State, healer, State.player, [State.mercs, State.mercHealers, State.mercTanks]); //healShoot

        });

    }

};
