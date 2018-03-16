import React from 'react';
import sudoku from 'sudoku-umd';

import Button from '../components/Button.jsx';
import Board from '../components/Board.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			initialBoard: '',
			board: '',
		};
	}

	onNewBoard(event) {
		const initialBoard = sudoku.generate('easy', false);

		this.setState({
			initialBoard: initialBoard,
			board: initialBoard,
		});
	}

	onRestartBoard(event) {
		this.setState({
			board: this.state.initialBoard,
		});
	}

	render() {
		return (
			<div className="App">
				<h1>Sudoku</h1>
				<Board board={this.state.board} />
				<div className="buttons">
					<Button title="Check" />
					<Button
						title="New Game"
						onAction={this.onNewBoard.bind(this)}
					/>
					<Button title="Solve" />
					<Button
						title="Restart"
						onAction={this.onRestartBoard.bind(this)}
					/>
				</div>
			</div>
		);
	}
}

export default App;
