import React from 'react';

const Tile = props => {
	return <input type="number" min="1" max="9" {...props} />;
};

export default Tile;
