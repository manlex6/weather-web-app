const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', { title: 'Weather App', name: 'manlex6' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About App', name: 'manlex6' });
});

app.get('/help', (req, res) => {
  res.render('help', { title: 'Help App', name: 'manlex6' });
});

app.get('/weather', (req, res) => {
  const { address = '' } = req.query;

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      res.send({
        error,
      });
    } else {
      forecast(latitude, longitude, (error, weather) => {
        if (error) {
          res.send({
            error,
          });
        } else
          res.send({
            location,
            weather,
          });
      });
    }
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'manlex6',
    errorMessage: 'Help article no found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'manlex6',
    errorMessage: 'Page no found',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
