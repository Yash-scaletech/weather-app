import { useState, useEffect } from 'react';

import { Formik, FormikValues } from 'formik';
import HomePageDesign from './homePageDesign';

import '../style/homePage.scss';

const HomePageForm = () => {
	const [data, setData] = useState();
	const [city, setCity] = useState<string>('');
	const [errMsg, setErrMsg] = useState<boolean>(false);

	useEffect(() => {
		fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=Y2HHEQQ9TX662V4MMAGAL9E8J`)
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

	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
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
								{errMsg && <div className='error'>Please Enter Valid City Name</div>}
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
			<HomePageDesign data={data} />
		</div>
	);
};

export default HomePageForm;
