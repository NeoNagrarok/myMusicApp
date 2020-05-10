import React from 'react';
import {
	BrowserRouter as Router,
	Route
} from "react-router-dom";
import './App.scss';
import Main from './Main';


function App()
{
	return (
		<Router>
			<Route exact path="/:select/:input/" component={Main} />
			<Route exact path="/:none" component={Main} />
			<Route exact path="/" component={Main} />
		</Router>
	);
}

export default App;
