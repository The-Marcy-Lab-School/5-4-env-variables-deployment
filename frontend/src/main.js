import { getTopStories } from './fetch-helpers.js';
import { renderStories, renderError } from './dom-helpers.js';

const main = async () => {
  const { data, error } = await getTopStories();
  if (error) {
    renderError(error.message);
    return;
  }

  renderError();
  renderStories(data);
};

main();
