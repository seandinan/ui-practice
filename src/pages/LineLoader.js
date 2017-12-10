import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const slideTheLine = keyframes`
  from {
    left: 0;
	  background-color: hsl(193, 38%, 45%);
  }
  
  to {
    left: 100%;
    background-color: hsl( 91,  52%, 61%);
  }
`

const Wrapper = styled.div`
  box-sizing: border-box;
	height: 15px;
	width: 15%;
	background-color: hsl(0, 0%, 95%);
	display: flex;
	justify-content: flex-start;
	align-items: center;
	position: absolute;
	left: 20px;
	top: 50px;
	border-radius: 10px;
	overflow: hidden;
`

const Line = styled.div`
  box-sizing: border-box;
  position: relative;
  border-radius: 10px;
	background-color: hsl(193, 38%, 45%);
	height: 40%;
	width: 10%;
	${props => props.loaded && css`
    animation: ${slideTheLine} 2s ease infinite;
  `}
`

class LineLoader extends React.Component {
  constructor(props){
    super(props);
    this.container;
    this.state = {
    	loaded: 0,
    };
  }

  componentDidMount(){
    let interval = window.setInterval(() => {
      const { loaded } = this.state;
      if (loaded < 100){
        this.setState({ loaded: loaded + 0.5 });
      } else window.clearInterval(interval);
    }, 5);
  }

  getLineStyle = () => (
    this.state.loaded < 100 ? { width: `${this.state.loaded}%` } : null
  )

  render(){
    return (
      <Wrapper innerRef={ref => this.container = ref}>
        <Line loaded={this.state.loaded >= 100} style={this.getLineStyle()} />
      </Wrapper>
    )
  }
}

LineLoader.defaultProps = {};

LineLoader.propTypes = {};

export default LineLoader;
