import { FC, useEffect, useState } from 'react';
import { ISensorData } from '../interface/hoem';

interface IProps {
	sensorData: ISensorData[];
}

const Temperature: FC<IProps> = (props) => {
	const { sensorData } = props;

	const [hightTempData, setHightTempData] = useState<any>([]);
	const [unhealthyData, setUnhealthyData] = useState<any>([]);

	useEffect(() => {
		getTopThreeLocationsWithHighestTemperature();
		getUnhealthyLocations();
	}, [sensorData]);

	const getTopThreeLocationsWithHighestTemperature = () => {
		const sortedSensors = [...sensorData].sort((a, b) => b.temperature - a.temperature);
		const topThreeSensors = sortedSensors.slice(0, 3);
		setHightTempData(topThreeSensors);
	};

	const getUnhealthyLocations = () => {
		const UnhealthyData = sensorData.filter((sensor: any) => sensor.severity === 'Unhealthy');
		setUnhealthyData(UnhealthyData);
	};

	return (
		<div className='temp-container flex width--full mt--50'>
			<div className='temperature-box-wrapper width--50 m--20 p--20'>
				<div className='temperature-box flex flex--column'>
					<span className='font-size--22 mb--10 text--white'>Highest Temperature</span>
					{hightTempData.map((data: any) => (
						<div
							className='flex justify-content--around border-radius--xxl font-size--md p--10'
							key={data.id}
						>
							<p>{data.location}:</p>
							<p>{data.temperature}</p>
						</div>
					))}
				</div>
			</div>
			<div className='severity-box-wrapper width--50 m--20 p--20'>
				<div className='severity-box flex flex--column'>
					<span className='font-size--22 mb--10 text--white'>Severity</span>
					{unhealthyData.map((data: any) => (
						<div
							className='flex justify-content--around border-radius--xxl font-size--md p--10'
							key={data.id}
						>
							<p>{data.location}:</p>
							<p>{data.severity}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Temperature;
