import React, { useState, useEffect } from 'react';
import './App.css';

const TimerButton = () => {
  const [counter, setCounter] = useState(10);cd 
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer;
    if (isActive && counter > 0) {
      timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    } else if (counter === 0) {
      setIsActive(false);
    }

    return () => clearInterval(timer);
  }, [isActive, counter]);

  const handleStart = () => {
    setIsActive(true);
  };

  return (
    <div className="timer-container">
      {isActive && counter > 0 ? (
        <div>Time Remaining: {counter} seconds</div>
      ) : (
        !isActive && (
          <button onClick={handleStart} disabled={isActive}>
            Start Timer
          </button>
        )
      )}
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <h1>React Timer</h1>
      <TimerButton />
    </div>
  );
};

export default App;

