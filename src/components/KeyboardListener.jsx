import { useState } from 'react';
export default function KeyboardListener({ letters, onChange, onRefresh }) {
  const [ buttonColor, setButtonColor] = useState("");

  function changeBtnColor(className) {
    setButtonColor(className);
  }

  function refreshTest() {
    const emptyLetters = [];
    onRefresh(emptyLetters);
    changeBtnColor("");
  }

  return <>
    <button className={buttonColor}
      onKeyDown={onChange} 
      tabIndex={0} 
      onClick={()=> changeBtnColor("button-pressed")}>
        Start
    </button>
    <button onClick={refreshTest}>Refresh</button>
  </>;
}