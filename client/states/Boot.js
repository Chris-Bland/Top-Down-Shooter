var Boot = function () {};

Boot.prototype.init = function() {

    game.input.maxPointers = 1;
    game.stage.disableVisibilityChange = true;

};

Boot.prototype.create = function() {

    game.state.start('Preloader');

};

