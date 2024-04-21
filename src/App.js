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
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  ));

  function rollBtn() {
    setDice(allNewDice());
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die))
    );
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
