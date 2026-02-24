const API_KEY = "paste-your-api-key-here";

export const getTopStories = async () => {
  try {
    const url = `https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    // some stories don't have a title, let's filter those out
    const storiesWithTitles = data.results.filter(story => story.title)
    return { data: storiesWithTitles, error: null }
  }
  catch (error) {
    console.log("Error caught! " + error.message);
    return { data: null, error: error };
  }
};

