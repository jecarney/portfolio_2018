define(["helper/util"], function (util) {

  const Particle = function (canvas, context, colour, posX, posY, size){
        this.x = posX;
        this.y = posY;
        this.colour = colour;
        this.draw = function(context) {
          context.beginPath();
          context.fillStyle = this.colour;
          context.rect(this.x,this.y,size,size);
          context.fill();
        }
      }

  return (Particle);

});
