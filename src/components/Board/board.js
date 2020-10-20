import React from "react";
import Square from "../Square/square.js";
import "./board.css";

function Board(props) {
  function renderSquare(i) {
    return (
      <Square
        highlight={props.highlight[i]}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  }

  let board_game = [];
  for (let i = 0; i < 3; i++) {
    let board_row = [];
    for (let j = 0; j < 3; j++) {
      board_row.push(renderSquare(i * 3 + j));
    }
    board_game.push(<div className="board-row">{board_row}</div>);
  }

  return <div>{board_game}</div>;
}

export default Board;
