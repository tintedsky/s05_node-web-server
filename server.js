const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
});


app.set('view engine', 'hbs');
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
