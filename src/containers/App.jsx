import React from 'react';
import sudoku from 'sudoku-umd';

import Button from '../components/Button.jsx';
import Board from '../components/Board.jsx';
import style from './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			initialBoard: '',
			board: '',
			correctAnswer: null,
			boardsHistoryState: [],
		};
	}

	componentDidMount() {
		const initialBoard = sudoku.generate('medium', false);
		const correctAnswer = initialBoard.split('').map(item => true);
		const boardsHistoryState = [initialBoard];
		this.setState({
			initialBoard,
			board: initialBoard,
			correctAnswer,
			boardsHistoryState,
		});
		console.log(this.state.initialBoard);
	}

	onHandlerPrevent(event) {
		event.preventDefault();
	}

	onNewBoard(event) {
		const initialBoard = sudoku.generate('medium', false);
		const correctAnswer = initialBoard.split('').map(item => true);
		this.setState({
			initialBoard: initialBoard,
			board: initialBoard,
			boardsHistoryState: [initialBoard],
			correctAnswer,
		});
		console.log(this.state.initialBoard);
	}

	onRestartBoard(event) {
		const correctAnswer = this.state.initialBoard
			.split('')
			.map(item => true);
		this.setState({
			board: this.state.initialBoard,
			correctAnswer,
			boardsHistoryState: [this.state.initialBoard],
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
		event.preventDefault();
		const value = event.target.value ? event.target.value : '.';

		this.setState(prevState => {
			return {
				board:
					prevState.board.slice(0, index) +
					value +
					prevState.board.slice(index + 1),

				boardsHistoryState: [
					...this.state.boardsHistoryState,
					prevState.board.slice(0, index) +
						value +
						prevState.board.slice(index + 1),
				],
			};
		});
	}

	onUndo(event) {
		const boardsHistoryState = this.state.boardsHistoryState;
		boardsHistoryState.splice(boardsHistoryState.length - 1, 1);
		this.setState({
			board: boardsHistoryState[boardsHistoryState.length - 1],
			boardsHistoryState,
		});
	}

	onCheck(event) {
		const solution = sudoku.solve(this.state.initialBoard).split('');
		const acuallyAnswer = this.state.board.split('');

		const correctAnswer = acuallyAnswer.map(
			(item, index) => item === solution[index]
		);

		this.setState({
			correctAnswer,
		});
	}

	render() {
		return (
			<div>
				<h1>Sudoku</h1>
				<Button
					title={'Undo'}
					onAction={this.onUndo.bind(this)}
					disabled={
						this.state.boardsHistoryState.length > 1 ? false : true
					}
				/>
				<Board
					board={this.state.board}
					initialBoard={this.state.initialBoard}
					onUpdateTile={this.onUpdateTile.bind(this)}
					correctAnswer={this.state.correctAnswer}
					onHandlerPrevent={this.onHandlerPrevent.bind(this)}
				/>
				<div className={style.buttons}>
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
