import Nav from './Nav';
import LocationForm from './LocationForm';
import AttendeesList from './AttendeesList';

function App(props) {
	if (props.attendees === undefined) {
		return null;
	}
	return (
		<>
			<Nav />
			<div className="container">
				<LocationForm />
				{/* <AttendeesList attendees={props.attendees} /> */}
			</div>
		</>
	);
}

export default App;
