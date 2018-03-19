import React from 'react';
import style from './Button.css';

const Button = props => {
	return (
		<button onClick={props.onAction} {...props}>
			{props.title}
		</button>
	);
};

export default Button;
