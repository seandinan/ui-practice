import React from 'react';

import styles from './styles/BlurryText.scss';

class BlurryText extends React.Component {
	constructor(props){
		super(props);

		this.state = {};
	}

	render(){
		return <div className={styles.container}>
			<h1>Inspired by <a target="_blank" href="https://codemyui.com/scan-text-coming-focus-animation/">this</a></h1>
			<div className={styles.content}>
				<div className={styles.textContainer}>
					<div className={styles.radarBox}>
						<div className={styles.text}>lorem ipsum</div>
						<div className={styles.topLeft} />
						<div className={styles.topRight} />
						<div className={styles.bottomLeft} />
						<div className={styles.bottomRight} />
					</div>
				</div>

				<div className={styles.blurredText}>lorem ipsum</div>

			</div>
		</div>
	}

}

export default BlurryText;
