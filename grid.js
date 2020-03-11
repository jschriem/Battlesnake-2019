/*Generate the initial grid, and update as game progresses*/
let grid = {

    initialize: function(request) {
  
      var PF = require('pathfinding');
  
      var input = request.body;         //board details
      var height = input.board.height;  //board height
      var width = input.board.width;    //board width
      var body = input.you.body;        //snake body
      var head = input.you.body.data[0];     //snake head
      var health = input.you.health;    //snake health
      var food = input.board.food;      //food locations
  
      const grid = new PF.Grid(width, height); 
    
      for (let i = 1; i < body.data.length - 1; i++) {
        grid.setWalkableAt(body.data[i].x, body.data[i].y, false);
      }

      return grid;
    },
  }
  module.exports = grid;
