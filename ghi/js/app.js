function createCard(title, description, pictureUrl, start, end) {
	return `
    <div class="card mb-5 shadow">
      <img src="${pictureUrl}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${description}</p>
      </div>
      <div class="card-footer">
        <p>
          ${start} - ${end}
        </p>
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

					const { conference } = details;
					const { starts, ends } = conference;

					let start = new Date(starts).toLocaleDateString('en-US');
					let end = new Date(ends).toLocaleDateString('en-US');
					const { name, description, location } = conference;

					const pictureUrl = location.picture_url;
					const html = createCard(name, description, pictureUrl, start, end);
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
