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
var total = 0, level = 0 , lives = 6  , Gem = 0;
var a,b,sprite,gems;

var collision = document.createElement("audio");
collision.src = "audio/sfx_collide.wav";

var gong = document.createElement("audio");
gong.src = "audio/sfx_gong.wav";

var items = document.createElement("audio");
items.src = "audio/sfx_book.wav";

Enemy.prototype.update = function(dt) {
    if(this.x < 1200){
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
   new Enemy(0,230),
   new Enemy(0,315)
];

var sprity = ['images/char-boy.png' , 'images/char-cat-girl.png' , 'images/char-horn-girl.png' , 'images/char-pink-girl.png' , 'images/char-princess-girl.png' , 'images/Mike.png' , 'images/uda.png'];

var Player = function(x,y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.resetPlayer = function(){
    this.x = 300;
    this.y = 400;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt){
    var that = this;
    for(var i=0; i<allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 73 && this.x + 73 > allEnemies[i].x && this.y < allEnemies[i].y + 73 && this.y + 73 > allEnemies[i].y) {
            collision.play();
            player.resetPlayer();
            lives = lives - 1;
            $('#lives').html("Lives: "+lives);
            if(lives <= 0){
              gong.play();
              alert("Well Played!! You got some skills.");
              location.reload();
            }
            gong.pause();
            if(level>0){
              level = level - 1;
              allEnemies.pop();
              $('#level').html("<span>LVL: "+level+"</span>");
            }
            break;
        }
    }
    gong.pause();

    if (this.x < heart.x + 60 && this.x + 60 > heart.x && this.y < heart.y + 60 && this.y + 60 > heart.y) {
        if(lives < 6){
          lives = lives + 1;
          items.play();
        }
        $('#lives').html("Lives: "+lives);
        heart.update();
        total = total + 100;
        $('#total').html("<span>Total: "+total+"</span>");
    }

    if (this.x < star.x + 60 && this.x + 60 > star.x && this.y < star.y + 60 && this.y + 60 > star.y) {
        star.update();
        items.play();
        total = total + 50;
        $('#total').html("<span>Total: "+total+"</span>");
    }

    if (this.x < treeShort.x + 60 && this.x + 60 > treeShort.x && this.y < treeShort.y + 60 && this.y + 60 > treeShort.y){
        if(total>0){
            total = total - 2;
        }
        $('#total').html("<span>Total: "+total+"</span>");
    }

    if (this.x < treeTall.x + 60 && this.x + 60 > treeTall.x && this.y < treeTall.y + 60 && this.y + 60 > treeTall.y){
        if(total>0){
            total = total - 3;
        }
        $('#total').html("<span>Total: "+total+"</span>");
    }

    if (this.x < treeUgly.x + 60 && this.x + 60 > treeUgly.x && this.y < treeUgly.y + 60 && this.y + 60 > treeUgly.y){
        if(total>0){
            total = total - 1;
        }
        $('#total').html("<span>Total: "+total+"</span>");
    }

    if (this.x < gem.x + 60 && this.x + 60 > gem.x && this.y < gem.y + 60 && this.y + 60 > gem.y){
        Gem = Gem + 1;
        items.play();
        $('#Gem').html("Gems: "+Gem);

        gems = Math.floor(Math.random() * 2);
        gem.sprite = gemy[gems];
        gem.update();

        sprite = Math.floor(Math.random() * 7);
        this.sprite = sprity[sprite];
    }


};

var heart = function(x,y){
  this.x = x;
  this.y = y;
  this.sprite = 'images/heart.png';
}

heart.prototype.render = function() {
    ctx.drawImage(Resources.get('images/heart.png'),this.x,this.y);
};

// key.prototype.location = function() {
//   return Math.floor(Math.random()*(highspeed - lowspeed + 1) + lowspeed);
// };

// setInterval(function(){
//   var a = Math.floor((Math.random() * 5) + 0) * 101;
//   var b = (Math.floor((Math.random() * 3) + 1) * 83)-20;
//   chabi.update();
// }, 1000);

heart.prototype.update = function(dt) {
    var that=this;

      a = Math.floor((Math.random() *11) + 1) * 101;
      b = (Math.floor((Math.random() * 4) + 1) * 83)-20;

      if( a<2000 && a>=0 && b<350 && b>50&& a!=303 && b!=60){
          that.x = a;
          that.y = b;
      }
};

var heart = new heart(300,80);

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
// var rocky = new rock(303,312);

var star = function(x,y){
  this.x = x;
  this.y = y;
  this.sprite = 'images/Star.png';
}

star.prototype.render = function() {
    ctx.drawImage(Resources.get('images/Star.png'),this.x,this.y);
};

// key.prototype.location = function() {
//   return Math.floor(Math.random()*(highspeed - lowspeed + 1) + lowspeed);
// };

// setInterval(function(){
//   var a = Math.floor((Math.random() * 5) + 0) * 101;
//   var b = (Math.floor((Math.random() * 3) + 1) * 83)-20;
//   chabi.update();
// }, 1000);

star.prototype.update = function(dt) {
    var that=this;

      a = Math.floor((Math.random() *11) + 1) * 101;
      b = (Math.floor((Math.random() * 4) + 1) * 83)-20;

      if( a<2000 && a>=0 && b<450 && b>50 && a!=303 && b!=60){
          that.x = a;
          that.y = b;
      }
};

setInterval(function(){
   star.update();
}, 3000);

var star = new star(600,70);

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
    $('#total').html("<span>Total: "+total+"</span>");
    level = level + 1;
    $('#level').html("<span>LVL: "+level+"</span>");
    allEnemies.push(new Enemy(a-500,b));
    player.resetPlayer();
  }
 }
 else if(key == 'right'){
  if(this.x<1100){
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

var treeShort = function(x,y){
  this.x = x;
  this.y = y;
  this.sprite = 'images/tree-short.png';
}

treeShort.prototype.render = function() {
    ctx.drawImage(Resources.get('images/tree-short.png'),this.x,this.y);
};

var treeShort = new treeShort(404,312);

var treeTall = function(x,y){
  this.x = x;
  this.y = y;
  this.sprite = 'images/tree-tall.png';
}

treeTall.prototype.render = function() {
    ctx.drawImage(Resources.get('images/tree-tall.png'),this.x,this.y);
};

var treeTall = new treeTall(100,150);

var treeUgly = function(x,y){
  this.x = x;
  this.y = y;
  this.sprite = 'images/tree-ugly.png';
}

treeUgly.prototype.render = function() {
    ctx.drawImage(Resources.get('images/tree-ugly.png'),this.x,this.y);
};

var treeUgly = new treeUgly(1010,60);

var restart = document.getElementById("restart");
restart.addEventListener('click' , function(){
  location.reload();
});

var gemy = ['images/Gem Green.png' , 'images/Gem Blue.png'];

var gem = function(x,y){
  this.x = x;
  this.y = y;
  this.sprite = 'images/Gem Green.png';
}

gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

gem.prototype.update = function(dt) {
    var that=this;

      a = Math.floor((Math.random() *11) + 1) * 101;
      b = (Math.floor((Math.random() * 4) + 1) * 83)-20;

      if( a<2000 && a>=0 && b<450 && b>50 && a!=303 && b!=60){
          that.x = a;
          that.y = b;
      }
};

// setInterval(function(){
//    star.update();
// }, 3000);

var gem = new gem(600,70);
