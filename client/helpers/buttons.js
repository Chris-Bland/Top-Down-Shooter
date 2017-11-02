var buttons = function () { };

buttons.prototype = {
    create: function(){
        
},
createButton: function (State, game, sprite, description, x, y, width, height, string, callback) {
    
         
         var button = game.add.button(x, y, sprite, callback, game, 2, 1, 0);
         button.anchor.setTo(0.5, 0.5);
         button.width = width;
         button.height = height;
         button.fixedToCamera = true;
         State.buttons.add(button);
         State.buttons.visible = false;
 
 
         var descriptiveText = game.add.text((State.game.camera.width/2), (State.game.camera.height / 2)+150, description, { font: "20px Arial", fill: "#fff", align: "center" });
         descriptiveText.fixedToCamera = true;
         descriptiveText.anchor.setTo(.5);
         descriptiveText.visible = false;
 
         var onOver = function (target) {
            button.scale.setTo(1.25);
            descriptiveText.visible = true;
           };
           var onOut = function (target) {
             button.scale.setTo(1);
             descriptiveText.visible = false;
           };
 
           button.events.onInputUp.add(callback, this);
           button.events.onInputOver.add(onOver, this);
           button.events.onInputOut.add(onOut, this);
 
         var text = game.add.text(button.x + 5, button.y + 63, string, { font: "20px Arial", fill: "#fff", align: "center" });
         text.anchor.setTo(0.5, 0.5);
         text.fixedToCamera = true;
         State.texts.add(text);
         State.texts.visible = false;
 
     },

};