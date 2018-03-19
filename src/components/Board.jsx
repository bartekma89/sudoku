import React from 'react';
import Tile from './Tile.jsx';
import style from './Board.css';

const Board = props => {
	const tiles = props.board
		.split('')
		.map((item, index) => (
			<Tile
				key={index}
				value={item === '.' ? '' : item}
				correctAnswer={props.correctAnswer[index]}
				disabled={props.initialBoard[index] !== '.' ? true : false}
				onChange={props.onUpdateTile.bind(this, index)}
			/>
		));

	return <form onSubmit={props.onHandlerPrevent}>{tiles}</form>;
};

export default Board;
