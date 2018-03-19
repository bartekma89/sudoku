import React from 'react';
import style from './Tile.css';

const Tile = props => {
	return (
		<input
			type="number"
			min="1"
			max="9"
			className={
				props.correctAswer === true
					? style.correctValue
					: style.wrongValue
			}
			{...props}
		/>
	);
};

export default Tile;
