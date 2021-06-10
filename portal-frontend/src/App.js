import './App.css';

import { Home } from './Home';
import { Department } from './Department';
import { Employee } from './Employee';
import { Navigation } from './Navigation';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<div className='mx-4'>
			<BrowserRouter>
				<div className='container'>
					<h3 className='m-3 d-flex justify-content-center'>
						.NET Core React | CRUD
					</h3>
				</div>
				<Navigation />
				<Switch>
					<Route path='/' component={Home} exact />
					<Route path='/department' component={Department} exact />
					<Route path='/employee' component={Employee} exact />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
