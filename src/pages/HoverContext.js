import React from 'react';

import styles from './styles/HoverContext.scss';

import InfoContainer from './../components/hovercontext/InfoContainer';
import InfoTrigger from './../components/hovercontext/InfoTrigger';

class HoverContext extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			isInfoShown: false,
			infoContent: null,
			offsetHeight: 0,
		};
	}

	setInfo = (text, offsetHeight) => { this.setState({isInfoShown: true, infoContent: text, offsetHeight})}

	clearInfo = () => {this.setState({isInfoShown: false, infoContent: null})}

	render(){
		let Trigger = (props) => (
			<InfoTrigger in={this.setInfo} out={this.clearInfo} info={props.info}>{props.children}</InfoTrigger>
		);

		return <div className={styles.container}>
			<h1>Inspired by <a target="_blank" href="https://codemyui.com/preview-tooltip-link-hover/">this</a></h1>
			<div className={styles.content}>
				Lorem ipsum dolor sit amet, <Trigger info="I'm stuck in an airport in Iceland...">adipisicing</Trigger>  elit. Ad adipisci autem mollitia omnis quaerat sequi suscipit veritatis vitae voluptas. Consectetur consequatur ipsum quaerat quis reprehenderit sapiente <Trigger info="There's 4 hours til my flight and I've been in airports and planes since 15 hours ago :)">blanditiis</Trigger> veniam, voluptatem? Laborum?

				Lorem ipsum dolor sit amet, <Trigger info="I'm stuck in an airport in Iceland...">adipisicing</Trigger>  elit. Ad adipisci <Trigger info="There's 4 hours til my flight">lorem</Trigger> autem mollitia omnis quaerat sequi suscipit veritatis vitae voluptas. Consectetur consequatur ipsum quaerat quis reprehenderit sapiente veniam, voluptatem? Laborum?

				Lorem ipsum dolor sit amet, adipisicing  elit. Ad adipisci autem mollitia omnis quaerat sequi <Trigger info="I'm stuck in an airport in Iceland...">suscipit veritatis vitae voluptas</Trigger>. Consectetur consequatur ipsum quaerat quis reprehenderit sapiente blanditiis veniam, voluptatem? Laborum?

				Lorem ipsum dolor sit amet,elit. Ad adipisci autem mollitia omnis quaerat  <Trigger info="I'm stuck in an airport in Iceland">adipisicing</Trigger> sequi suscipit veritatis vitae voluptas. Consectetur consequatur ipsum quaerat quis reprehenderit sapiente <Trigger info="There's 4 hours til my flight">ipsum</Trigger> veniam, voluptatem? Laborum?
			</div>

		<InfoContainer style={{top: this.state.offsetHeight}} hidden={!this.state.isInfoShown}>
			{this.state.infoContent}
		</InfoContainer>

		</div>
	}

}

export default HoverContext;
