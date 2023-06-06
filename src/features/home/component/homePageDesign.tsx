import { FC } from 'react';

import clear_day from '../../../assets/images/clear_day.png';
import rainy from '../../../assets/images/rainy.png';
import cloudy from '../../../assets/images/cloudy.png';
import partly_cloudy_day from '../../../assets/images/partly_cloudy_day.png';
import clear_night from '../../../assets/images/clear_night.png';

interface IProps {
	data: any;
}

const HomePageDesign: FC<IProps> = (props) => {
	const { data } = props;

	const imageMapper: any = {
		clear_day: clear_day,
		rainy: rainy,
		cloudy: cloudy,
		partly_cloudy_day: partly_cloudy_day,
		clear_night: clear_night
	};

	return (
		<div>
			currentConditions
			<h1>{data.resolvedAddress}</h1>
			<img src={imageMapper[data.currentConditions.icon.replace(/-/g, '_')]} alt='weather_img' width='315' height='286' />
		</div>
	);
};

export default HomePageDesign;
