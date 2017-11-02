
function House () {}

House.prototype = {

    create: function (State) {

        let house = State.game.add.sprite(State.map.house.x + 50, State.map.house.y - 25, 'player');
        house.anchor.set(0.5);
        house.scale.set(.001);
        house.animations.add('pistol-idle', Phaser.Animation.generateFrameNames('handgun/idle/', 1, 20, '.png', 2), 20, true, false);
        house.play('pistol-idle');
        State.game.physics.arcade.enable(house);
        house.body.setSize(State.map.houseRectangle.width, State.map.houseRectangle.height, State.map.house.x + 50, State.map.house.y - 25);
        house.body.collideWorldBounds = true;
        house.maxHealth = 10000;
        house.health = house.maxHealth;

        State.house = house;

    },

    update: function (State) {


        State.waveEnemies.forEachAlive(function(individual){
            State.game.physics.arcade.overlap(State.house, individual, function (house, individual) {
                console.log('hear');
                house.health -= 1;
            });
        });

        if(State.house.health <= 1){
            gameStatHandler.prototype.save(State);
            State.wave = (State.wave) - (State.wave % 5);
            if(State.wave % 5 == 0 && State.wave > 1){
                State.wave -= 5;
            }
            if(State.wave == 0){
                State.wave = 1;
            }
            gameStatHandler.prototype.wave = State.wave;
            State.game.state.start('levelHouse');
        }

    }
};