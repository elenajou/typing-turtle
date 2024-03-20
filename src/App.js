import React, { useState } from 'react';
import logo from './assets/typing-turtle-logo.png';
import './App.css';
import { PARAGRAPHS } from './data.js';
import TextDisplay from './components/TextDisplay.jsx';
import KeyboardListener from './components/KeyboardListener.jsx';
// import Timer from './components/Timer.jsx'

function App() {
  const [typedLetters, setTypedLetters] = useState([]);
  const [paragraph, setParagraphs] = useState(PARAGRAPHS[0])
  const [totalTime, setTotalTime] = useState(0);
  const length = paragraph.length;

  const handleKeyDown = (event) => {
    const lastKeyIndex = typedLetters.length;
    const allowedCharacters = /^[a-zA-Z.,';:!? ]$/;
    let state;
    let newLetters;

    if (lastKeyIndex >= length)
      return;
    (lastKeyIndex + 1 >= length) ? setTotalTime(0) : setTotalTime(totalTime);

    if (allowedCharacters.test(event.key)) {
      state = (paragraph[lastKeyIndex] === event.key) ? true : false;
      newLetters = [
        ...typedLetters,
        {"key": lastKeyIndex, "value": event.key, "state": state}
      ];
      setTypedLetters(newLetters);
    } else if (event.key === 'Backspace' ){
      newLetters = typedLetters.slice(0, -1);
      setTypedLetters(newLetters);
    }
  };

  function refresh(letters) {
    const currentParagraph = paragraph;
    let newParagraph = paragraph;
    let rand;

    while(currentParagraph === newParagraph) {
      rand = Math.floor(Math.random() * (Object.keys(PARAGRAPHS).length));
      newParagraph = PARAGRAPHS[rand];
      setParagraphs(newParagraph);
    }
    setTypedLetters(letters);
  }
  
  function countCorrects() {
    let corrects = 0;
    Object.values(typedLetters).map((letter) => {
      const { key, value, state } = letter;
      if (state === true) 
        corrects++;
    });
    return corrects;
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Typing Turtle</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <p className="introduction">
        Welcome to Typing Turtle, where you can sharpen your typing skills with challenging quotes. 
        Simply press the Start button to begin typing. 
      </p>
      <KeyboardListener letters={typedLetters} onChange={handleKeyDown} onRefresh={refresh}/>
      <p>Quote:</p>
      <TextDisplay paragraph={paragraph}>{typedLetters}</TextDisplay>
      {(typedLetters.length >= length) && 
        <p>
          You have finished typing the quote.<br/> 
          Your score is {Math.floor(countCorrects()/paragraph.length*100)}%.<br/>
          You typed {countCorrects()}/{paragraph.length} correct letters.<br/>
        </p>}
      <p className="hint">
        Hint: feel free to use the backspace button for any mistakes.
      </p>
    </div>
  );
}

export default App;
