import { useEffect, useState } from 'react';

import FilterData from './filterData';
import Temperature from './temperatur';
import Map from './map';
import DropDownDetails from './dropdown';

import pollutionData from '../JSON/pollutionData.json';

import '../style/home.scss';
import { ISensorData } from '../interface/hoem';

const Home = () => {
	const [sensorData, setSensorData] = useState<ISensorData[]>([]);
	const [filterData, setfilterData] = useState<ISensorData[]>([]);
	const [locationCoordinates, setlocationCoordinates] = useState<any>([]);

	useEffect(() => {
		setSensorData(pollutionData.data.sensors);
		setfilterData(pollutionData.data.sensors);
		getLatitudeAndLongitude(pollutionData.data.sensors);
	}, []);

	const getLatitudeAndLongitude = (sensorData: any) => {
		const data = sensorData.map((sensor: any) => ({
			lat: sensor.latitude,
			lng: sensor.longitude
		}));
		setlocationCoordinates(data);
	};

	const setFilterData = (data: any) => {
		setfilterData(data);
	};

	return (
		<div className='text--center mt--50 font-size--40 font--bold'>
			Ahmedabad Air Pollution Tracker
			<Temperature sensorData={sensorData} />
			<DropDownDetails sensorData={sensorData} setFilterData={setFilterData} />
			<FilterData sensorData={filterData} />
			<Map locationCoordinates={locationCoordinates} sensorData={sensorData} />
		</div>
	);
};

export default Home;
