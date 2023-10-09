function createCard(title, description, pictureUrl, start, end, subtitle) {
	return `
    <div class="card mb-5 shadow">
      <img src="${pictureUrl}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <h6 class="card-subtitle">${subtitle}</h6>
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

function createErrorAlert(responseError) {
	let message = responseError
		? 'The network returned an error'
		: 'There was a program error';
	const html = `
    <div class="alert alert-danger" role="alert">
      ${message}
    </div>
  `;

	const container = Document.querySelector('.container');
	container.innerHTML += html;
}

window.addEventListener('DOMContentLoaded', async () => {
	const url = 'http://localhost:8000/api/conferences/';

	try {
		const response = await fetch(url);

		if (!response.ok) {
			createErrorAlert(true);
		} else {
			const data = await response.json();

			let column_count = 0;

			for (let conference of data.conferences) {
				const detailUrl = `http://localhost:8000${conference.href}`;
				const detailResponse = await fetch(detailUrl);

				if (detailResponse.ok) {
					const details = await detailResponse.json();

					const { conference } = details;
					const { name, description, location, starts, ends } = conference;
					const { picture_url, name: subtitle } = location;

					let start = new Date(starts).toLocaleDateString('en-US');
					let end = new Date(ends).toLocaleDateString('en-US');

					const html = createCard(
						name,
						description,
						picture_url,
						start,
						end,
						subtitle,
					);
					const columns = document.querySelectorAll('.col');

					column_count = column_count > 2 ? 0 : column_count;
					columns[column_count].innerHTML += html;
					column_count++;
				}
			}
		}
	} catch (e) {
		createErrorAlert(false);
		console.error(e);
	}
});
