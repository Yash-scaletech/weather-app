import { FC } from 'react';

interface IProps {
	data: any;
}

const HomePageDesign: FC<IProps> = (props) => {
	const { data } = props;
	console.log(data);

	return <div>HomePageDesign</div>;
};

export default HomePageDesign;
