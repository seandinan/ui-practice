import React from 'react';
import styled from 'styled-components';

const BLUE_DARK = 'hsl(208, 38%, 30%)';
const BLUE_LIGHT = 'hsl(208, 38%, 45%)';
const WHITE = 'hsl(208, 38%, 90%)';
const TRANSITION_RATE = '0.3s';

const Container = styled.div`
  padding: 2% 0;
  height: 93%;
  box-sizing: border-box;
  background-color: ${BLUE_LIGHT};

  h1 {
    color: white;
    margin-left: 5%;

    a {
      color: ${BLUE_DARK};

      &:visited {
      	color: ${BLUE_DARK};
      }
    }
  }
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5%;
  padding: 2%;
`;
const SliderWrapper = styled.div`
	display: flex;
	flex-flow: column;
`;
const Line = styled.div`
	position: relative;
	height: 16px;
	width: 200px;
	border-radius: 10px;
	background-color: ${props => props.active ? WHITE : BLUE_DARK};
	margin: 10px 0;
	transition: ${TRANSITION_RATE};
`;
const Ball = styled.div`
	position: absolute;
	height: 30px;
	width: 30px;
	border-radius: 50%;
	background-color: inherit;
	top: -7px;
	transition: left ${TRANSITION_RATE};
`;

class BlurryText extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			active: false,
		};
	}

	render(){
		const { active } = this.state;
		return <Container>
			<h1>Inspired by <a target="_blank" href="https://codemyui.com/slider-icon-hover-animation/">this</a></h1>
			<Content>
				<SliderWrapper
					onMouseEnter={() => this.setState({ active: true })}
					onMouseLeave={() => this.setState({ active: false })}>
					<Line active={active}>
						<Ball style={{ left: active ? '8%' : '75%' }} />
					</Line>
					<Line active={active}>
						<Ball style={{ left: active ? '75%' : '8%' }} />
					</Line>
					<Line active={active}>
						<Ball style={{ left: active ? '30%' : '38%' }} />
					</Line>
				</SliderWrapper>
			</Content>
		</Container>
	}

}

export default BlurryText;
