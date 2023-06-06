import { useState, useEffect } from 'react';

import { Formik, FormikValues } from 'formik';
import HomePageDesign from './homePageDesign';

import cross from '../../../assets/images/cross.png';

import '../style/homePage.scss';

const HomePageForm = () => {
	const [data, setData] = useState();
	const [city, setCity] = useState<string>('Delhi');
	const [errMsg, setErrMsg] = useState<boolean>(false);

	useEffect(() => {
		fetch(
			`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city || 'Delhi'}?key=${
				process.env.REACT_APP_API_KEY
			}`
		)
			.then((response) => response.json())
			.then((json) => {
				setErrMsg(false);
				setData(json);
			})
			.catch((error) => {
				setErrMsg(true);
				console.error(error);
			});
	}, [city]);

	return (
		<div className='wrapper m--0-auto'>
			<Formik
				initialValues={{
					cityName: ''
				}}
				onSubmit={(values: FormikValues) => {
					setCity(values.cityName);
				}}
			>
				{({ handleSubmit, setFieldValue, isValid }) => {
					return (
						<form className='width--full flex justify__content--center' onSubmit={handleSubmit}>
							<input
								className='mr--10 p--10 font-size--14px'
								type='text'
								id='cname'
								name='cityName'
								placeholder='Enter Cityname for more detail'
								onChange={({ target }) => {
									setFieldValue('cityName', target.value);
								}}
							/>
							{errMsg && (
								<div className='error position--absolute'>
									<span className='pointer cross-wrapper'>
										<img src={cross} alt='weather_img' width='50' height='50' onClick={() => setErrMsg(false)} />
									</span>
									<h1 className='font-size--30'>Please Enter Valid City Name</h1>
								</div>
							)}
							<button className='p--10 font-size--14px font-weight--700' type='submit' disabled={!isValid}>
								Search
							</button>
						</form>
					);
				}}
			</Formik>
			{data && <HomePageDesign data={data} />}
		</div>
	);
};

export default HomePageForm;
