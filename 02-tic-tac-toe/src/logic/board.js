import { WINNER_COMBOS } from "../constants";

export const checkWinner = (boardTochek) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardTochek[a] &&
      boardTochek[a] === boardTochek[b] &&
      boardTochek[a] === boardTochek[c]
    ) {
      //Si no hay ganador
      return boardTochek[a];
    }
  }

  return null;
};

export const checkEndGame = (newBoard) => {
  //Revisamos si hay un emepate
  //Si no hay mas especios vacios en el tablero
  return newBoard.every((square) => square !== null);
};
