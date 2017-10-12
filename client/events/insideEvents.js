insideEvents = function () { };

insideEvents.prototype = {

    openingTween: function(State){

        State.cutscene = true;
        
        State.player.position.set(State.map.entrance.x, State.map.entrance.y - 50);
        State.player.angle = 0;

        State.tween = State.game.add.tween(State.player).to({ x: State.map.start.x, y: State.map.start.y }, 1500);
        State.tween.onComplete.add(() => {
            State.cutscene = false;
        });
        State.tween.start();

    }

};