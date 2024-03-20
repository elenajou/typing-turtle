import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => {
        return prevSeconds + 1;
      });
    }, 1000);
    return () => clearInterval(intervalId); // Cleanup function to clear the interval when the component unmounts
  },[]); // Empty dependency array ensures the effect runs only once

  return (
    <div className="Timer">
        <p>{Math.floor(seconds/60)}:{seconds%60}</p> : 
        <p>Total: {seconds} seconds</p>
    </div>
  );
};

export default Timer;
