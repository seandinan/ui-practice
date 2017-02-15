import React from 'react';
import { Link } from 'react-router';

const Home = (props) => (
	<div style={{padding: '5%'}}>
		<ul>
			<li><Link to="/HoverContext">HoverContext</Link></li>
		</ul>
	</div>
);

export default Home;
