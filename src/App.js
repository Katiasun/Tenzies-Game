import React, { useState, useEffect } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  const diceElements = dice.map((die) => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  ));

  function rollBtn() {
    if (!tenzies) {
      setDice((prevRoll) =>
        prevRoll.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die))
    );
  }

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  // function checkWin() {
  //   const allHeld = dice.every((die) => die.isHeld);
  //   if (allHeld) {
  //     setTenzies(true);
  //   }
  // }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its current value between
        rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollBtn}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
