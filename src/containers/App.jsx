import React from 'react';
import sudoku from 'sudoku-umd';
import swal from 'sweetalert';

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
			isActive: false,
			gameLevel: '',
		};
	}

	componentDidMount() {
		const initialBoard = sudoku.generate('easy', false);
		const correctAnswer = initialBoard.split('').map(item => true);
		const boardsHistoryState = [initialBoard];
		this.setState({
			initialBoard: initialBoard,
			board: initialBoard,
			correctAnswer,
			boardsHistoryState,
			gameLevel: 'easy',
		});
	}

	onHandlerPrevent(event) {
		event.preventDefault();
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
			swal('Error(s) in solution', 'Try again', { icon: 'error' });
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

		if (solution.toString() === acuallyAnswer.toString()) {
			swal({
				title: 'Gratulation!',
				text: 'You win!!!',
				icon: 'success',
			});
		}
	}

	onNewBoard(gameLevel) {
		const initialBoard = sudoku.generate(gameLevel, false);
		const correctAnswer = initialBoard.split('').map(item => true);
		this.setState({
			initialBoard: initialBoard,
			board: initialBoard,
			boardsHistoryState: [initialBoard],
			correctAnswer,
		});
	}

	onSelectLevel(gameLevel, event) {
		event.preventDefault();
		this.setState({
			gameLevel: gameLevel,
			isActive: false,
		});
		this.onNewBoard(gameLevel);
	}

	render() {
		return (
			<div>
				<header>
					<h1>Sudoku</h1>
					<Button
						title={'Undo'}
						onAction={this.onUndo.bind(this)}
						disabled={
							this.state.boardsHistoryState.length > 1
								? false
								: true
						}
					/>
					<span>Game level: {this.state.gameLevel}</span>
				</header>
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
						onClick={() => {
							return this.setState({ isActive: true });
						}}
					/>
					<Button
						title="Solve"
						onAction={this.onSolveBoard.bind(this)}
					/>
					<Button
						title="Restart"
						onAction={this.onRestartBoard.bind(this)}
					/>

					<div
						className={
							this.state.isActive ? style.active : style.inactive
						}
					>
						<h3>Select level</h3>
						<Button
							title="Easy"
							onAction={this.onSelectLevel.bind(this, 'easy')}
						/>
						<Button
							title="Medium"
							onAction={this.onSelectLevel.bind(this, 'medium')}
						/>
						<Button
							title="Hard"
							onAction={this.onSelectLevel.bind(this, 'hard')}
						/>
						<Button
							title="Very-hard"
							onAction={this.onSelectLevel.bind(
								this,
								'very-hard'
							)}
						/>
						<Button
							title="Insane"
							onAction={this.onSelectLevel.bind(this, 'insane')}
						/>
						<Button
							title="Inhuman"
							onAction={this.onSelectLevel.bind(this, 'inhuman')}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
