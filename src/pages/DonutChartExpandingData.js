import React from 'react';
import styled from 'styled-components';
import DonutChart, { DonutPercentage } from './../components/donut-chart/DonutChart';
import Styles from './../constants/base';

const Container = styled.div`
  padding: 2% 0;
  height: 93%;
  box-sizing: border-box;
  background-color: hsl(180, 47%, 63%);

  h1 {
    color: white;
    margin-left: 5%;

    a {
      color: hsl(180, 47%, 33%);

      &:visited {
      	color: hsl(180, 47%, 33%);
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


class DonutChartExpandingData extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			windowHeight: window.innerHeight,
			windowWidth:  window.innerWidth,
		};
	}

	componentDidMount(){
		window.addEventListener('resize', () => {
			this.setState({
				windowHeight: window.innerHeight,
				windowWidth: window.innerWidth
			});
		})
	}

	render(){
		return <Container>
			<h1>Inspired by <a target="_blank" href="https://codemyui.com/pie-chart-data-click/">this</a></h1>
			<Content>
				<DonutChart height={0.5 * this.state.windowHeight} width={0.5 * this.state.windowWidth}>
					<DonutPercentage color={Styles.blue} name="Tasty Blue Donut" percentage={30}/>
					<DonutPercentage color={Styles.pink} name="Tasty Watermelon" percentage={20}/>
					<DonutPercentage color={Styles.salmon} name="Tasty Sushi" percentage={15}/>
					<DonutPercentage color={Styles.orange} name="Tasty Orange" percentage={15}/>
					<DonutPercentage color={Styles.yellow} name="Tasty Cupcake" percentage={10}/>
					<DonutPercentage color={Styles.green} name="Tasty Apple" percentage={10}/>
				</DonutChart>
			</Content>
		</Container>
	}

}

export default DonutChartExpandingData;
