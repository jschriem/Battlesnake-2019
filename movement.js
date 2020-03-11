/* handle movement */
const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
const search = require('./search.js');
const fly = require('./fly.js');

let movement = {

  slither: function(request) {
      return(search.searching(request));
  },
}
module.exports = movement;
