import { PropsWithChildren } from 'react';

const Layout: React.FC<PropsWithChildren> = (props) => {
	return (
		<div id='wrapper' className='layout'>
			<div className='overlay'>
				<div id='page-wrapper' className='full--width height--full-viewport layout-wrapper m--0-auto'>
					{props.children}
				</div>
			</div>
		</div>
	);
};

export default Layout;
