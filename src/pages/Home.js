import React from 'react';
import { Link } from 'react-router';

const Home = (props) => (
	<div style={{padding: '5%'}}>
		<ul>
			<li><Link to="/HoverContext">HoverContext</Link></li>
			<li><Link to="/MagnifyImage">MagnifyImage</Link></li>
			<li><Link to="/TimePicker">TimePicker</Link></li>
			<li><Link to="/3dDropdown">3D Dropdown</Link></li>
			<li><Link to="/BlurryText">Blurry Text</Link></li>
			<li><Link to="/LoginReveal">Login Reveal</Link></li>
			<li><Link to="/ListRevealer">List Revealer</Link></li>
			<li><Link to="/SliderIconHover">Slider Icon Hover</Link></li>
			<li><Link to="/DonutChartExpandingData">Donut Chart</Link></li>
		</ul>
	</div>
);

export default Home;
