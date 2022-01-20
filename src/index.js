import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/*
class Square extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button 
        className="square" 
        onClick={() => this.props.onClick()})}
      >
        {this.props.value}
      </button>
    );
  }
}
*/

let players = ['X', 'O'];
let status = 'Current Player: X';
let turn = 0;

function Square(props){
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      gameOver: false,
      numbTurns: 0,
    };
  }

  checkRow(squares, i){
    let row = Math.floor(i/3);

    return squares[3*row] === squares[3*row+1] && squares[3*row] === squares[3*row+2];
  }

  checkColumn(squares, i){
    let col = i % 3;

    return squares[col] === squares[col+3] && squares[col] === squares[col+6];
  }

  checkDiagonal(squares, i){
    if(i !== 4 && i !== 6 && i !== 2){
      return false;
    }

    return squares[4] === squares[2] && squares[4] === squares[6];
  }

  checkAnti(squares, i){
    if(i !== 4 && i !== 0 && i !== 8){
      return false;
    }

    return squares[4] === squares[0] && squares[4] === squares[8];
  }

  isWinner(squares, i){
    if(this.checkRow(squares, i)      || 
       this.checkColumn(squares, i)   || 
       this.checkDiagonal(squares, i) ||
       this.checkAnti(squares, i)){
      return true;
    }

    return false;
  }

  handleClick(i){
    const squares = this.state.squares.slice();
    squares[i] = players[turn];
    this.setState({squares: squares});
    this.setState({numbTurns: this.state.numbTurns + 1});
    
    if(this.isWinner(squares, i)){
      status = 'Winner: ' + players[turn];
      this.setState({gameOver: true});
    }
    else if(this.state.numbTurns === 8){
      status = 'Draw: No winners';
      this.setState({gameOver: true});
    }
    else{
      turn === 1 ? turn = 0 : turn++;
      status = "Current Player: " + players[turn];
    }
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]} 
        onClick={() => {
          if(!this.state.gameOver && !this.state.squares[i]){
            this.handleClick(i);
          }
        }}
      />
    );
  }

  render() {
    if(this.state.gameOver){
      if(window.confirm(status + "\nStart a new game?")){
        window.location.reload();
      }
    }

    return (
      <div>
      <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
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

