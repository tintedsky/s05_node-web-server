const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});


app.set('view engine', 'hbs');

//If we do something asynchronous, the middleware is not going to move on. Only when we call next, The application will continue to run.
app.use((req, res, next) => {  // next() tell express when the middleware function is done.
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

/*Comment the following function call out when maintenance is done.*/
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

//app.use() register how you register a middleware and it takes a function as an argument.
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    pageBody: 'Hello World!',
  })
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
      pageTitle: 'About Page',
      pageBody: 'About pageBody',
    })
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request.'
  });
});

app.listen(3000, ()=>{
  console.log('Server is up on port 3000.')
});   //3000 is the port number in local machine.
