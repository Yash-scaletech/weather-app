import { FC } from 'react';

interface IProps {
	sensorData: any;
}

const FilterData: FC<IProps> = (props) => {
	const { sensorData } = props;

	return (
		<>
			<div className='list-wrapper'>
				{sensorData.length > 1 ? (
					<>
						{sensorData.map((data: any) => (
							<div
								className={`flex flex--wrap m--20 list-item ${
									data.severity === 'Good'
										? 'good'
										: data.severity === 'Moderate'
										? 'moderate'
										: 'unhealthy'
								}`}
								key={data.id}
							>
								<div className='location flex justify-content--center width--33'>
									<p className='display-flex-center font-size--28 font--bold p--20'>
										{data.location}
									</p>
								</div>
								<div className='co-data flex justify-content--center width--33'>
									<div className='co font-size--22 m--10 mr--40 p--20'>
										PM2.5
										<p>{data.pm25}</p>
									</div>
									<div className='co font-size--22 m--10 mr--40 p--20'>
										CO
										<p>{data.co}</p>
									</div>
								</div>
								<div className='severity-wrapper flex justify-content--center width--33'>
									<div className='severity font-size--22 m--10 mr--40 p--20'>
										Temperature
										<p>{data.temperature}</p>
									</div>
									<div className='severity font-size--22 m--10 mr--40 p--20'>
										Severity
										<p>{data.severity}</p>
									</div>
								</div>
								<div className='flex'>
									<div className='sensor font-size--22 m--10 mr--40 p--20'>
										<span>{data.sensor_type}</span> - <span>{data.description}</span>
									</div>
								</div>
							</div>
						))}
					</>
				) : (
					<div
						className={`flex flex--wrap m--20 list-item ${
							sensorData.severity === 'Good'
								? 'good'
								: sensorData.severity === 'Moderate'
								? 'moderate'
								: 'unhealthy'
						}`}
						key={sensorData.id}
					>
						<div className='location flex justify-content--center width--33'>
							<p className='display-flex-center font-size--28 font--bold p--20'>{sensorData.location}</p>
						</div>
						<div className='co-data flex justify-content--center width--33'>
							<div className='co font-size--22 m--10 mr--40 p--20'>
								PM2.5
								<p>{sensorData.pm25}</p>
							</div>
							<div className='co font-size--22 m--10 mr--40 p--20'>
								CO
								<p>{sensorData.co}</p>
							</div>
						</div>
						<div className='severity-wrapper flex justify-content--center width--33'>
							<div className='severity font-size--22 m--10 mr--40 p--20'>
								Temperature
								<p>{sensorData.temperature}</p>
							</div>
							<div className='severity font-size--22 m--10 mr--40 p--20'>
								Severity
								<p>{sensorData.severity}</p>
							</div>
						</div>
						<div className='flex'>
							<div className='sensor font-size--22 m--10 mr--40 p--20'>
								<span>{sensorData.sensor_type}</span> - <span>{sensorData.description}</span>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default FilterData;
