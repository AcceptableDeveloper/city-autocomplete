import express = require('express');
import cors = require('cors');
import path = require('path');

import * as fs from 'fs';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());

app.get('/all-cities', (req, res) => {
  fs.readFile(path.join(__dirname, 'world-cities.txt'), 'utf8', (err, data) => {
    if (err) {
      console.log('Error reading file:', err);
      res.status(500).send('Error reading file.');
      return;
    }
    const cities = data
      .split('\n')
      .map((city) => city.trim())
      .map((city) => ({ name: city }));

    res.json(cities);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
