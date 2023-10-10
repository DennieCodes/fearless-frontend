window.addEventListener('DOMContentLoaded', async () => {
	// Fetch State data for select input
	const url = 'http://localhost:8000/api/states/';
	try {
		const response = await fetch(url);

		if (!response.ok) {
			// Handle error
		} else {
			const data = await response.json();

			const control = document.querySelector('.form-select');
			for (let state of data.states) {
				const option = document.createElement('option');
				option.value = state.abbreviation;
				option.text = state.name;
				control.add(option, null);
			}
		}
	} catch (e) {
		console.error(e);
	}

	const formTag = document.getElementById('create-location-form');

	formTag.addEventListener('submit', async (event) => {
		event.preventDefault();
		const formData = new FormData(formTag);
		const json = JSON.stringify(Object.fromEntries(formData));

		const locationUrl = 'http://localhost:8000/api/locations/';
		const fetchConfig = {
			method: 'post',
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
});
