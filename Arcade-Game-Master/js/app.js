var Enemy = function(x,y) {
    'use strict';
    this.x = x;
    this.y = y;
    this.speed = this.enemyspeed();
    this.sprite = 'images/enemy-bug.png';
};
var highspeed = 300;
var lowspeed = 50;
var total = 0;

Enemy.prototype.update = function(dt) {
    if(this.x < 500){
      this.x = this.x + this.speed * dt ;
    }
    else{
      this.x = -100;
      this.speed = this.speed;
    }
};

Enemy.prototype.enemyspeed = function() {
  return Math.floor(Math.random()*(highspeed - lowspeed + 1) + lowspeed);
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var allEnemies = [
   new Enemy(0,60),
   new Enemy(0,145),
   new Enemy(0,230)
];

var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};


Player.prototype.resetPlayer = function () {
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function () {
    for(var i=0, len=allEnemies.length; i < len; i++) {
        if (this.x < allEnemies[i].x + 73 && this.x + 73 > allEnemies[i].x && this.y < allEnemies[i].y + 73 && this.y + 73 > allEnemies[i].y) {
            this.resetPlayer();
            break;
        }
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){
  if(key == 'left'){
     if(this.x>0){
       this.x = this.x - 100;
  }
}
  else if(key == 'up'){
    if(this.y>72){
       this.y = this.y - 82;
  }
  else{
    total = total + 1;
    $('#total').text(total);
    this.resetPlayer();
  }
}
 else if(key == 'right'){
  if(this.x<400){
      this.x = this.x + 100;
 }
}
  else if(key == 'down'){
     if(this.y<400){
        this.y = this.y + 82;
  }
}
};
var player = new Player(200,400);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
