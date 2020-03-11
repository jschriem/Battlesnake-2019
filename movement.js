/* handle movement */
const search = require('./search.js');

let movement = {

  slither: function(request) {
      return(search.searching(request));
  },
}
module.exports = movement;
