import express = require('express');
import cors = require('cors');
import path = require('path');

import * as fs from 'fs';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, 'world-cities.txt'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file.');
      return;
    }
    const cities = data.split('\n').map((city) => ({ name: city.trim() }));
    console.log(cities); // Debug: Log the cities array to see if it's correct
    res.json(cities);
  });
});
