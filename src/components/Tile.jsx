import React from 'react';

const Tile = props => {
	return (
		<input
			type="number"
			min="1"
			max="9"
			style={
				props.correctAnswer
					? { backgroundColor: 'transparent' }
					: { backgroundColor: 'red' }
			}
			{...props}
		/>
	);
};

export default Tile;
