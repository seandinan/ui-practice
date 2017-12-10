import React from 'react';
import classNames from 'classnames/bind';

import styles from './styles/Dropdown.scss';
let cx = classNames.bind(styles);

class Dropdown extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isCollapsed: true,
			activeOption: this.props.options[0],
		};
	}

	render(){
		return <div style={{display: 'flex', flexFlow: 'column', alignItems: 'center'}}>
			<div
				className={styles.selection}
				onClick={() => {this.setState({isCollapsed: false})}}>
				{this.state.activeOption}
			</div>

			<ul className={cx({optionList: true, collapsed: this.state.isCollapsed})}>
				{this.props.options.map((option, index) => (
					<li
						onClick={() => {this.setState({activeOption: option, isCollapsed: true})}}
						key={index}>
						{option}
					</li>
				))}
			</ul>

		</div>
	}
}

Dropdown.propTypes = {
	defaultValue: React.PropTypes.string,
	options: React.PropTypes.array.isRequired,
};

export default Dropdown;
