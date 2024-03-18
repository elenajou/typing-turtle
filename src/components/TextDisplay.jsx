import { useState } from 'react';
import './TextDisplay.css';

export default function TextDisplay({ children, paragraph }) {

  function checkKey(letter) {
    const { state } = letter;
    return (state === true) ? "correct" : "incorrect";
  }

  return <p>
    {Array.from(paragraph).map((p, index)=> {
      return <span
        key={index}
        className={(children[`${index}`]) ? checkKey(children[`${index}`]) : ""}>
        {paragraph[index]}
      </span>;
    })}
  </p>;
}