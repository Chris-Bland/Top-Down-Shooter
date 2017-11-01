var MercTank = function() {};

MercTank.prototype = {

    create: function(State){
        var mercTanks = game.add.group();
        var mercTanksTotal = gameStatHandler.prototype.mercTanksAmount;
        for(var i = 0; i < mercTanksTotal; i++){
            var mercTank = mercTanks.create(2977 + i, 1060 + i, 'merc');
            mercTank.tint = 0x00ff00;
            mercTank.MOVE_SPEED = 500 + State.player.playerLevel * 5;
            mercTank.anchor.set(0.5);
            mercTank.scale.set(0.3);
            mercTank.animations.add('idle', [0, 1, 2, 3, 5, 6, 7, 8, 14, 19, 20], 20, true);
            mercTank.animations.add('move', [4, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], 18, true);
            mercTank.play('idle');
            mercTank.maxHealth = 1000;
            mercTank.health = mercTank.maxHealth;
            game.physics.arcade.enable(mercTank);
            mercTank.body.setSize(100, 150, 100, 50);
            mercTank.body.collideWorldBounds = true;
            mercTank.hitPoints = 10;
            mercTank.shootTime = 0;
        }

        State.mercTanks = mercTanks;

    },

    update: function(State){

        behaviorsObj.prototype.selfCollide(State, State.mercTanks);

        State.mercTanks.forEachAlive(function(tank){

            behaviorsObj.prototype.bodyCollide(State, tank);
            behaviorsObj.prototype.bodyOverlap(State, tank, [State.waveEnemies]);
            behaviorsObj.prototype.bulletCollide(State, tank.bullets);
            behaviorsObj.prototype.bulletOverlap(State, tank.bullets, [State.waveEnemies]);
            behaviorsObj.prototype.tankMeleeMove(State, tank, State.boss, [State.waveEnemies]);

        });

    }

};
