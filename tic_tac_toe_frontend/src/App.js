import React, { useMemo, useState } from "react";
import "./App.css";

/**
 * Compute the winner for a given board state.
 * Returns 'X' | 'O' | null.
 */
function calculateWinner(squares) {
  const lines = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Cols
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    const value = squares[a];
    if (value && value === squares[b] && value === squares[c]) {
      return value;
    }
  }

  return null;
}

/**
 * Returns true if all squares are filled and there is no winner.
 */
function isDraw(squares, winner) {
  if (winner) return false;
  return squares.every((sq) => sq !== null);
}

// PUBLIC_INTERFACE
function App() {
  /** Board squares: (null | 'X' | 'O')[] */
  const [squares, setSquares] = useState(Array(9).fill(null));
  /** True => X's turn, False => O's turn */
  const [xIsNext, setXIsNext] = useState(true);

  const winner = useMemo(() => calculateWinner(squares), [squares]);
  const draw = useMemo(() => isDraw(squares, winner), [squares, winner]);

  const status = useMemo(() => {
    if (winner) return `Winner: ${winner}`;
    if (draw) return "Draw!";
    return `Current player: ${xIsNext ? "X" : "O"}`;
  }, [winner, draw, xIsNext]);

  // PUBLIC_INTERFACE
  const handleSquareClick = (index) => {
    // Ignore clicks after game ends or on filled square
    if (winner || draw || squares[index]) return;

    setSquares((prev) => {
      const next = prev.slice();
      next[index] = xIsNext ? "X" : "O";
      return next;
    });
    setXIsNext((prev) => !prev);
  };

  // PUBLIC_INTERFACE
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="App">
      <main className="page" aria-label="Tic Tac Toe">
        <section className="card">
          <header className="header">
            <div className="titleBlock">
              <h1 className="title">Tic Tac Toe</h1>
              <p className="subtitle">Local 2-player game (X vs O)</p>
            </div>
          </header>

          <div
            className={`status ${winner ? "status--winner" : ""} ${
              draw ? "status--draw" : ""
            }`}
            role="status"
            aria-live="polite"
          >
            <span className="statusDot" aria-hidden="true" />
            <span className="statusText">{status}</span>
          </div>

          <div className="boardWrap">
            <div className="board" role="grid" aria-label="Game board">
              {squares.map((value, idx) => {
                const isDisabled = Boolean(winner || draw || value);
                const ariaLabel = value
                  ? `Square ${idx + 1}, ${value}`
                  : `Square ${idx + 1}, empty`;
                return (
                  <button
                    key={idx}
                    type="button"
                    className={`square ${value ? "square--filled" : ""} ${
                      value === "X" ? "square--x" : ""
                    } ${value === "O" ? "square--o" : ""}`}
                    onClick={() => handleSquareClick(idx)}
                    disabled={isDisabled}
                    aria-label={ariaLabel}
                    role="gridcell"
                  >
                    <span className="squareValue" aria-hidden="true">
                      {value ?? ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <footer className="actions">
            <button type="button" className="btn btnPrimary" onClick={resetGame}>
              Restart
            </button>
            <div className="hint" aria-hidden="true">
              Tip: First to get 3 in a row wins.
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default App;
