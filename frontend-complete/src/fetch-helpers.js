export const getTopStories = async () => {
  try {
    const url = `/api/stories`;
    const response = await fetch(url);

    if (!response.ok) {
      throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    return { data, error: null }
  }
  catch (error) {
    console.log("Error caught! " + error.message);
    return { data: null, error: error };
  }
};

