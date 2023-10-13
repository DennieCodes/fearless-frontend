import React, { useState, useEffect } from 'react';

function PresentationForm() {
	const [conferences, setConferences] = useState('');
	const [presenterName, setPresenterName] = useState('');
	const [presenterEmail, setPresenterEmail] = useState('');
	const [companyName, setCompanyName] = useState('');
	const [title, setTitle] = useState('');
	const [synopsis, setSynopsis] = useState('');
	const [conference, setConference] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = {};
		data.conference = conference;
		data.presenter_name = presenterName;
		data.presenter_email = presenterEmail;
		data.company_name = companyName;
		data.title = title;
		data.synopsis = synopsis;
		data.conference = conference;

		console.log('Conference: ', conference);

		const presentationUrl = `http://localhost:8000${conference}presentations/`;
		const fetchOptions = {
			method: 'post',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const presentationResponse = await fetch(presentationUrl, fetchOptions);

		if (presentationResponse.ok) {
			// console.log(presentationResponse);
			setConferences('');
			setPresenterName('');
			setPresenterEmail('');
			setCompanyName('');
			setTitle('');
			setSynopsis('');
			setConference('');
		}
	};

	const fetchData = async () => {
		const url = 'http://localhost:8000/api/conferences/';

		try {
			const response = await fetch(url);

			if (response.ok) {
				const data = await response.json();

				setConferences(data.conferences);
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleNameChange = (event) => {
		setPresenterName(event.target.value);
	};

	const handleEmailChange = (event) => {
		setPresenterEmail(event.target.value);
	};

	const handleCompanyNameChange = (event) => {
		setCompanyName(event.target.value);
	};

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	};

	const handleSynopsisChange = (event) => {
		setSynopsis(event.target.value);
	};

	const handleConferenceChange = (event) => {
		setConference(event.target.value);
	};

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create a new presentation</h1>
					<form id="create-presentation-form" onSubmit={handleSubmit}>
						<div className="form-floating mb-3">
							<input
								value={presenterName}
								onChange={handleNameChange}
								placeholder="Presenter name"
								required
								type="text"
								name="presenter_name"
								id="presenter_name"
								className="form-control"
							/>
							<label htmlFor="presenter_name">Presenter name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								value={presenterEmail}
								onChange={handleEmailChange}
								placeholder="Presenter email"
								required
								type="email"
								name="presenter_email"
								id="presenter_email"
								className="form-control"
							/>
							<label htmlFor="presenter_email">Presenter email</label>
						</div>
						<div className="form-floating mb-3">
							<input
								value={companyName}
								onChange={handleCompanyNameChange}
								placeholder="Company name"
								type="text"
								name="company_name"
								id="company_name"
								className="form-control"
							/>
							<label htmlFor="company_name">Company name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								value={title}
								onChange={handleTitleChange}
								placeholder="Title"
								required
								type="text"
								name="title"
								id="title"
								className="form-control"
							/>
							<label htmlFor="title">Title</label>
						</div>
						<div className="mb-3">
							<label htmlFor="synopsis">Synopsis</label>
							<textarea
								value={synopsis}
								onChange={handleSynopsisChange}
								className="form-control"
								id="synopsis"
								rows="3"
								name="synopsis"
							></textarea>
						</div>
						<div className="mb-3">
							<select
								value={conference}
								onChange={handleConferenceChange}
								required
								name="conference"
								id="conference"
								className="form-select"
							>
								<option value="">Choose a conference</option>
								{conferences &&
									conferences.map((conference) => {
										return (
											<option key={conference.href} value={conference.href}>
												{conference.name}
											</option>
										);
									})}
							</select>
						</div>
						<button className="btn btn-primary">Create</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default PresentationForm;
