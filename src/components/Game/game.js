import React, { useState } from "react";
import Board from "../Board/board.js";
import "./game.css";

function Game() {
  //Declare state of component
  const [history, setHistory] = useState([{
      squares: Array(9).fill(null),
      highlight: Array(9).fill(null),
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [sort, setSort] = useState(true);

  function renderMoves(historyInstance) {
    const moves = historyInstance.map((step, move) => {
      const moveHistory = getPosition(historyInstance, move);
      const desc = move ? "Go to move #" + move + moveHistory : "Go to game start";
      const classNameButton = move === stepNumber ? "buttonBold" : "";
      return (
        <li key={move}>
          <button className={classNameButton} onClick={() => jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });
    if (sort) return moves;
    return moves.reverse();
  }

  function handleClick(i) {
    const historyInstance = history.slice(0, stepNumber + 1);
    const current = historyInstance[historyInstance.length - 1];
    const squares = current.squares.slice();
    const highlight = current.highlight.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";
    if (calculateWinner(squares)) {
      calculateWinner(squares).forEach((element) => {
        highlight[element] = true;
      });
    }

    setHistory(
      historyInstance.concat([{
          squares: squares,
          highlight: highlight,
        },
      ])
    );
    setStepNumber(historyInstance.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  const historyInstance = history;
  const current = historyInstance[stepNumber];
  const winner = calculateWinner(current.squares);
  const moves = renderMoves(historyInstance);

  let status;
  if (winner) {
    status = "Winner:" + current.squares[winner[0]];
  } else if (checkFillFull(current.squares)) {
    status = "Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          highlight={current.highlight}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button className="toggle" onClick={() => { setSort(!sort); }}>
          {sort ? "Sort desc" : "Sort asc"}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
// ========================================

function checkFillFull(squares) {
  for (let i = 0; i < 9; i++) {
    if (!squares[i]) return false;
  }
  return true;
}

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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}

function getPosition(historyInstance, move) {
  if (move) {
    for (let i = 0; i < 9; i++) {
      if (historyInstance[move].squares[i] !==
          historyInstance[move - 1].squares[i]){
        return " (" + Math.floor(i / 3) + "," + (i % 3) + ")";
      }
    }
  }
  return "";
}
