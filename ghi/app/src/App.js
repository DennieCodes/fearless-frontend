import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import ConferenceForm from './ConferenceForm';
import LocationForm from './LocationForm';
import AttendeesList from './AttendeesList';
import AttendConferenceForm from './AttendConferenceForm';

function App(props) {
	if (props.attendees === undefined) {
		return null;
	}
	return (
		<>
			<Nav />
			<div className="container">
				<BrowserRouter>
					<Routes>
						<Route exact path="/conferences/new" element={<ConferenceForm />} />

						<Route
							exact
							path="/attendees/new"
							element={<AttendConferenceForm />}
						/>

						<Route exact path="/locations/new" element={<LocationForm />} />

						<Route
							exact
							path="/attendees"
							element={<AttendeesList attendees={props.attendees} />}
						/>
					</Routes>
				</BrowserRouter>
			</div>
		</>
	);
}

export default App;
