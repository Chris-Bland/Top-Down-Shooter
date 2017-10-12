
function House () {}

House.prototype = {

    create: function(State){

        State.house = State.map.houseRectangle;
        State.house.maxHealth = 10000;
        State.house.health = State.house.maxHealth;

    },

    update: function(State){


        if(State.boss){
            State.game.physics.arcade.collide(State.house, State.boss, function(){State.house.health -= 5;});
        }
        State.game.physics.arcade.collide(State.house, State.enemies, function(){State.house.health -= 1;});
        State.game.physics.arcade.collide(State.house, State.shotgunEnemies, function(){State.house.health -= 3;});
        State.game.physics.arcade.collide(State.house, State.pistolEnemies, function(){State.house.health -= 2;});
        State.game.physics.arcade.collide(State.house, State.rifleEnemies, function(){State.house.health -= 4;});
        

        if(State.house.health < 1){
            State.game.state.start('levelHouse');
        }

    }

}