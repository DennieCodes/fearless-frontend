function createCard(title, description, pictureUrl) {
	return `
    <div class="card mb-5 shadow">
      <img src="${pictureUrl}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${description}</p>
      </div>
    </div>
  `;
}

window.addEventListener('DOMContentLoaded', async () => {
	const url = 'http://localhost:8000/api/conferences/';

	try {
		const response = await fetch(url);

		if (!response.ok) {
			console.dir(response);
		} else {
			const data = await response.json();

			let column_count = 0;

			for (let conference of data.conferences) {
				const detailUrl = `http://localhost:8000${conference.href}`;
				const detailResponse = await fetch(detailUrl);

				if (detailResponse.ok) {
					const details = await detailResponse.json();
					const title = details.conference.name;
					const description = details.conference.description;
					const pictureUrl = details.conference.location.picture_url;
					const html = createCard(title, description, pictureUrl);
					const columns = document.querySelectorAll('.col');

					column_count = column_count > 2 ? 0 : column_count;
					columns[column_count].innerHTML += html;
					column_count++;
				}
			}
		}
	} catch (e) {
		console.error(e);
	}
});
