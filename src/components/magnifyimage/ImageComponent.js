import React from 'react';
import classNames from 'classnames/bind';

import styles from './styles/ImageComponent.scss';
let cx = classNames.bind(styles);

class ImageComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isMagnifierShown: false,
		};
	}

	handleMotion = (event) => {
		let width = event.target.parentNode.clientWidth;
		let height = event.target.parentNode.clientHeight;
		let positionX = event.clientX;
		let positionY = event.clientY;
		let offsetX = event.target.parentNode.offsetLeft;
		let offsetY = event.target.parentNode.offsetTop;

		this.setState({
			magnifyX: `${event.pageX}px`,
			magnifyY: `${event.pageY}px`,
			offsetX: `${100 * (positionX - offsetX) / width}%`,
			offsetY: `${100 * (positionY - offsetY) / height}%`
		});
	}

	renderMagnifier = () => {
		if (this.state.isMagnifierShown){
			return <div
				style={{
					backgroundImage: `url('${this.props.src}')`,
					backgroundPosition: `calc(${this.state.offsetX}) calc(${this.state.offsetY})`,
					top: this.state.magnifyY,
					left: this.state.magnifyX,
				}}
				className={styles.magnifier}>

			</div>
		}	else return null;
	}

	render(){
		return <div
			onMouseMove={this.handleMotion}
			onMouseEnter={() => {this.setState({isMagnifierShown: true})}}
			onMouseLeave={() => {this.setState({isMagnifierShown: false})}}
			className={styles.container}>
			{this.renderMagnifier()}
			<img className={cx({greyed: this.state.isMagnifierShown})} src={this.props.src} />
		</div>
	}
}

ImageComponent.propTypes = {

};

export default ImageComponent;
