import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/board';
import ResetButton from './components/reset-button';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return lines.find(line => {
    const [a, b, c] = line;
    return (squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    );
  });
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: this.state.history.concat([{squares}]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(move) {
    this.setState({
      stepNumber: move,
      xIsNext: (move % 2) === 0,
    });
  }

  resetGame() {
    this.setState({
      history: this.state.history.slice(0, this.state.stepNumber + 1),
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winningLine = calculateWinner(current.squares);
    let status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    if (winningLine) status = `Winner is: ${current.squares[winningLine[0]]}`;
    if (current.squares.filter(square => !square).length === 0) status = 'It was a draw';

    const moves = this.state.history.map((step, move) => {
      const desc = move ? `Go to move # ${move}` : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    const currentMove = `Move ${this.state.stepNumber} out of ${history.length - 1}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{currentMove}</div>
          <div>{status}</div>
          <ol>{moves}</ol>
          <ResetButton
            step={this.state.stepNumber}
            steps={history.length - 1}
            onClick={() => this.resetGame()}
          />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
