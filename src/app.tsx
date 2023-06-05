import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from 'hoc/layout/layout';
import Home from 'features/homepage/component/home';

const App: React.FC = () => {
	return (
		<Layout>
			<Routes>
				<Route path='/' element={<Home />} />
			</Routes>
		</Layout>
	);
};

export default App;
