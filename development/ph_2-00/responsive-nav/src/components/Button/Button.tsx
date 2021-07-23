import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

export const Button = () => {
	return (
		<Link to='login'>
			<button className='btn'>Login</button>
		</Link>
	);
};
