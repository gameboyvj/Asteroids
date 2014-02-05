(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var BULLET_COLOR = "orange";
  var BULLET_RADIUS = 5;

  var Bullet = Asteroids.Bullet = function(startx, starty, vel, game){
    Asteroids.MovingObject.call(this, startx, starty, vel, BULLET_RADIUS, BULLET_COLOR);
    this.game = game;
  }

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.hitAsteroids = function(){
    for(var i = 0; i < this.game.asteroids.length; i++){
      if(this.game.asteroids[i].isCollidedWith(this)){
        this.game.removeAsteroid(this.game.asteroids[i]);
        this.game.removeBullet(this);
      }
    }
  }

  Bullet.prototype.move = function() {
    Asteroids.MovingObject.prototype.move.call(this);

    this.hitAsteroids();
  }

})(this);
