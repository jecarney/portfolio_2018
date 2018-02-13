define(["helper/util"], function (util) {

  return {
    //function takes the xy position, and gets value for the given position, and the left and right pixels or top and bottom. Then uses the minimum of the three pixels to determine where the ball should roll. Returns a function so it can be used for both vx and vy
    getVDownslope: function (xMod,yMod,width, height, canvas){
      return function(x,y){
        var selection = canvas.context.getImageData(x + xMod, y + yMod, width, height);//gets 3 pixels... the target pixel and the two pixels to the left and right or above and below

        var data = Array.prototype.slice.call(selection.data);
        //console.log('data');
        //console.log(data);

        var reshapedData = [];
        while(data.length) reshapedData.push(data.splice(0,4));

        //get index of maximum value of first element of the three arrays
        var elevations = [reshapedData[0][0],reshapedData[1][0], reshapedData[2][0]];
        return (util.indexOfMinItem(elevations) - 1);
      }
    },

    getXYFromDirectionIndex: function (index){
      // pixel directions: [0:NW, 1:N, 2:NE, 3:W, 4:current pixel, 5:E, 6:SW, 7:S, 8:SE]
      //directions XY: {N: {dirX: 0, dirY: -1}, NE: {dirX: 1, dirY: -1}, E: {dirX: 1, dirY: 0}, SE: {dirX: 1, dirY: 1}, S: {dirX: 0, dirY: 1}, SW: {dirX: -1, dirY: 1},W: {dirX: -1, dirY: 0}, NW: {dirX: -1, dirY: -1}};
      const XYByPixelIndex = [{dirX: -1, dirY: -1},{dirX: 0, dirY: -1},{dirX: 1, dirY: -1},{dirX: -1, dirY: 0},{dirX: 0, dirY: 0},{dirX: 1, dirY: 0},{dirX: -1, dirY: 1},{dirX: 0, dirY: 1},{dirX: 1, dirY: 1}]

      return XYByPixelIndex[index];
    },
    //TODO: make comment
    getLightestDirection: function (x,y,initialDirectionIndex,canvas){
      const selection = canvas.context.getImageData(x - 1, y - 1, 3, 3);//gets 9 pixels surrounding target pixel
      const data = Array.prototype.slice.call(selection.data);
      let reshapedData = util.reshapeArray(data, 4);

      //get average of all RGB values
      let pixelRGBAverages = [];
      reshapedData.forEach(function(pixel) {
        pixel.pop();//removing the alpha value
        let avg = util.getArrayAverage(pixel);
        pixelRGBAverages.push(avg);
      });

      // pixel directions = [0:NW, 1:N, 2:NE, 3:W, 4:current pixel, 5:E, 6:SW, 7:S, 8:SE]

      let maxValue = 0;
      let maxIndices = [];
      for (let i = 0;i < pixelRGBAverages.length;i++) {
        if (pixelRGBAverages[i] > maxValue){
          maxValue = pixelRGBAverages[i];
          maxIndices = [i];//resetting array
        } else if (pixelRGBAverages[i] === maxValue) {
          maxIndices.push(i);
        }
      }

      //if all pixel values are the same value (0 or max), or if the max value is the same as the current xy point, particle can continue in the same direction
      if (maxIndices.length === 0|| maxIndices.length === pixelRGBAverages.length|| maxValue <= pixelRGBAverages[4]) {
        return initialDirectionIndex
      } else {
        return maxIndices[util.getRandomInt(0,maxIndices.length)];
      }
    }
  }
});
