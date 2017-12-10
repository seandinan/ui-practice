import React from 'react';
import classNames from 'classnames/bind';

import styles from './styles/LoginReveal.scss';
let cx = classNames.bind(styles);

class LoginReveal extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email: null,
			password: null,
			isLoggedIn: false,
		}
	}

	handleChange = (event) => {
		this.setState({[event.target.name]: event.target.value});
	}

	handleLogin = () => {
		this.setState({isLoggedIn: true});
	}

	render(){
		return (
			<div className={styles.container}>
				<div className={cx({inputsContainer: true, hidden: this.state.isLoggedIn})}>
					<input name="email" type="text" onChange={this.handleChange} />
					<input name="password" type="password" onChange={this.handleChange} />
					<button onClick={this.handleLogin}>Login</button>
				</div>
				<div className={styles.background} />
			</div>
		)
	}
}

export default LoginReveal;
