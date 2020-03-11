/* handle movement */
const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
const search = require('./search.js');
const fly = require('./fly.js');

let movement = {

  slither: function(request) {
    
      var input = request.body;         //board details
      var health = input.you.health;    //snake health
      const foodSearch = 100;            //health for food search

        while(health > foodSearch){
          return fly.flying(request)
        }
        return(search.searching(request));
  },
}
module.exports = movement;
