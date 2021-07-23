import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';

import { Users } from './components/pages/Users';
import { Operations } from './components/pages/Operations';
import { Login } from './components/pages/Login';
import { Primary } from './components/pages/history/Primary';
import { Secondary } from './components/pages/history/Secondary';

import './App.css';

function App() {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route path='/users' exact component={Users} />
				<Route path='/operations' exact component={Operations} />
				<Route path='/login' exact component={Login} />
				<Route path='/history/primary' exact component={Primary} />
				<Route path='/history/secondary' exact component={Secondary} />
			</Switch>
		</Router>
	);
}

export default App;
