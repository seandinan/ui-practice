import React from 'react';
import Styles from './../../constants/base';

const DONUT_THICKNESS = 40;

let transitionInterval;

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
  	if (height !== prevProps.height || width !== prevProps.width){
  		this.renderCanvas();
	  }

	  if (activeRegionIndex !== prevState.activeRegionIndex){
		  clearInterval(transitionInterval)
		  // Starting percentage --> ending percentage
		  let start;
		  let end = this.getSelectorPercentage(activeRegionIndex);
		  if (prevState.activeRegionIndex !== null){
		  	start = this.getSelectorPercentage(prevState.activeRegionIndex);
		  } else start = 0;
  		this.animatePositioning(start, end);
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
		let center = this.getCenter();
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
  	let { height, width } = this.getSizing();
  	return  0.5 * ( Math.min(width, height) - DONUT_THICKNESS - 5 );
  };

  getCenter = () => {
  	let { height, width } = this.getSizing();
  	return { x: 0.5 * width + 0.5 * DONUT_THICKNESS, y: 0.5 * height + 0.5 * DONUT_THICKNESS};
};

  getSizing = () => ({ width: this.props.width - DONUT_THICKNESS, height: this.props.height - DONUT_THICKNESS });

  checkFitsRing = (x, y) => {
	  let center = this.getCenter();
	  let radius = this.getRadius();
	  let distance = Math.sqrt(Math.pow(x - center.x, 2) + Math.pow(y - center.y, 2));
	  return distance >= radius - (0.5 * DONUT_THICKNESS) && distance <= (radius + 0.5 * DONUT_THICKNESS);
  };

  clearCanvas = (ctx) => {
	  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	  ctx.rect(0, 0, this.canvas.width, this.canvas.height);
  };

  animatePositioning = (start, end) => {
	  let ctx = this.canvas.getContext('2d');
	  let percentage = start;
	  transitionInterval = setInterval(() => {
	  	if (percentage >= end) return clearInterval(transitionInterval);
		  this.clearCanvas(ctx);
		  this.renderDonutOutline(ctx);
		  this.renderPercentages(ctx);
		  this.renderSelector(ctx, this.getSelectorPosition(percentage));
		  percentage += (end - start) / 100;
	  }, 20);
  };

  getSelectorPosition = (percentage) => {
	  let center = this.getCenter();
	  let radius = this.getRadius() + ( 0.5 * DONUT_THICKNESS );
	  let theta = 2 * Math.PI * percentage / 100;
	  return {
		  x: center.x + ( radius * Math.cos(theta - Math.PI / 2) ),
		  y: center.y + ( radius * Math.sin(theta - Math.PI / 2) ),
	  };
  };

  getSelectorPercentage = (regionIndex) => {
	  let percentage = 0;
	  const region = this.props.children[regionIndex].props;
	  this.props.children.forEach((child, index) => {
		  if (index < regionIndex) percentage += child.props.percentage;
	  });
	  percentage += 0.5 * region.percentage;
	  return percentage;
  };

  renderDonutOutline = (ctx) => {
  	let center = this.getCenter();
  	ctx.strokeStyle = Styles.grayLight;
  	ctx.lineWidth = DONUT_THICKNESS;
	  ctx.beginPath();
	  ctx.arc(center.x, center.y, this.getRadius(), 0, 2 * Math.PI);
	  ctx.stroke();
	  ctx.closePath();
  };

  renderPercentages = (ctx) => {
  	const center = this.getCenter();
  	let offset = 0;
  	React.Children.toArray(this.props.children)
		  .filter(child => child.props.componentName === 'DonutPercentage')
		  .map(child => child.props)
		  .forEach((child) => {
				let angle = ( 2 * Math.PI * child.percentage / 100 );
		  	ctx.beginPath();
  		  ctx.strokeStyle = child.color;
			  ctx.arc(center.x, center.y, this.getRadius(), offset - (Math.PI / 2), angle + offset - (Math.PI / 2));
  		  ctx.stroke();
  		  ctx.closePath();
  		  offset += angle;
	    });
  };

  renderSelector = (ctx, coords) => {
  	const { activeRegionIndex } = this.state;
	  const region = this.props.children[activeRegionIndex].props;
  	let point;
  	if (coords) point = coords;
	  else point = this.getSelectorPosition(this.getSelectorPercentage(activeRegionIndex));

  	// Clear border
	  ctx.beginPath();
	  ctx.fillStyle = region.color;
	  ctx.save();
	  ctx.globalCompositeOperation = 'destination-out';
	  ctx.arc(point.x, point.y, 0.6 * DONUT_THICKNESS, 0, 2 * Math.PI);
	  ctx.fill();
	  ctx.closePath();
	  ctx.restore();

	  // Actual selector
	  ctx.beginPath();
	  ctx.arc(point.x, point.y, 0.5 * DONUT_THICKNESS, 0, 2 * Math.PI);
	  ctx.fill();
	  ctx.closePath();

  };

  renderCanvas = () => {
		let ctx = this.canvas.getContext('2d');
		this.clearCanvas(ctx);
		this.renderDonutOutline(ctx);
		this.renderPercentages(ctx);
		if (this.state.activeRegionIndex !== null) this.renderSelector(ctx);
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
