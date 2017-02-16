import React from 'react';

import styles from './styles/MagnifyImage.scss';

import ImageComponent from './../components/magnifyimage/ImageComponent';

class MagnifyImage extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	render(){
		return <div className={styles.container}>
			<h1>Inspired by <a target="_blank" href="https://codemyui.com/image-hover-magnifying-glass-zoom-effect-colour/">this</a></h1>

			<ImageComponent src="/public/assets/image1.jpg" />
		</div>
	}
}

export default MagnifyImage;
