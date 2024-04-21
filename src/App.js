import React, { useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function App() {
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }

  const [dice, setDice] = useState(allNewDice());
  const diceElements = dice.map((die) => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} />
  ));

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
