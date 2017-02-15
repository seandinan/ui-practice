import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory, Link, IndexRedirect } from 'react-router';

import Home from './pages/Home';
import HoverContext from './pages/HoverContext';

const container = (props) => (
	<div>
		<div style={{margin: '5px 20px 20px 20px', borderBottom: '1px solid black'}}>
		<Link style={{display: 'inline-block', textDecoration: 'none', margin: '5px'}} to="/">Home</Link>
		</div>
		{props.children}
	</div>
);

const error = () => (
	<div style={{marginTop: '5%', textAlign: 'center'}}>
		Whoops! Took a wrong turn.<br />
		<Link to="/">Let's go home.</Link>
	</div>
);

const Routing = () => (
	<Router history={browserHistory}>
		<Route path="/" component={container}>
			<IndexRoute component={Home} />
			<Route path="/HoverContext" component={HoverContext} />
		</Route>

		<Route path="*" component={error} />
	</Router>
);

ReactDOM.render(<Routing />, document.getElementById('app'));



