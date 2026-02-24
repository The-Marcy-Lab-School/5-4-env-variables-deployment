/////////////////////
// Imports
/////////////////////

const express = require('express');
const path = require('path');

/////////////////////
// Setup
/////////////////////

const pathToDistFolder = path.join(__dirname, '../frontend-complete');
const app = express();

/////////////////////
// Controllers
/////////////////////

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

const serveStatic = express.static(pathToDistFolder);

// First, we make a controller
const serveTopArtStories = async (req, res, next) => {
  try {
    const url = `https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=${process.env.API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const storiesWithTitle = data.results.filter(story => story.title);

    // send the fetched data to the client
    res.send(storiesWithTitle);
  } catch (error) {
    // or send an error. 503 means the service is unavailable
    res.status(503).send(error);
  }
}

////////////////////////
// Routes
////////////////////////

app.use(logRoutes);
app.use(serveStatic);

// GET /api/top-arts-stories
app.get('/api/stories', serveTopArtStories)

const port = 8080;
app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});