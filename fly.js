/* Handle searching of food and snakes */
const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
const grid = require('./grid.js');
let fly = {

    flying: function(request) {
  
      var PF = require('pathfinding');
  
      var input = request.body;         //board details
      var height = input.board.height;  //board height
      var width = input.board.width;    //board width
      var body = input.you.body;        //snake body
      var head = input.you.body[0];     //snake head
      var health = input.you.health;    //snake health
      var food = input.board.food;      //food locations
  
      var grid = new PF.Grid(width, height); 
      var finder = new PF.AStarFinder(); 
      //var path = finder.findPath(head.x, head.y, food[0].x, food[0].y, grid);
    
      grid.initialize(request); //find where other snakes and food locations


    
    },
  }
  module.exports = fly;
  