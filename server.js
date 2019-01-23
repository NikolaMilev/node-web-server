const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');
const process = require('process');

const port = process.env.PORT || 3000;


var app = express();
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log+'\n', (err)=>{
    if(err){
      console.log('Unable to append file.');
    }
    next();
  });
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {pageTitle:'Site is under maintenance'});
// });

app.use(express.static(path.join(__dirname, 'public')));


hbs.registerHelper('getCurrentYear', ()=>new Date().getFullYear());

hbs.registerHelper('screamIt', text=>text.toUpperCase());

app.get('/', (req, res)=>{
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome, my niggaz!',
  });
});

app.get('/about', (req, res)=>{
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res)=>{
  res.send({
    errorMessage:'Unable to fullfill this request error bre'
  });
});

app.get('/projects', (req, res)=>{
  res.render('projects.hbs', {
    pageTitle: 'Projects',
    message: 'Portfolio page here',
  });
});

app.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
