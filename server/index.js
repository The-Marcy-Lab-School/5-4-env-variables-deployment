//////////////////////////////////////////
// Imports
//////////////////////////////////////////

const express = require('express');
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.API_KEY);

//////////////////////////////////////////
// Constants
//////////////////////////////////////////

const app = express();
let pathToFrontend = path.join(__dirname, '../frontend');
if (process.env.NODE_ENV === 'production') {
  pathToFrontend = path.join(__dirname, '../frontend/dist');
}

/////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////

const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

const serveStatic = express.static(pathToFrontend);

app.use(logRoutes);
app.use(serveStatic);

/////////////////////////////////////////////
// Controllers
/////////////////////////////////////////////

// TODO: Add an endpoint for "GET /api/top-arts-stories" requests

const serveTopArtStories = async (req, res, next) => {
  try {
    const response = await fetch(
      `https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=${process.env.API_KEY}`,
    );
    if (!response.ok) {
      throw new Error('Fetch Failed');
    }
    let data = await response.json();
    data = data.results.filter((story) => story.title);
    res.send(data);
  } catch (error) {
    res.status(503).send(error);
  }
};

const serve404 = (req, res, next) => {
  res.status(404).send({ error: `Not found: ${req.originalUrl}` });
};

app.get('/api/stories', serveTopArtStories);
app.use(serve404); // captures ALL unhandled requests

//////////////////////////////////////////
// Listen
//////////////////////////////////////////

const port = 8080;
app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});
