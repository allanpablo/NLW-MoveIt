import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';



export function Countdown(){

  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown 
    } = useContext(CountdownContext)

  const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2,'0').split('');

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
        { hasFinished ? (
                    <button
                      disabled
                      type="button" 
                      className={`${styles.countdownButton}`}
                      >
                        Ciclo Encerrado
                        <img src="icons/check.svg" alt="check"/>
                    </button>
        ) : (
          <>
            {isActive ? (
              <button 
                type="button" 
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick={resetCountdown}
                >
                  Abandonar o ciclo
                  <img src="icons/stop.svg" alt="check"/>
              </button>
            ) : (
            <button 
              type="button" 
              className={`${styles.countdownButton} ${styles.countdownButton}`}
              onClick={startCountdown}
            >
              Iniciar um ciclo
              <img src="icons/play.svg" alt="check"/>
            </button>
            )}
          </>
        )
      }
    </div>
  );
}