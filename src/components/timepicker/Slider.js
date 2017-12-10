import React from 'react';
import classNames from 'classnames/bind';

import styles from './styles/Slider.scss';
let cx = classNames.bind(styles);

export default class Slider extends React.Component {
	state = {
		value: 0,
		min: this.props.min || 0,
		max: this.props.max || 100,
		isChangeActive: false,
	}

	static propTypes = {
		name: React.PropTypes.string.isRequired,
		lockedValues: React.PropTypes.arrayOf(React.PropTypes.number),
		min: React.PropTypes.number,
		max: React.PropTypes.number,
		onChange: React.PropTypes.func.isRequired,
	}

	handleMotion = (event) => {
		if (this.state.isChangeActive){
			let localPosition = event.clientY - event.currentTarget.offsetTop;
			let localHeight = event.currentTarget.clientHeight;
			let percentage = 100 * (1 - (localPosition / localHeight));

			if (this.props.lockedValues){
				// Latch onto whichever of the lockedValues the percentage is closest to
				let closestIndex = 0;
				let closestDistance;

				this.props.lockedValues.forEach((lockedValue, index) => {
					let distance = Math.abs(percentage - lockedValue);
					if (index === 0) closestDistance = distance;
					if (distance < closestDistance){
						closestDistance = Math.abs(percentage - lockedValue);
						closestIndex = index;
					}
				});

				percentage = this.props.lockedValues[closestIndex];
			}

			if (percentage >= 0 && percentage <= 100){
				this.setState({value: percentage}, () => {
					this.props.onChange(this.state.value, this.props.name);
				});
			}
		} else return null;
	}

	render(){
		return (
			<div
				onMouseUp={() => {this.setState({isChangeActive: false})}}
				onMouseMove={this.handleMotion}
				className={styles.sliderContainer}>
				<div className={styles.slider}>
					<div
						onMouseDown={() => {this.setState({isChangeActive: true})}}
						style={{bottom: `calc(${this.state.value}% - 10px)`}}
						className={cx({marker: true, active: this.state.isChangeActive})} />
				</div>
			</div>
		)
	}
}
