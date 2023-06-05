import { FC, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';

interface IProps {
	locationCoordinates: any;
	sensorData: any;
}

const Map: FC<IProps> = (props) => {
	const { locationCoordinates, sensorData } = props;

	const [mapRef, setMapRef] = useState<any>();
	const [isOpen, setIsOpen] = useState(false);
	const [infoWindowData, setInfoWindowData] = useState<any>();

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || ''
	});

	const onLoad = (map: google.maps.Map) => {
		setMapRef(map);
		const bounds = new google.maps.LatLngBounds();
		locationCoordinates?.forEach(({ lat, lng }: { lat: number; lng: number }) => bounds.extend({ lat, lng }));
		map.fitBounds(bounds);
	};

	const handleMarkerClick = (id: number, lat: number, lng: number) => {
		mapRef?.panTo({ lat, lng });
		const tempData = sensorData[id];
		setInfoWindowData(tempData);
		setIsOpen(true);
	};

	return (
		<div className='pb--65 mt--50'>
			{!isLoaded ? (
				<h1>Loading...</h1>
			) : (
				<>
					<h1 className='m--10 p--10'>You can see your area's deatils in below map</h1>
					<GoogleMap mapContainerClassName='map-container' onLoad={onLoad} onClick={() => setIsOpen(false)}>
						{locationCoordinates.map(
							({ lat, lng }: { address: string; lat: number; lng: number }, index: number) => (
								<MarkerF
									key={index}
									position={{ lat, lng }}
									icon={'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}
									onClick={() => {
										handleMarkerClick(index, lat, lng);
									}}
								>
									{isOpen && infoWindowData?.id - 1 === index && (
										<InfoWindowF
											onCloseClick={() => {
												setIsOpen(false);
											}}
										>
											<div>
												<h3 className='text--black font-size--22 font--medium text--left'>
													Location :- {infoWindowData.location}
												</h3>
												<h3
													className={`text--black font-size--22 font--medium text--left ${
														infoWindowData.severity === 'Good'
															? 'good-color'
															: infoWindowData.severity === 'Moderate'
															? 'moderate-color'
															: 'unhealthy-color'
													}`}
												>
													Severity :- {infoWindowData.severity}
												</h3>
												<h3 className='text--black font-size--22 font--medium text--left'>
													Sensor :- {infoWindowData.sensor_type}
												</h3>
												<h3 className='text--black font-size--22 font--medium text--left'>
													PM25 :- {infoWindowData.pm25}
												</h3>
												<h3 className='text--black font-size--22 font--medium text--left'>
													CO :- {infoWindowData.co}
												</h3>
												<h3 className='text--black font-size--22 font--medium text--left'>
													Temperature :- {infoWindowData.temperature}
												</h3>
											</div>
										</InfoWindowF>
									)}
								</MarkerF>
							)
						)}
					</GoogleMap>
				</>
			)}
		</div>
	);
};

export default Map;
