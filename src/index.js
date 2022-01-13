/*
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

*/
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
let status = '';
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
      over: false,
//      turn: 0,
//      status: '',
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
//    row = Math.floor(i/3);
//    col = i % 3;
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
//    squares[i] = players[this.state.turn];
    squares[i] = players[turn];
    this.setState({squares: squares});
    
    if(this.isWinner(squares, i)){
      // this.setState({status: 'Winner: ' + players[this.state.turn]});
      status = 'Winner: ' + players[turn];
      this.setState({over: true});
    }
    else{
      turn === 1 ? turn = 0 : turn++;
    }
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]} 
        onClick={() => {
          if(!this.state.over && !this.state.squares[i]){
            this.handleClick(i);
          }
        }}
      />
    );
  }

  render() {
//    this.setState({status: 'Current player: ' + players[this.state.turn]});
    if(!this.state.over){
      status = 'Current player: ' + players[turn];
    }

    return (
      <div>
//        <div className="status">{this.state.status}</div>
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

