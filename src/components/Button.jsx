import React from 'react';

const Button = props => {
	return (
		<button onClick={props.onAction} {...props}>
			{props.title}
		</button>
	);
};

export default Button;
