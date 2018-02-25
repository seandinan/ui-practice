import React from 'react';
import Styles from './../../constants/base';

const DONUT_THICKNESS = 40;

class DonutChart extends React.Component {
  constructor(props){
    super(props);
    this.canvas;
    this.state = {
    	activeRegionIndex: null,
    };
  }

  componentDidMount(){
	  this.renderCanvas();
  }

  componentDidUpdate(prevProps, prevState){
  	const { height, width } = this.props;
  	const { activeRegionIndex } = this.state;
  	if (height !== prevProps.height || width !== prevProps.width || activeRegionIndex !== prevState.activeRegionIndex){
  		this.renderCanvas();
	  }
  }

  handleClick = (e) => {
  	e.preventDefault();
  	let mouse = { x: e.clientX - this.canvas.offsetLeft, y: e.clientY - this.canvas.offsetTop };
  	if (this.checkFitsRing(mouse.x, mouse.y)){
  		let angle = this.getAngleFromTop(mouse.x, mouse.y); // Radians
		  let percentage = 100 * angle / ( 2 * Math.PI );
  		let total = 0, child;
  		for (let i = 0; i < this.props.children.length; i++){
  			child = this.props.children[i];
			  if (percentage >= total && percentage <= total + child.props.percentage){
			  	this.setState({ activeRegionIndex: i });
			  	break;
			  }
			  total += child.props.percentage;
		  }
			// Get the percentage from the top to the point
	  }
  }

  getAngleFromTop = (x, y) => {
		let { width, height } = this.props;
		let center = { x: 0.5 * width, y: 0.5 * height };
	  let distance = Math.sqrt(Math.pow(x - center.x, 2) + Math.pow(y - center.y, 2));
	  let top = { x: center.x, y: center.y - distance };
	  let a = distance;
	  let b = distance;
	  let c = Math.sqrt(Math.pow(top.x - x, 2) + Math.pow(top.y - y, 2));
	  let theta = Math.acos((Math.pow(c, 2) - Math.pow(a, 2) - Math.pow(b, 2)) / (-2 * a * b));
	  if (x < center.x) theta = ( 2 * Math.PI ) - theta;
	  return theta;
  };

  getRadius = () => {
  	return  0.5 * ( Math.min(this.props.width, this.props.height) - DONUT_THICKNESS - 5 );
  };

  checkFitsRing = (x, y) => {
	  const { width, height } = this.props;
	  let center = { x: 0.5 * width, y: 0.5 * height };
	  let radius = this.getRadius();
	  let distance = Math.sqrt(Math.pow(x - center.x, 2) + Math.pow(y - center.y, 2));
	  return distance >= radius - (0.5 * DONUT_THICKNESS) && distance <= (radius + 0.5 * DONUT_THICKNESS);
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

  renderSelector = () => {
  	const { width, height, children } = this.props;
  	const { activeRegionIndex } = this.state;
  	console.log(children[activeRegionIndex].props);
  };

  renderCanvas = () => {
		let ctx = this.canvas.getContext('2d');
		this.clearCanvas(ctx);
		this.renderDonutOutline(ctx);
		this.renderPercentages(ctx);
		if (this.state.activeRegionIndex !== null) this.renderSelector();
  };

  render(){
    return (
      <canvas
	      onClick={this.handleClick}
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

DonutChart.propTypes = {
	onSelect: React.PropTypes.func,
};

export default DonutChart;
