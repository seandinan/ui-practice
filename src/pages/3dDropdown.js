import React from 'react';

import styles from './styles/3dDropdown.scss';

import Dropdown from './../components/3dDropdown/Dropdown';

const ThreeDDropdown = (props) => (
	<div className={styles.container}>
		<h1>Inspired by <a target="_blank" href="https://codemyui.com/drop-down-list-with-hover-animation/">this</a></h1>
		<Dropdown options={['Option 1', 'Option 2', 'Option 3']} />
	</div>
);


export default ThreeDDropdown;
