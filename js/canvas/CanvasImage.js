define([], function () {

  function getCanvasImageDim(layer) {
    let width = layer.canvas.width;
    let height = layer.canvas.height;
    return width < height ? width: height;
  }

  //TODO: separate constructor from the rest for all classes?
  const CanvasImage = function (layer, imageSource){
    const self = this;
    this.image = new Image();
    this.image.src = imageSource;
    // this.initialImageLoadComplete = false;
    this.image.onload = function() {
      self.setImage();
    };
    this.layer = layer;
    // this.image.onload = function() {
    //   this.setImage(layer, 'img/reset.png');
    // };
    this.canvasImageDim = getCanvasImageDim(layer);
    this.updateImageSrc = function (newImageSource){
      this.image.src = newImageSource;
    };
    this.imageXMin = 0;
    this.imageXMax = 0;
    this.imageYMin = 0;
    this.imageYMax = 0;
    this.updateImageXYMinMax = function (){
      let canvas = this.layer.canvas;
      this.imageXMin = canvas.width/2 - this.canvasImageDim/2;
      this.imageXMax = canvas.width/2 + this.canvasImageDim/2;
      this.imageYMin = canvas.height/2 - this.canvasImageDim/2;
      this.imageYMax = canvas.height/2 + this.canvasImageDim/2;
    };
    this.setImage = function () {
      let canvas = this.layer.canvas;
      this.canvasImageDim = getCanvasImageDim(layer);
      this.updateImageXYMinMax();
      layer.context.drawImage(this.image, this.imageXMin, this.imageYMin, this.canvasImageDim, this.canvasImageDim);
      // if (!this.initialImageLoadComplete) {
      //   this.initialImageLoadComplete = true;
      // }
    };
    /* given set of images fades in and out */

    let timeout = 10000;
    let imgIndex = 0;
    let imgOn = true;
    function loopImages (){
      if (imgOn){
        self.updateImageSrc('img/' + self.imgFiles[imgIndex]);
        self.setImage();
        timeout = 10000;
        imgIndex = imgIndex < self.imgFiles.length - 1 ? imgIndex + 1 : 0;
      } else {
        self.updateImageSrc('img/reset.png');//reset canvas image
        self.setImage();
        timeout = 2000;
      }
      imgOn = !imgOn;
      setTimeout(loopImages, timeout);
    }

    this.imgFiles = [];
    this.startImageLoop = function (imgFiles){
      this.imgFiles = imgFiles;
      loopImages();
    }

    // Return this object reference.
    return( this );
  }
  return (CanvasImage);
});
