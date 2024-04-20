import React, { useState } from "react";
import Die from "./components/Die";

export default function App() {
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6));
    }
    return newDice;
  }

  const [dice, setDice] = useState(allNewDice());
  const diceElements = dice.map((die) => <Die value={die} />);

  function rollBtn() {
    setDice(allNewDice());
  }
  return (
    <main>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollBtn}>
        Roll
      </button>
    </main>
  );
}
