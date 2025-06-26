import { useEffect, useRef, useState } from "react";
import { VscDebugStart } from "react-icons/vsc";
import { FaPause } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import s from "./Pomodoro.module.css";

const TOTAL_TIME = 25 * 60;
// const TOTAL_TIME = 1 * 60;

export const Pomodoro = () => {
  const timerRef = useRef(null);
  const intervalRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const progress = (timeLeft / TOTAL_TIME) * 100;

  useEffect(() => {
    const timer = timerRef.current;
    if (timer) {
      timer.style.backgroundImage = `conic-gradient(
            rgb(245, 104, 69) 0%,
            rgb(130, 240, 67) ${progress}%,
            transparent ${progress}% 100%
          )`;
    }
  }, [progress]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStart = () => {
    if (!isRunning && timeLeft > 0) setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTimeLeft(TOTAL_TIME);
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Таймер Pomodoro</h1>
      <div className={s.progressCircle} ref={timerRef}>
        <div className={s.timer}>
          <span className={s.timeText}>{formatTime(timeLeft)}</span>
        </div>
      </div>
      <div className={s.buttons}>
        <button className={`${s.btn} ${s.start}`} onClick={handleStart}>
          <VscDebugStart /> Start
        </button>
        <button className={`${s.btn} ${s.pause}`} onClick={handlePause}>
          <FaPause /> Pause
        </button>
        <button className={`${s.btn} ${s.reset}`} onClick={handleReset}>
          <GrPowerReset /> Reset
        </button>
      </div>
    </div>
  );
};
