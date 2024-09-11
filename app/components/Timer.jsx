import { useState, useEffect } from "react";

export default function Timer() {
  const [time, setTime] = useState(300);

  useEffect(() => {
    if (time <= 0) return;

    const intervalID = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearInterval(intervalID);
  }, [time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="uiTimer">
      <span>Time Left:</span> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}
