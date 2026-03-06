export const renderStories = (stories) => {
  const storiesList = document.querySelector('#stories-list');
  stories.forEach((story) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = story.url;
    a.textContent = story.title;

    li.append(a);
    storiesList.append(li);
  });
};

export const renderError = (msg) => {
  const errorEl = document.querySelector('#error');

  if (!msg) {
    errorEl.classList.add('hidden');
    errorEl.textContent = '';
    return;
  }

  errorEl.classList.remove('hidden');
  errorEl.textContent = msg;
};
