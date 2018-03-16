import React from 'react';
import Tile from './Tile.jsx';

const Board = props => {
	const tiles = props.board
		.split('')
		.map((item, index) => (
			<Tile
				key={index}
				value={item === '.' ? '' : item}
				disabled={item !== '.' ? true : false}
			/>
		));

	return <form>{tiles}</form>;
};

export default Board;
