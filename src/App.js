import React, { useState } from 'react';
import logo from './assets/typing-turtle-logo.png';
import './App.css';
import { PARAGRAPHS } from './data.js';
import TextDisplay from './components/TextDisplay.jsx';
import KeyboardListener from './components/KeyboardListener.jsx';

function App() {
  const [typedLetters, setTypedLetters] = useState([]);
  const [paragraph, setParagraphs] = useState(PARAGRAPHS[0])
  const length = paragraph.length;

  const handleKeyDown = (event) => {
    if (typedLetters.length >= length)
      return;
    const lastKey = typedLetters.length;
    const allowedCharacters = /^[a-zA-Z.,';:!? ]$/;
    if (allowedCharacters.test(event.key)) {
      const state = (paragraph[lastKey] === event.key) ? true : false;
      const newLetters = [
        ...typedLetters,
        {"key": lastKey, "value": event.key, "state": state}
      ];
      setTypedLetters(newLetters);
    } else if (event.key === 'Backspace' ){
      const removedLastLetter = typedLetters.slice(0, -1);
      setTypedLetters(removedLastLetter);
    }
  };

  function refresh(letters) {
    const currentParagraph = paragraph;
    let newParagraph = paragraph;
    while(currentParagraph === newParagraph) {
      const rand = Math.floor(Math.random() * (Object.keys(PARAGRAPHS).length));
      console.log(rand);
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
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <TextDisplay paragraph={paragraph}>{typedLetters}</TextDisplay>
      {(typedLetters.length >= length) && 
        <p>
          You have finished typing the quote.<br/> 
          Your score is {Math.floor(countCorrects()/paragraph.length*100)}%.<br/>
          You typed {countCorrects()}/{paragraph.length} correct letters.<br/>
        </p>}
      <KeyboardListener letters={typedLetters} onChange={handleKeyDown} onRefresh={refresh}/>
    </div>
  );
}

export default App;
