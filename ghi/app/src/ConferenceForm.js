import React, { useState, useEffect } from 'react';

function ConferenceForm() {
	const [locations, setLocations] = useState('');
	const [name, setName] = useState('');
	const [starts, setStarts] = useState('');
	const [ends, setEnds] = useState('');
	const [description, setDescription] = useState('');
	const [max_presentations, setMax_presentations] = useState('');
	const [max_attendees, setMax_attendees] = useState('');
	const [location, setLocation] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {};
		data.name = name;
		data.starts = starts;
		data.ends = ends;
		data.description = description;
		data.max_presentations = max_presentations;
		data.max_attendees = max_attendees;
		data.location = location;

		const locationUrl = 'http://localhost:8000/api/conferences/';
		const fetchConfig = {
			method: 'post',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const response = await fetch(locationUrl, fetchConfig);

		if (response.ok) {
			const newConference = await response.json();
			console.log(newConference);

			setName('');
			setStarts('');
			setEnds('');
			setDescription('');
			setMax_presentations('');
			setMax_attendees('');
			setLocation('');
		}
	};

	const fetchData = async () => {
		const url = 'http://localhost:8000/api/locations/';

		try {
			const response = await fetch(url);

			if (response.ok) {
				const data = await response.json();

				setLocations(data.locations);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleStartsChange = (event) => {
		setStarts(event.target.value);
	};

	const handleEndsChange = (event) => {
		setEnds(event.target.value);
	};

	const handleDescriptionChange = (event) => {
		setDescription(event.target.value);
	};

	const handleMax_PresentationChange = (event) => {
		setMax_presentations(event.target.value);
	};

	const handleMax_AttendeesChange = (event) => {
		setMax_attendees(event.target.value);
	};

	const handleLocationChange = (event) => {
		setLocation(event.target.value);
	};

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create a new conference</h1>
					<form id="create-conference-form" onSubmit={handleSubmit}>
						<div className="form-floating mb-3">
							<input
								onChange={handleNameChange}
								value={name}
								placeholder="Name"
								required
								type="text"
								name="name"
								id="name"
								className="form-control"
							/>
							<label htmlFor="name">Name</label>
						</div>

						<div className="form-floating mb-3">
							<input
								value={starts}
								onChange={handleStartsChange}
								placeholder="Start date"
								required
								type="date"
								name="starts"
								id="starts"
								className="form-control"
							/>
							<label htmlFor="starts">Start date</label>
						</div>

						<div className="form-floating mb-3">
							<input
								onChange={handleEndsChange}
								value={ends}
								placeholder="End date"
								required
								type="date"
								name="ends"
								id="ends"
								className="form-control"
							/>
							<label htmlFor="ends">End date</label>
						</div>

						<div className="mb-3">
							<textarea
								value={description}
								onChange={handleDescriptionChange}
								className="form-control"
								id="description"
								rows="3"
								name="description"
							></textarea>
							<label className="form-label" htmlFor="description">
								Description
							</label>
						</div>

						<div className="form-floating mb-3">
							<input
								value={max_presentations}
								onChange={handleMax_PresentationChange}
								placeholder="Max number of presentations"
								required
								type="number"
								name="max_presentations"
								id="max_presentations"
								className="form-control"
							/>
							<label htmlFor="max_presentations">
								Maximum number of presentations
							</label>
						</div>

						<div className="form-floating mb-3">
							<input
								value={max_attendees}
								onChange={handleMax_AttendeesChange}
								placeholder="Max number of Attendees"
								required
								type="number"
								name="max_attendees"
								id="max_attendees"
								className="form-control"
							/>
							<label htmlFor="max_attendees">Maximum number of Attendees</label>
						</div>

						<div className="mb-3">
							<select
								value={location}
								onChange={handleLocationChange}
								required
								id="location"
								name="location"
								className="form-select"
							>
								<option value="">Choose a location</option>

								{locations &&
									locations.map((location) => {
										return (
											<option key={location.id} value={location.id}>
												{location.name}
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

export default ConferenceForm;
