const express = require('express');
const path = require('path');
const app = express();

const logger = require('./middleware/logger');

//Import Routers
const userRouter = require('./routes/user.routes.js');
const productRouter = require ('./routes/product.routes.js');
// const port = 3000

//The following code defines a route handler in an Express.js application
//app.ge('/) specifies that the application should handle GET requests sent to the root URL(/) of the server.
//(req, res) => { ... }: This is a callback function (often called a route handler or middleware function)
//that is executed when a matching request is received.
//req (request) is an object representing the HTTP request from the client.
//res (response) is na object representing the HTTP response that the server will send back to the client.
//res.send('Hello World!'): This method on the response object sends the string "Hello World!" as the response body
//to the client and ends the request-response-cycle. Express automatically sets the appropriate Content-Type and 
//Content-Length headers.
/* app.get('/', (req, res) => {
  res.send('Hello World!')
}) */


//The app.listen() method binds the application to a specific network port on the
//host machine and makes the server listen for incoming connections. The provided callback
//function then logs a confirmation message to the console once the server has successfully started.
/* app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) */


/* app.get('/user/:id', (req, res, next) => {
  if (req.params.id === '0') {
    return next('route')
  }
  res.send(`User ${req.params.id}`)
})

app.get('/user/:id', (req, res) => {
  res.send('Special handler for user ID 0')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) */




/* myLogger = function(req, res, next){
                  console.log('LOGGED');
                  next();
}

app.use(myLogger);

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) */



/* requestTime = function(req, res, next){
  req.requestTime = Date.now();
  next();
}

app.use(requestTime);

app.get('/', (req, res) => {
  let responseText = 'Hello World!<br>'
  responseText += `<small>Requested at: ${req.requestTime}</small>`
  res.send(responseText)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) */


/* app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('check check check')
})

 */

// ... inside app.js configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// 1. GLOBAL MIDDLEWARE: Runs for every single request
app.use(express.json()); 
// ADD THIS for HTML Forms!
app.use(express.urlencoded({ extended: true })); 
app.use(logger);

// ROUTES (Mounting the mini-apps)
app.use('/api/v1/users', userRouter);
// 2. SELECTIVE MIDDLEWARE: Only protect product routes
// Users can see the homepage, but only "authorized" users can touch products
app.use('/api/v1/products', productRouter);


// Fallback for undefined routes
app.use((req, res) => {
    res.status(404).json({ message: `Can't find ${req.originalUrl} on this server!` });
});

module.exports = app;

