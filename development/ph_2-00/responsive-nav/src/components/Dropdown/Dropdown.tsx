import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuItems } from './MenuItems';

import './Dropdown.css';

interface Props {
	cName?: string;
}
export const Dropdown = ({ cName = 'dropdown-link' }: Props) => {
	const [click, setClick] = useState(false);

	const handleClick = () => setClick(!click);

	return (
		<ul
			onClick={handleClick}
			className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
		>
			{MenuItems.map((item, index) => {
				return (
					<li key={index}>
						<Link
							className={cName}
							to={item.path}
							onClick={() => setClick(false)}
						>
							{item.title}
						</Link>
					</li>
				);
			})}
		</ul>
	);
};
