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
			answer: null,
		};
	}

	componentDidMount() {
		const initialBoard = sudoku.generate('easy', false);
		const answer = initialBoard.split('').map(item => true);
		this.setState({
			initialBoard,
			board: initialBoard,
			answer,
		});
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

	onSolveBoard(event) {
		const solution = sudoku.solve(this.state.board);

		if (solution) {
			this.setState({
				board: sudoku.solve(this.state.initialBoard),
			});
		} else {
			alert('Error(s) in solution. Try again');
		}
	}

	onUpdateTile(index, event) {
		const value = event.target.value ? event.target.value : '.';
		this.setState(prevState => {
			return {
				board:
					prevState.board.slice(0, index) +
					value +
					prevState.board.slice(index + 1),
			};
		});
	}

	onCheck(event) {
		const solution = sudoku.solve(this.state.initialBoard).split('');
		const acuallyAnswer = this.state.board.split('');

		const answer = acuallyAnswer.map(
			(item, index) => item === solution[index]
		);

		this.setState({
			answer,
		});
	}

	render() {
		return (
			<div className="App">
				<h1>Sudoku</h1>
				<Board
					board={this.state.board}
					initialBoard={this.state.initialBoard}
					onUpdateTile={this.onUpdateTile.bind(this)}
					correctAnswer={this.state.answer}
				/>
				<div className="buttons">
					<Button title="Check" onAction={this.onCheck.bind(this)} />
					<Button
						title="New Game"
						onAction={this.onNewBoard.bind(this)}
					/>
					<Button
						title="Solve"
						onAction={this.onSolveBoard.bind(this)}
					/>
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
