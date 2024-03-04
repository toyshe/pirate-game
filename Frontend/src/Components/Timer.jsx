import { useEffect, useState } from "react"

export default function Timer({timerCountdownSeconds, onTimeUp}){
    const [seconds, setSeconds] = useState(timerCountdownSeconds)
    const [isRunning, setIsRunning] = useState(true)

    useEffect(() => {
        let timerInterval;

        if (isRunning) {
          if (seconds === 0) {
            setIsRunning(false);
            if (onTimeUp) onTimeUp();
            return;
          }
          timerInterval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }, 1000);
        } else {
          clearInterval(timerInterval);
        }
    
        return () => clearInterval(timerInterval);
      }, [isRunning, seconds]);
    
      // No button handlers needed
    
      return (
        <div className="timer-container">
          <div className="timer-display">{seconds}</div>
        </div>
      );
    }