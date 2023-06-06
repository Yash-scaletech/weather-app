import { useState, useEffect } from 'react';

import { Formik, FormikValues } from 'formik';

import '../style/homePage.scss';

const HomePage = () => {
	const [data, setData] = useState<any>(null);
	const [city, setCity] = useState<string>('');

	useEffect(() => {
		fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=Y2HHEQQ9TX662V4MMAGAL9E8J`)
			.then((response) => response.json())
			.then((json) => {
				setData(json);
			})
			.catch((error) => console.error(error));
	}, [city]);

	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		<div>
			<div className='wrapper position--absolute'>
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
							<form className='flex width:full justify-content:center mt:25' onSubmit={handleSubmit}>
								<div className='width:full'>
									<input
										type='text'
										id='cname'
										name='cityName'
										onChange={({ target }) => {
											setFieldValue('cityName', target.value);
										}}
									/>
									<div className='mt:30 mb:30'>
										<button
											className={`width:full btn font-size:25 font:bold line-height:22 ${
												isValid ? 'bg:yellow text:black' : 'bg:lighter-grey text:white no:border'
											}`}
											type='submit'
											disabled={!isValid}
										>
											Submit
										</button>
									</div>
								</div>
							</form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default HomePage;
