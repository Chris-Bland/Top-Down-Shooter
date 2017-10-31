dungeonEvents = function () { };

dungeonEvents.prototype = {

    openingTween: function(State){

        State.cutscene = true;
        
        State.player.position.set(1644, 30);
        State.player.angle = 0;

        State.tween = State.game.add.tween(State.player).to({ x: 1644, y: 50 }, 1500);
        State.tween.onComplete.add(() => {
            State.cutscene = false;
        });
        State.tween.start();

    }

};