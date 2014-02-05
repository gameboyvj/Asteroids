Function.prototype.inherits = function (BaseClass) {
  function Surrogate () {};
  Surrogate.prototype = BaseClass.prototype;
  this.prototype = new Surrogate();
};

(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function (startx, starty, vel, radius, color) {
    this.x = startx;
    this.y = starty;
    this.vel = vel;
    this.radius = radius;
    this.color = color;

  };

  MovingObject.prototype.move = function() {
    this.x += this.vel[0];
    this.y += this.vel[1];
  }

  MovingObject.prototype.draw = function(ctx){
    ctx.fillStyle = this.color;
    cts.beginPath();
    cts.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    cts.fill();
  }

  MovingObject.prototype.isCollidedWith = function(otherObject){
    var distancex = Math.abs(this.x - otherObject.x);
    var distancey = Math.abs(this.y - otherObject.y);
    var distance = Math.sqrt(Math.pow(distancex) + Math.pow(distancey));
    return (distance > (this.radius + otherObject.radius));
  }

  var Asteroid = Asteroids.Asteroid = function(startx, starty, vel, radius, color){
      Astroids.MovingObject.call(this, startx, starty, vel, radius, color);
  };

  var Asteroid.COLOR = "black";
  var Asteroid.RADIUS = 10;

  var randomVec = function(){
    var vecx = Math.floor((Math.Random() * 10)) - 5;
    var vecy = Math.floor((Math.Random() * 10)) - 5;
    return [vecx, vecy];
  };

  Asteroid.prototype.randomAsteroid = function(dimx, dimy){
    var startx = Math.random() * dimx;
    var starty = Math.random() * dimy;
    var vec = randomVec();
    var radius = Asteroid.RADIUS;
    var color = Asteroid.COLOR;
    return new Asteroid(startx, starty, vec, radius, color);
  };


  Asteroid.inherits(Asteroids.MovingObject);

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = [];
  };

  var Game.DIM_X = 500;
  var Game.DIM_Y = 500;

  Game.prototype.addAsteroids = function (numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    }
  };

  Game.prototype.draw = function () {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    for (var i = 0; i < asteroids.length; i++) {
      asteroids[i].draw(this.ctx);
    }
  };

  Game.prototype.move = function () {
    for (var i = 0; i < asteroids.length; i++) {
      asteroids[i].move();
    }
  };

  Game.prototype.step = function () {
    this.move();
    this.draw();
  };

  var Game.FPS = 30;

  Game.prototype.start = function () {
    window.setInterval(this.step, Game.FPS);
  };
})(this);