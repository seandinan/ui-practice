import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles/ListRevealer.scss';

let cx = classNames.bind(styles);

export default class ListRevealer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    	collapsed: false,
    }
  }

  toggleCollapse = () => { this.setState({collapsed: !this.state.collapsed}) }

  render(){
    return (
      <div className={styles.container}>
	      <div className={styles.header} onClick={this.toggleCollapse}>
		      Header Name
	      </div>
	      <div className={cx({listContainer: true, collapsed: this.state.collapsed})}>
		      <div className={styles.list}>
		        {this.props.children}
		      </div>
	      </div>
      </div>
    )
  }
}

export let ListItem = (props) => {
	return <div className={styles.listItem}>{props.children}</div>
}


