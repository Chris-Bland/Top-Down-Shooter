var MainMenu = function(){};

MainMenu.prototype.create = function(){
    background = game.add.sprite(0,0);
    background.width = 800;
    background.height = 800;
    filter = game.add.filter('Fire', window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);
    filter.alpha = 0.0;
    background.filters = [filter];

    this.createButton(game,"Play",game.world.centerX,game.world.centerY +32, 300, 100, function(){
        game.state.start('levelOutside');
    });
    this.createButton(game,"About",game.world.centerX,game.world.centerY +110, 300, 100, function(){
        console.log("Top down, survival tower defence built with phaser library");
    });
    titlescreen = game.add.sprite(game.world.centerX,game.world.centerY - 192, 'menu-image');
    titlescreen.anchor.setTo(0.5,0.5);
};

MainMenu.prototype.update = function(){
    filter.update();
};

MainMenu.prototype.createButton = function(game,string,x,y,width,height,callback){
    var button1 = game.add.button(x,y,'button',callback,game,2,1,0);
    button1.anchor.setTo(0.5,0.5);
    button1.width = width;
    button1.height = height;
    var text = game.add.text(button1.x,button1.y, string, {font:"14px Arial", fill:"#fff", align:"center"});
    text.anchor.setTo(0.5,0.5);
};