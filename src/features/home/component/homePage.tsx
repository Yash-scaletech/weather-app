import { useState, useEffect } from 'react';

import '../style/homePage.scss';

const HomePage = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?key=Y2HHEQQ9TX662V4MMAGAL9E8J')
			.then((response) => response.json())
			.then((json) => setData(json))
			.catch((error) => console.error(error));
		console.log(data);
	}, []);

	return (
		<div>
			<div className='wrapper position--absolute'>data</div>
		</div>
	);
};

export default HomePage;
