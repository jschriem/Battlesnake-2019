const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
var PF = require('pathfinding');


const app = express()
const {
  fallbackHandler,
  notFoundHandler,
  genericErrorHandler,
  poweredByHandler
} = require('./handlers.js')

// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', (process.env.PORT || 9001))

app.enable('verbose errors')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(poweredByHandler)

// --- SNAKE LOGIC GOES BELOW THIS LINE ---

// Handle POST request to '/start'
app.post('/start', (request, response) => {
  // NOTE: Do something here to start the game
  // Response data
  const data = {
    color: "#C70039",
    secondary_color: "#00FF00",
    name: "Smaug, the terrible",
    head_url: "https://pbs.twimg.com/profile_images/2931866544/127b863ca71b759a41cacd9715435a99.jpeg", // optional, but encouraged!
    taunt: "I am King Under the Mountain!", // optional, but encouraged!
    headType: "evil",
    tailType: "pixel"
  }

  return response.json(data)
})

// Handle POST request to '/move'
app.post('/move', (request, response) => {
      console.log("startin up");
      const input = request.body;         //board details
      console.log("startin up1");
      const height = input.board.height;  //board height
      console.log("startin up2");
      const width = input.board.width;
      console.log("startin up3");    //board width
      const body = input.you.body;
      console.log("startin up4");        //snake body
      const head = input.you.body.data;
      console.log("startin up5");     //snake head
      const health = input.you.health;
      console.log("startin up6");    //snake health
      const food = input.board.food;
      console.log("startin up7");      //food locations
      const finder = new PF.AStarFinder(); 
      console.log("lets go! + " +head)

      const grid = new PF.Grid(width, height); 
      for (let i = 1; i < body.data.length - 1; i++) {
        grid.setWalkableAt(body.data[i].x, body.data[i].y, false);
      }

      const data = {}
      console.log(head + head.x + grid)
      console.log("TEST")
      var path = finder.findPath(head.x, head.y, food[0].x, food[0].y, grid);
      console.log(path);

      if (path[1][0] === head.x && path[1][1] === head.y + 1) {
        data.move = 'down'
        return response.json(data)
      } else if (path[1][0] === head.x && path[1][1] === head.y - 1) {
        data.move = 'up';
        return response.json(data)
      } else if (path[1][0] === head.x + 1 && path[1][1] === head.y) {
        data.move = 'right';
        return response.json(data)
      } else if (path[1][0] === head.x - 1 && path[1][1] === head.y) {
        data.move = 'left';
        return response.json(data)
      } else {
        data.move = 'down';
        return response.json(data)
      }
})

app.post('/end', (request, response) => {
  // NOTE: Any cleanup when a game is complete.
  return response.json({})
})

app.post('/ping', (request, response) => {
  // Used for checking if this snake is still alive.
  return response.json({});
})

// --- SNAKE LOGIC GOES ABOVE THIS LINE ---

app.use('*', fallbackHandler)
app.use(notFoundHandler)
app.use(genericErrorHandler)

app.listen(app.get('port'), () => {
  console.log('Server listening on port %s', app.get('port'))
})
