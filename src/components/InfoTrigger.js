import React from 'react';

import styles from './styles/InfoTrigger.scss';

const InfoTrigger = (props) => (
	<span onMouseEnter={(event) => {props.in(props.info, event.target.offsetTop - event.target.parentNode.offsetTop)}} onMouseLeave={props.out} className={styles.trigger}>
		{props.children}
	</span>
);

InfoTrigger.propTypes = {
	in: React.PropTypes.func.isRequired,
	out: React.PropTypes.func.isRequired,
	info: React.PropTypes.string.isRequired,
}

export default InfoTrigger;
