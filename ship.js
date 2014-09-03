(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var SHIP_RADIUS = 10;
  var SHIP_COLOR = "yellow";

  var Ship = Asteroids.Ship = function(startx, starty, vel){
    Asteroids.MovingObject.call(this, startx, starty, vel, SHIP_RADIUS, SHIP_COLOR);
  }

  Ship.inherits(Asteroids.MovingObject);

  var MAX_SPEED = 5;

  Ship.prototype.power = function(impulse){
    var xvel = this.vel[0] + impulse[0]
    var yvel = this.vel[1] + impulse[1]
    if (xvel > MAX_SPEED) {
      xvel = MAX_SPEED;
    } else if (xvel < MAX_SPEED * -1) {
      xvel = MAX_SPEED * -1;
    }
    if (yvel > MAX_SPEED) {
      yvel = MAX_SPEED;
    } else if (yvel < MAX_SPEED * -1) {
      yvel = MAX_SPEED * -1;
    }
    this.vel[0] = xvel;
    this.vel[1] = yvel;
  }

  var bulletSpeed = 6;

  Ship.prototype.fireBullet = function(game) {
    if (this.vel !== [0, 0]) {
      var shipSpeed = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
      var bulletVelocity = [ bulletSpeed * (this.vel[0] / shipSpeed),
        bulletSpeed * (this.vel[1] / shipSpeed) ];

      return new Asteroids.Bullet(this.x, this.y, bulletVelocity, game)
    }
  }

})(this);