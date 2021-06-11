import { useState, useEffect } from 'react';
import MeetupList from '../components/meetups/MeetupList';

function AllMeetupsPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [loadedMeetups, setLoadedMeetups] = useState([]);

	// Use effect prevents fetch from running in infinite loop against API.
	useEffect(() => {
		setIsLoading(true);
		fetch('https://react-course-7e046-default-rtdb.firebaseio.com/meetups.json')
			.then(response => {
				return response.json();
			})
			.then(data => {
				// Transform object returned by Firebase
				const meetups = [];

				for (const key in data) {
					const meetup = {
						id: key,
						...data[key],
					};
					meetups.push(meetup);
				}

				setIsLoading(false);
				setLoadedMeetups(meetups);
			});
	}, []); // Array should be populated with external dependencies if required.

	if (isLoading) {
		return (
			<section>
				<p>Loading...</p>
			</section>
		);
	}

	return (
		<section>
			<h1>All Meetups</h1>
			<ul>
				<MeetupList meetups={loadedMeetups} />
			</ul>
		</section>
	);
}

export default AllMeetupsPage;
