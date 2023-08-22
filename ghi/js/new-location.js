window.addEventListener('DOMContentLoaded', async () => {

  const url = 'http://localhost:8000/api/states/';

  const response = await fetch(url);

  const formTag = document.getElementById('create-location-form');
  formTag.addEventListener('submit', async event => {
    event.preventDefault();
    const formData = new FormData(formTag);
    const json = JSON.stringify(Object.fromEntries(formData));
    const locationUrl = 'http://localhost:8000/api/locations/';
    const fetchConfig = {
      method: "post",
      body: json,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      formTag.reset();
      const newLocation = await response.json();
      console.log(newLocation);
    }
  });

  if (response.ok) {
    const data = await response.json();
    const selectTag = document.getElementById('state');
    for (let state of data.states) {
      // Create an 'option' element
      const option = document.createElement('option');

      // Set the '.value' property of the option element to the
      // state's abbreviation
      option.value = state.abbreviation;

      // Set the '.innerHTML' property of the option element to
      // the state's name
      option.innerHTML = state.name;

      // Append the option element as a child of the select tag
      selectTag.append(option);
    }
  }
});
