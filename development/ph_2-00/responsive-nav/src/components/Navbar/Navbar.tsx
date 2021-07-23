import React, { useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Dropdown } from '../Dropdown/Dropdown';
import './Navbar.css';

// Set width variable to value of window.innerWidth when screen
// size changes.
function useWindowSize() {
	const [size, setSize] = useState([0]);
	useLayoutEffect(() => {
		function updateSize() {
			setSize([window.innerWidth]);
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);
	return size;
}

export const Navbar = () => {
	const [click, setClick] = useState(false);
	const [dropdown, setDropdown] = useState(false);

	const [width] = useWindowSize();

	// Toggle menu-icon between bars and x on click.
	const handleClick = () => setClick(!click);

	// Toggle slide out mobile menu.
	const closeMobileMenu = () => setClick(false);

	const onMouseEnter = () => {
		if (window.innerWidth < 960) {
			setDropdown(false);
		} else {
			setDropdown(true);
		}
	};

	const onMouseLeave = () => {
		setDropdown(false);
	};

	return (
		<nav className='navbar'>
			<div className='navbar-title'>
				<Link to='/' className='navbar-logo'>
					<span className='fnt-xbold'>XYZ</span>portal
				</Link>
				{/* WIP - Only display if user is logged in. */}
				<span className='navbar-text'>Welcome, User</span>
			</div>

			{/* Dynamic hamburger menu. */}
			<div className='menu-icon' onClick={handleClick}>
				<i className={click ? 'fas fa-times' : 'fas fa-bars'} />
			</div>

			{/* Login link. */}
			<ul className={click ? 'nav-menu active' : 'nav-menu'}>
				<li className='nav-links-mobile'>
					<Link to='/login' className='nav-links' onClick={closeMobileMenu}>
						<i className='fas fa-sign-in-alt' /> Login
					</Link>
				</li>

				{/* Users link. */}
				<li className='nav-item'>
					<Link to='/users' className='nav-links' onClick={closeMobileMenu}>
						<i className='fas fa-users' /> Users
					</Link>
				</li>

				{/* Operations Link */}
				<li className='nav-item'>
					<Link
						to='/operations'
						className='nav-links'
						onClick={closeMobileMenu}
					>
						<i className='fas fa-cog' /> Operations
					</Link>
				</li>

				{/* History link. */}
				<li
					className={width > 960 ? 'nav-item' : 'nav-item-hidden'}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
				>
					<div className='nav-links'>
						<i className='fas fa-archive' /> History
					</div>
					{dropdown && <Dropdown />}
				</li>

				{/* Primary link. */}
				<li className={width < 960 ? 'nav-item' : 'nav-item-hidden'}>
					<Link
						to='/history/primary'
						className='nav-links'
						onClick={closeMobileMenu}
					>
						<i className='fas fa-archive' /> Primary
					</Link>
				</li>

				{/* Secondary link. */}
				<li className={width < 960 ? 'nav-item' : 'nav-item-hidden'}>
					<Link
						to='/history/secondary'
						className='nav-links'
						onClick={closeMobileMenu}
					>
						<i className='fas fa-archive' /> Secondary
					</Link>
				</li>
			</ul>
			{/* Login button. */}
			<Button />
		</nav>
	);
};
