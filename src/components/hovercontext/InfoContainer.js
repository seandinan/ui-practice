import React from 'react';
import classNames from 'classnames/bind';

import styles from './styles/InfoContainer.scss';
let cx = classNames.bind(styles);

const InfoContainer = (props) => (
	<div style={props.style} className={cx({info: true, hidden: props.hidden})}>
		{props.children}
	</div>
);

InfoContainer.propTypes = {
	hidden: React.PropTypes.bool,

}

export default InfoContainer;
