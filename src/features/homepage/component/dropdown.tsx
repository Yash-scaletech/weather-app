import React, { FC } from 'react';
import isEmpty from 'lodash/isEmpty';
import { ISensorData } from '../interface/hoem';

interface IProps {
	setFilterData: (data: any) => void;
	sensorData: ISensorData[];
}

const DropDownDetails: FC<IProps> = (props) => {
	const { setFilterData, sensorData } = props;

	const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	const handleOnChange = (id: string) => {
		if (!isEmpty(id)) {
			const selectedSensor = sensorData.find((sensor: any) => sensor.id === Number(id));
			setFilterData(selectedSensor);
		} else {
			setFilterData(sensorData);
		}
	};

	return (
		<form onSubmit={handleOnSubmit} className='Details__Form flex justify-content--center mt--20'>
			<h2 className='p--10'>Please choose your area here:- </h2>{' '}
			<select onChange={(e) => handleOnChange(e.target.value)} className='drop-down-box'>
				<option value=''>Select All Area</option>
				{!isEmpty(sensorData) &&
					sensorData.map((sensorData: any, index: number) => (
						<option key={index} value={sensorData.id}>
							{sensorData.sensor_name}
						</option>
					))}
			</select>
		</form>
	);
};

export default DropDownDetails;
