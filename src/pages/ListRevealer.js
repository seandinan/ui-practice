import React from 'react';
import Lister, { ListItem } from './../components/listRevealer/ListRevealer';

const ListRevealer = (props) => {
	return (
		<div style={{padding: '5% 40%'}}>
			<Lister>
				<ListItem>Item 1</ListItem>
				<ListItem>Item 2</ListItem>
				<ListItem>Item 3</ListItem>
			</Lister>
		</div>
	)
}

export default ListRevealer;
