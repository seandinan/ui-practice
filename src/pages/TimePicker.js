import React from 'react';
import classNames from 'classnames/bind';

import styles from './styles/TimePicker.scss';
let cx = classNames.bind(styles);

import Slider from './../components/timepicker/Slider';

let time = {
	hour: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
	dayHalf: ['AM', 'PM'],
	minute: [],
}

for (let i = 0; i < 60; i++){
	if (i < 10) time.minute.push(`0${i}`);
	else time.minute.push(`${i}`);
}

class TimePicker extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			hour: time.hour[0],
			minute: time.minute[0],
			dayHalf: time.dayHalf[0],
		};
	}

	handleChange = (value, name) => {
		this.setState({[name]: time[name][Math.round((value / 100) * (time[name].length - 1))]});
	}

	render(){
		return <div className={cx({container: true, night: this.state.dayHalf !== 'AM'})}>
			<h1>Inspired by <a target="_blank" href="https://codemyui.com/time-picker-ui-changing-backgrounds-pm/">this</a></h1>

			<div className={styles.componentHolder}>

				<div>
					<span className={styles.time}>
						{`${this.state.hour}:${this.state.minute}`}
					</span>

					<span className={cx({dayHalf: true, night: this.state.dayHalf !== 'AM'})}>
						{this.state.dayHalf}
					</span>
				</div>

				<span style={{display: 'flex', marginTop: '20px'}}>
					<Slider
						name="hour"
						onChange={this.handleChange}
						lockedValues={time.hour.map((value, index) => {
							return 100 * (index / (time.hour.length - 1));
						})} />
					<Slider
						name="minute"
						onChange={this.handleChange}
						lockedValues={time.minute.map((value, index) => {
							return 100 * (index / (time.minute.length - 1));
						})} />
					<Slider
						name="dayHalf"
						onChange={this.handleChange}
						lockedValues={[0, 100]} />
				</span>

			</div>

		</div>
	}
}

export default TimePicker;
