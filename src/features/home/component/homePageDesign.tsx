import { FC } from 'react';

interface IProps {
	data: any;
}

const HomePageDesign: FC<IProps> = (props) => {
	const { data } = props;

	return (
		<div>
			<h1>{data.resolvedAddress}</h1>
		</div>
	);
};

export default HomePageDesign;
