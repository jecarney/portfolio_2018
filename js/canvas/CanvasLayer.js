define([], function () {

  function pick(event, context, doc) {
    let x = event.layerX;
    let y = event.layerY;
    console.log('x: ' + x);
    console.log('y: ' + y);
  }

  const CanvasLayer = function (doc, canvasID){

    this.canvas = doc.getElementById(canvasID);
    this.context = this.canvas.getContext('2d');
    this.fitToContainer = function(){
      // // Make it visually fill the positioned parent

      this.canvas.style.width ='100%';
      this.canvas.style.height='100%';
      // // set internal size to match
      this.canvas.width  = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
    }
    // this.canvas.addEventListener('mousedown', pick(event, this.context, doc));
    this.canvas.addEventListener("click", pick, false);
    // Return this object reference.
    return( this );
  }

  return (CanvasLayer);
});
