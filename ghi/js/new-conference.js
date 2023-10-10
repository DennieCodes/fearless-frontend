window.addEventListener('DOMContentLoaded', async () => {
	const url = 'http://localhost:8000/api/locations/';

	try {
		const response = await fetch(url);

		if (!response.ok) {
			// Handle or alert error
		} else {
			const data = await response.json();

			const control = document.querySelector('.form-select');
			for (let location of data.locations) {
				const option = document.createElement('option');
				option.value = location.id;
				option.text = location.name;
				control.add(option, null);
			}
		}
	} catch (e) {
		console.error(e);
	}

	const formTag = document.getElementById('create-conference-form');

	formTag.addEventListener('submit', async (event) => {
		event.preventDefault();
		const formData = new FormData(formTag);
		const json = JSON.stringify(Object.fromEntries(formData));

		const conferenceUrl = 'http://localhost:8000/api/conferences/';
		const fetchConfig = {
			method: 'post',
			body: json,
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const response = await fetch(conferenceUrl, fetchConfig);

		if (response.ok) {
			formTag.reset();
			const newConference = await response.json();
			console.log(newConference);
		}
	});
});
