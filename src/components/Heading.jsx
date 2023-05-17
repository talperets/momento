import React from "react";

export default function Heading({ handleNewGame, wins }) {
  return (
    <header className="header">
      <h4>{wins}</h4>
      <h3>Memory Game</h3>
      <button onClick={handleNewGame}>New Game</button>
    </header>
  );
}
