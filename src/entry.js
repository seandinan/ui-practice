import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory, Link, IndexRedirect } from 'react-router';
import DonutChartExpandingData from './pages/DonutChartExpandingData';

import Home from './pages/Home';
import HoverContext from './pages/HoverContext';
import MagnifyImage from './pages/MagnifyImage';
import TimePicker from './pages/TimePicker';
import ThreeDDropdown from './pages/3dDropdown';
import BlurryText from './pages/BlurryText';
import LoginReveal from './pages/LoginReveal';
import ListRevealer from './pages/ListRevealer';
import LineLoader from './pages/LineLoader';
import SliderIconHover from './pages/SliderIconHover';

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
			<Route path="/MagnifyImage" component={MagnifyImage} />
			<Route path="/TimePicker" component={TimePicker} />
			<Route path="/3dDropdown" component={ThreeDDropdown} />
			<Route path="/BlurryText" component={BlurryText} />
			<Route path="/LoginReveal" component={LoginReveal} />
			<Route path="/ListRevealer" component={ListRevealer} />
			<Route path="/LineLoader" component={LineLoader} />
			<Route path="/SliderIconHover" component={SliderIconHover} />
			<Route path="/DonutChartExpandingData" component={DonutChartExpandingData} />
		</Route>

		<Route path="*" component={error} />
	</Router>
);

ReactDOM.render(<Routing />, document.getElementById('app'));



