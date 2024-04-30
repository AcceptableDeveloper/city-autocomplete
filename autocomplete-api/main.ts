import express = require('express');
import cors = require('cors');

import * as fs from 'fs';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send(req);
  res.send(getCityData(req.query.city as string));
});

function getCities(city?: string) {}
