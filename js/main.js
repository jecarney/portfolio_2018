
//TODO:
//add catch for if require library can't load, present altimage gear otherwise
//add error throws and catches and test them
//keep optimizing canvas animation
//https://www.html5rocks.com/en/tutorials/canvas/performance/#toc-raf try to improve performance if possible
//questions for code review: how do I add in more catches and proper error handling


/*imports*/
requirejs(["canvas/CanvasLayer","canvas/Particle","canvas/geometryUtil", "canvas/CanvasImage","helper/util", "vendor/domReady!"], function(CanvasLayer, Particle, geometryUtil, CanvasImage, util, doc) {

  /*UI*/

  /*nav*/
  function closeNav(event) {
    doc.getElementById("navMenu").classList.remove("nav__menu--show");
    doc.getElementById("hamburger").classList.remove("hidden");
  }

  const links = doc.getElementsByClassName("title__h2--nav");
  for (let i = 0; i < links.length; i++) {
    links[i].onclick = closeNav;
  }

  doc.getElementById("navMenuClose").onclick = closeNav;

  doc.getElementById("hamburger").onclick = function(){
    doc.getElementById("navMenu").classList.add("nav__menu--show");
    this.classList.add("hidden");
  };

  /*CANVAS*/

  const headerLayer = new CanvasLayer(doc, 'main-layer');

  //we check if we've succeeded in creating a canvas, otherwise if it's unsupported, we want to display an alternative option
  if (headerLayer.canvas.getContext) {
    headerLayer.fitToContainer();

    const dataLayer = new CanvasLayer(doc, 'data-layer');
    dataLayer.fitToContainer();

    const particleImage = new CanvasImage(dataLayer, 'img/reset.png');

    /* set of images fade in and out */
    //TODO: catch for missing image files
    const imgFiles =['desktop.png','backend.png','database.png'];

    particleImage.startImageLoop(imgFiles);

    /* particles */
    let points = [];
    const numParticles = 300;
    let posX, posY, initialDirectionIndex;

    // pixel directions = [0:NW, 1:N, 2:NE, 3:W, 4:current pixel, 5:E, 6:SW, 7:S, 8:SE]

    function initPoints (imageSize){
      for (i = 0  ; i < numParticles; i++){
        let colour = "#FFFFFF";
        const directions = [0, 1, 2, 3, 5, 6, 7, 8];
        //  getRandomInt
        posX = util.getRandomInt(particleImage.imageXMin + 40,particleImage.imageXMax -40);
        posY = util.getRandomInt(particleImage.imageYMin + 40,particleImage.imageYMax - 40);

        initialDirectionIndex = directions[util.getRandomInt(0,directions.length)];

        let size = imageSize > 450 ? 6 : 3;

        points[i] = new Particle(headerLayer.canvas, headerLayer.context, colour,posX,posY, size);

        //adding this property, don't want to add it to particle module unless reusable
        points[i]["initialDirectionIndex"] = initialDirectionIndex;
      }
    }

    initPoints();

    /* resize the canvases and canvas image after window resize */
    window.addEventListener("resize", function(){
      dataLayer.fitToContainer();
      headerLayer.fitToContainer();
      particleImage.setImage();
      let imageSize = particleImage.canvasImageDim;
      initPoints();
    });

    let alpha = 1;

    //https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    (function() {
      window.requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(f){window.setTimeout(f,1e3/60)}}();

      // if (particleImage.initialImageLoadComplete){

      (function renderFrame() {

        requestAnimationFrame(renderFrame);

        points.forEach(function(point){
          let directionIndex = geometryUtil.getLightestDirection(point.x,point.y, point.initialDirectionIndex,dataLayer);
          let xy = geometryUtil.getXYFromDirectionIndex(directionIndex);

          point.x += xy.dirX*2;
          point.y += xy.dirY*2;

          point.draw(headerLayer.context);
          point.initialDirectionIndex = directionIndex;//setting initial index to current direction for next refresh
        });

        if(alpha > 0.1){
          alpha -= 0.01;
        }
        let alphaRounded = alpha.toFixed(1).toString();
        let rgba = "rgba(0, 0, 0, " + alphaRounded + ")";

        headerLayer.context.fillStyle = rgba;
        // console.log(headerLayer.context.fillStyle);
        headerLayer.context.fillRect(0, 0, headerLayer.canvas.width, headerLayer.canvas.height);
      }());
      // }
    }());
  }else{
    console.log('View this page in a modern browser to see a nifty canvas animation!');
    document.getElementById("canvas_alt").classList.remove("hidden");
  }

});
