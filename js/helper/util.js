define([], function () {

  return {
    // returns index of minimum value in array
    indexOfMinItem: function (arr) {
      if (arr.length === 0) {
        return -1;
      }
      let min = arr[0];
      let minIndex = -1;
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
          minIndex = i;
          min = arr[i];
        }
      }
      return minIndex;
    },
    // returns index of maximum value in array
    indexOfMaxItem: function (arr) {
      if (arr.length === 0) {
        return -1;
      }
      let max = arr[0];
      let maxIndex = -1;
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
        }
      }
      return maxIndex;
    },
    // returns minimum value in array
    valueOfMinItem: function (arr) {
      if (arr.length === 0) {
        return -1;
      }
      let min = arr[0];
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
          min = arr[i];
        }
      }
      return min;
    },
    // returns maximum value in array
    valueOfMaxItem: function (arr) {
      if (arr.length === 0) {
        return -1;
      }
      let max = arr[0];
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
          max = arr[i];
        }
      }
      return max;
    },
    getRandomInt: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    },
    getRandomBoolean: function (){
      return Boolean(Math.floor(Math.random() * 2));
    },
    getRandomPosOrNegOne: function(){
      return this.getRandomBoolean() ? -1 : 1;
    },
    getArrayAverage: function(array){
        const sum = array.reduce(function(a, b) { return a + b; });
        return sum / array.length;
    },
    reshapeArray: function(array, rowLength) {
      let reshapedArray = [];
      while(array.length) reshapedArray.push(array.splice(0,rowLength));
      return reshapedArray;
    },
    // objGetKeyByValue: function(object, value) {
    //   return Object.keys(object).find(key => object[key] === value);
    // }
  }
});
