Function.prototype.inherits = function (BaseClass) {
  function Surrogate() {};
  Surrogate.prototype = BaseClass.prototype;
  this.prototype = new Surrogate();
};

(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(startx, starty, vel, radius, color){
      Asteroids.MovingObject.call(this, startx, starty, vel, radius, color);
  };

  var COLOR = "silver";
  var RADIUS = 15;
  var MAX_SPEED = 2;

  var randomVec = function(){
    //var vecx = Math.floor((Math.random() * MAX_SPEED)) - MAX_SPEED / 2;
    //var vecy = Math.floor((Math.random() * MAX_SPEED)) - MAX_SPEED / 2;
    var vecx = Math.random() * (MAX_SPEED*2) - MAX_SPEED;
    var vecy = Math.random() * (MAX_SPEED*2) - MAX_SPEED;
    console.log(vecx);
    console.log(vecy);
    return [vecx, vecy];
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.randomAsteroid = function(dimx, dimy){
    var startx = Math.random() * dimx;
    var starty = Math.random() * dimy;
    var vec = randomVec();
    var radius = RADIUS;
    var color = COLOR;
    return new Asteroid(startx, starty, vec, radius, color);
  };

})(this);

