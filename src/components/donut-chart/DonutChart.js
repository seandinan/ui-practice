import React from 'react';
import Styles from './../../constants/base';

const DONUT_THICKNESS = 40;

class DonutChart extends React.Component {
  constructor(props){
    super(props);
    this.canvas;
    this.state = {};
  }

  componentDidMount(){
	  this.renderCanvas();
  }

  componentDidUpdate(prevProps, prevState){
  	if (this.props.height !== prevProps.height || this.props.width !== prevProps.width){
  		this.renderCanvas();
	  }
  }

  getRadius = () => {
  	return  0.5 * ( Math.min(this.props.width, this.props.height) - DONUT_THICKNESS - 5 );
  };

  clearCanvas = (ctx) => {
	  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	  ctx.strokeStyle = 'hsl(0, 50%, 70%)';
	  ctx.lineWidth = 5;
	  ctx.rect(0, 0, this.canvas.width, this.canvas.height);
	  ctx.stroke();
  };

  renderDonutOutline = (ctx) => {
  	const { width, height } = this.props;
  	ctx.strokeStyle = Styles.grayLight;
  	ctx.lineWidth = DONUT_THICKNESS;
	  ctx.beginPath();
	  ctx.arc(0.5 * width, 0.5 * height, this.getRadius(), 0, 2 * Math.PI);
	  ctx.stroke();
	  ctx.closePath();
  };

  renderPercentages = (ctx) => {
  	const { width, height } = this.props;
  	let offset = 0;
	  // this.getRadius() - ( 2 * DONUT_THICKNESS)
  	React.Children.toArray(this.props.children)
		  .filter(child => child.props.componentName === 'DonutPercentage')
		  .map(child => child.props)
		  .forEach((child) => {
				let angle = ( 2 * Math.PI * child.percentage / 100 );
		  	ctx.beginPath();
  		  ctx.strokeStyle = child.color;
			  ctx.arc(0.5 * width, 0.5 * height, this.getRadius(), offset - (Math.PI / 2), angle + offset - (Math.PI / 2));
  		  ctx.stroke();
  		  ctx.closePath();
  		  offset += angle;
	    });
  };

  renderCanvas = () => {
		let ctx = this.canvas.getContext('2d');
		this.clearCanvas(ctx);
		this.renderDonutOutline(ctx);
		this.renderPercentages(ctx);
  };

  render(){
    return (
      <canvas
	      ref={ref => this.canvas = ref}
	      style={this.props.style}
	      className={this.props.className}
	      height={this.props.height}
	      width={this.props.width}/>
    )
  }
}

export const DonutPercentage = ({ color, name, percentage }) => null;

DonutPercentage.defaultProps = {
	percentage: 0,
	componentName: 'DonutPercentage',
}

DonutPercentage.propTypes = {
	color:      React.PropTypes.string.isRequired,
	name:       React.PropTypes.string.isRequired,
	percentage: React.PropTypes.number,
};

DonutChart.defaultProps = {};

DonutChart.propTypes = {};

export default DonutChart;
