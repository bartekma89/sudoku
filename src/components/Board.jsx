import React from 'react';
import Tile from './Tile.jsx';

const Board = props => {
	const tiles = props.board
		.split('')
		.map((item, index) => (
			<Tile
				key={index}
				value={item === '.' ? '' : item}
				disabled={props.initialBoard[index] !== '.' ? true : false}
				onChange={props.onUpdateTile.bind(this, index)}
				correctAnswer={props.correctAnswer[index]}
			/>
		));

	return <form>{tiles}</form>;
};

export default Board;
