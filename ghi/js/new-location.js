window.addEventListener('DOMContentLoaded', async () => {
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
});
