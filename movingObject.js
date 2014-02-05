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
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fill();
  }

  MovingObject.prototype.isCollidedWith = function(otherObject){
    var distancex = Math.abs(this.x - otherObject.x);
    var distancey = Math.abs(this.y - otherObject.y);
    var distance = Math.sqrt(Math.pow(distancex, 2) + Math.pow(distancey, 2));
    return (distance < (this.radius + otherObject.radius));
  }

})(this);
