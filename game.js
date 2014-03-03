var test_game = "stuff";
(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var DIM_X = 500;
  var DIM_Y = 500;

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = [];
    this.bullets = [];
    this.ship = null;
  };



  Game.prototype.addAsteroids = function (numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(DIM_X, DIM_Y));
    }
  };

  Game.prototype.draw = function () {
    this.ctx.clearRect(0, 0, DIM_X, DIM_Y);
    /*
    var that = this;
    var img = new Image();
    img.onload = function () {
      that.ctx.drawImage(img, 0, 0);
    };
    img.src = "tumblr_m2ut9qqIzi1qcphveo1_500.jpg";
*/
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(this.ctx);
    }

    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].draw(this.ctx);
    }

    this.ship.draw(this.ctx);


  };


  Game.prototype.move = function () {
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].move();
    }

    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].move();
    }

    this.ship.move();
  };

  Game.prototype.step = function () {
    this.move();
    this.draw();
    this.checkCollisions();
    //this.removeOffscreenAsteroids();
    this.findOutOfBoundObjects();
    this.checkWin();
  };


  var FPS = 10;
  var NUMBER_OF_ASTEROIDS = 5;

  Game.prototype.start = function () {

    this.addAsteroids(NUMBER_OF_ASTEROIDS);
    this.ship = new Asteroids.Ship(DIM_X / 2, DIM_Y / 2, [0, 0]);
    this.timerId = window.setInterval(this.step.bind(this), FPS);
    this.bindKeyHandlers();
  };

  Game.prototype.checkCollisions = function(){
    var that = this;
    for(var i = 0; i < this.asteroids.length; i++){
      if(this.asteroids[i].isCollidedWith(this.ship)){
        that.stop();
        var x = confirm("You Lost. Play Again?");
         
        if(x == true){
          that.start();
        }else{
      
        }
      }
    }
  }

  Game.prototype.stop = function(){
    window.clearInterval(this.timerId);
    this.asteroids = [];
    this.ship = null;
    this.resetKeyHandlers();
  }

  Game.prototype.findOutOfBoundObjects = function(){
    var asteroidsOut = _.select(this.asteroids, isOutOfBounds);
    var bulletsOut = _.select(this.bullets, isOutOfBounds);
    var game = this;

    asteroidsOut.forEach(game.moveToOppositeSide);
    bulletsOut.forEach(game.removeBullet);

    if (isOutOfBounds(this.ship)) {
      this.moveToOppositeSide(this.ship);
    }
  }

  Game.prototype.moveToOppositeSide = function(object) {
    if (object.x < 0) {
      object.x = DIM_X;
    } else if (object.x > DIM_X) {
      object.x = 0;
    }
    if (object.y < 0) {
      object.y = DIM_Y;
    } else if (object.y > DIM_Y) {
      object.y = 0;
    }
  }

  Game.prototype.removeOffscreenAsteroids = function(){
    this.asteroids = _.reject(this.asteroids, isOutOfBounds);
  }

  Game.prototype.removeAsteroid = function (removedAsteroid) {
    this.asteroids = _.reject(this.asteroids, function (asteroid) {
      if (removedAsteroid.x === asteroid.x && removedAsteroid.y === asteroid.y) {
        return true;
      } else {
        return false;
      }
    })
  }

  Game.prototype.removeBullet = function (removedBullet) {
    this.bullets = _.reject(this.bullets, function (bullet) {
      if (removedBullet.x === bullet.x && removedBullet.y === bullet.y) {
        return true;
      } else {
        return false;
      }
    })
  }

  isOutOfBounds = function(asteroid) {
    if(asteroid.x < 0 || asteroid.x > DIM_X){
      return true;
    } else if (asteroid.y < 0 || asteroid.y > DIM_Y) {
      return true;
    } else {
      return false;
    }
  }

  Game.prototype.fireBullet = function () {
    this.bullets.push(this.ship.fireBullet(this));
  }

  Game.prototype.resetKeyHandlers = function(){
     var game = this;
     key.unbind('up');
    key.unbind('down');
    key.unbind('left');
    key.unbind('right');
    key.unbind('space');
     //game.ship.vel = [0,0]
    // game.ship.power([0,1]);
    // game.ship.power([0,-1]);
    // game.ship.power([1,0]);
    // game.ship.power([-1,0]);
    
  }
  Game.prototype.bindKeyHandlers = function(){
    var game = this;

    key('up', function(){game.ship.power([0,-1])});
    key('down', function(){game.ship.power([0,1])});
    key('left', function(){game.ship.power([-1,0])});
    key('right', function(){game.ship.power([1,0])});
    key('space', this.fireBullet.bind(game));
  }

  Game.prototype.checkWin = function(){
    if(this.asteroids.length ==0){
      var x = confirm("You Win!!! Play Again?");
      this.stop();
      if(x == true){
        this.start();
      }     
    }
  }
})(this);

