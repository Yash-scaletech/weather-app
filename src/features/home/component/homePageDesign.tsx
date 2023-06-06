import { FC, useEffect, useState } from 'react';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

import clear_day from '../../../assets/images/clear_day.png';
import rainy from '../../../assets/images/rainy.png';
import cloudy from '../../../assets/images/cloudy.png';
import partly_cloudy_day from '../../../assets/images/partly_cloudy_day.png';
import clear_night from '../../../assets/images/clear_night.png';
import partly_cloudy_night from '../../../assets/images/partly_cloudy_night.png';

interface IProps {
	data: any;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HomePageDesign: FC<IProps> = (props) => {
	const { data } = props;

	const [hourlyTemp, setHourlyTemp] = useState<any>([]);

	useEffect(() => {
		const updatedHourlyTemp = data.days[0].hours.map((data: any) => {
			return Math.round(((data.temp - 32) * 5) / 9);
		});
		setHourlyTemp(updatedHourlyTemp);
	}, [data]);

	const imageMapper: any = {
		clear_day: clear_day,
		rainy: rainy,
		cloudy: cloudy,
		partly_cloudy_day: partly_cloudy_day,
		clear_night: clear_night,
		partly_cloudy_night: partly_cloudy_night
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
				fontColor: 'blue'
			},
			title: {
				display: true,
				text: `Today's Temperature`,
				color: 'white'
			}
		},
		scales: {
			x: {
				ticks: {
					color: 'white'
				}
			},
			y: {
				ticks: {
					color: 'white'
				}
			}
		}
	};

	const labels = [
		'12 AM',
		'1 AM',
		'2 AM',
		'3 AM',
		'4 AM',
		'5 AM',
		'6 AM',
		'7 AM',
		'8 AM',
		'9 AM',
		'10 AM',
		'11 AM',
		'12 PM',
		'1 PM',
		'2 PM',
		'3 PM',
		'4 PM',
		'5 PM',
		'6 PM',
		'7 PM',
		'8 PM',
		'9 PM',
		'10 PM',
		'11 PM'
	];

	const tempChartData = {
		labels,
		datasets: [
			{
				label: 'Temperature (°C)',
				data: hourlyTemp,
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)'
			}
		]
	};

	return (
		<div className='text--white'>
			<h1>{data.resolvedAddress}</h1>
			<div className='flex justify__content--around'>
				<div className='text--left'>
					<p className='font-size--42'>{Math.round(((data.currentConditions.temp - 32) * 5) / 9)}°C</p>
					<p className='font-size--20'>Feels Like: {Math.round(((data.currentConditions.feelslike - 32) * 5) / 9)}°C</p>
					<p className='font-size--20'>Sunrise: {data.currentConditions.sunrise}</p>
					<p className='font-size--20'>Sunset: {data.currentConditions.sunset}</p>
				</div>
				<div>
					<img src={imageMapper[data.currentConditions.icon.replace(/-/g, '_')]} alt='weather_img' width='315' height='286' />
					<p className='font-size--24'>{data.currentConditions.conditions}</p>
				</div>
				<div className='text--left'>
					<p className='font-size--20'>Cloud Cover: {data.currentConditions.cloudcover}</p>
					<p className='font-size--20'>Humidity: {data.currentConditions.humidity}%</p>
					<p className='font-size--20'>Windspeed: {data.currentConditions.windspeed}</p>
					<p className='font-size--20'>Visibility: {data.currentConditions.visibility}</p>
					<p className='font-size--20'>Pressure: {data.currentConditions.pressure} mb</p>
					<p className='font-size--20'>Snow: {data.currentConditions.snow}</p>
					<p className='font-size--20'>Snow Depth: {data.currentConditions.snowdepth}</p>
				</div>
			</div>
			<div className='chart-wrapper'>
				<Line options={options} data={tempChartData} />
			</div>
			<div>
				<div></div>
			</div>
		</div>
	);
};

export default HomePageDesign;
