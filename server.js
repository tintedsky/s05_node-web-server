const express = require('express');
const hbs = require('hbs');

var app = express();

app.set('view engine', 'hbs');
//express.static() take absolute path to the folder you want to server up.
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    pageBody: 'Hello World!'
  })
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
      pageTitle: 'About Page',
      currentYear: new Date().getFullYear()
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
