
import Die from './Components/Die';
import React from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {

  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    if (areHeld() && haveTheSameValue()) {
      setTenzies(true);
    }
  }, [dice]);

  function areHeld (arr) {
    return dice.every(die => die.isHeld);
  }

  function haveTheSameValue (arr) {
    return dice.every((die) => die.value === dice[0].value);
  }

  function generateNewDie() {
    return {
        id:nanoid(),
        value:Math.floor(Math.random() * 6) + 1,
        isHeld:false
    }
  }

  function allNewDice() {
    const diceArr = [];   
    for (let i=1; i<=10; i++) {
      diceArr.push(generateNewDie());
    } 
    return diceArr;   
  }

  // function rollDice() {
  //   const diceArr = [];   
  //   for (let i=0; i<10; i++) {
  //     if (dice[i].isHeld) {
  //       diceArr.push(dice[i])
  //     } else {
  //       diceArr.push(generateNewDie());
  //     }    
  //   } 
  //   setDice(diceArr);
  // }

  function rollDice() {
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice())
    } else {
      setDice(prevDice => {
        return prevDice.map(die => {
          return die.isHeld ?
          die :
          generateNewDie()
        })
      })
    }

  }

  function holdDice(id) {    
    setDice((prevDice => {
      return prevDice.map((die) => {
        return die.id === id ?
          {...die, isHeld:!die.isHeld} :
          die;
      })
    }))
  }

  const diceElements = dice.map(({id,value,isHeld}) => ( 
    <Die 
      value={value} 
      key={id} 
      active={isHeld} 
      id={id} 
      holdDice={() => holdDice(id)}
    />
  ))

  return (
    <div className="app">
      <main>    
        { tenzies && <Confetti /> } 
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p> 
        <div className='dice-container'>
          {diceElements}
        </div>        
        <button className="roll-dice" onClick={rollDice}>{ tenzies ? "New game" : "Roll" }</button>
        {/* <button className="roll-dice" onClick={() => {setDice(allNewDice()); setTenzies(false)}}>New game</button> */}
      </main>       
    </div>
  );
}

export default App;
