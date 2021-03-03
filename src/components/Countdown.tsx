import { useContext } from "react";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/Countdown.module.css";

export default function Countdown() {
  const {
    minutes,
    seconds,
    hasFineshed,
    isActive,
    startCountdown,
    resetCountdown,
  } = useContext(CountdownContext);
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");
  const currentTime = minutes * 60 + seconds;
  const timeLimit = 25 * 60;
  // const percentTime = Math.round((currentTime * 100) / (25 * 60));
  const percentTime = Math.round(((timeLimit - currentTime) * 100) / timeLimit);

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      {hasFineshed ? (
        <button
          disabled
          type="button"
          className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
        >
          Ciclo encerrado
          <div className={styles.progressBar}>
            <div
              style={{
                width: `$100%`,
              }}
            />
          </div>
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
              <div className={styles.progressBar}>
                <div
                  style={{
                    width: `${percentTime}%`,
                  }}
                />
              </div>
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
