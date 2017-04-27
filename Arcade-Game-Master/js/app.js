var Enemy = function(x,y) {
    'use strict';
    this.x = x;
    this.y = y;
    this.speed = this.enemyspeed();
    this.sprite = 'images/enemy-bug.png';
};
var highspeed = 400;
var lowspeed = 50;
var bigLoc = 800;
var smallLoc = 10;
var total = 0, level=0;
var a,b;

Enemy.prototype.update = function(dt) {
    if(this.x < 700){
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

var Player = function(x,y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.resetPlayer = function(){
    this.x = 300;
    this.y = 400;
};

Player.prototype.update = function(dt){
    var that = this;
    for(var i=0; i<allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 73 && this.x + 73 > allEnemies[i].x && this.y < allEnemies[i].y + 73 && this.y + 73 > allEnemies[i].y) {
            player.resetPlayer();
            if(level>0){
              level = level - 1;
              allEnemies.pop();
              $("#level").text(level);
            }
            break;
        }
    }

    if (this.x < chabi.x + 60 && this.x + 60 > chabi.x && this.y < chabi.y + 60 && this.y + 60 > chabi.y) {
        chabi.update();
        total = total + 100;
        $('#total').text(total);
    }

    // for(var y=0;y<rocky.length;y++){
    //   if (rocky[y].x < player.x + player.width && rocky[y].x + rocky[y].width > player.x && rocky[y].y < player.y + player.height && rocky[y].height + rocky[y].y > player.y) {
    //       player.halt();
    //   }
    // }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var key = function(x,y){
  this.x = x;
  this.y = y;
  this.sprite = 'images/Key.png';
}

key.prototype.render = function() {
    ctx.drawImage(Resources.get('images/Key.png'),this.x,this.y);
};

// key.prototype.location = function() {
//   return Math.floor(Math.random()*(highspeed - lowspeed + 1) + lowspeed);
// };

// setInterval(function(){
//   var a = Math.floor((Math.random() * 5) + 0) * 101;
//   var b = (Math.floor((Math.random() * 3) + 1) * 83)-20;
//   chabi.update();
// }, 1000);

key.prototype.update = function(dt) {
    var that=this;

      a = Math.floor((Math.random() * 7) + 0) * 101;
      b = (Math.floor((Math.random() * 3) + 1) * 83)-20;

      if( a<800 && a>=0 && b<250 && b>50){
          that.x = a;
          that.y = b;
      }
};

var chabi = new key(300,240);

// var rock = function(x,y){
//   this.x = x;
//   this.y = y;
//   this.width = 80;
//   this.height = 80;
//   this.sprite = 'images/Rock.png';
// }
//
// rock.prototype.render = function() {
//     ctx.drawImage(Resources.get('images/Rock.png'),this.x,this.y);
// };
//
// var rocky =[
//   new rock(100,145),
//   new rock(500,230)
// ];

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
    level = level + 1;
    $("#level").text(level);
    allEnemies.push(new Enemy(a-500,b));
    player.resetPlayer();
  }
 }
 else if(key == 'right'){
  if(this.x<600){
      this.x = this.x + 100;
 }
}
  else if(key == 'down'){
     if(this.y<400){
        this.y = this.y + 82;
  }
}
};
var player = new Player(300,400);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
