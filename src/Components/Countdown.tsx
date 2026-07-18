import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';
import confetti from 'canvas-confetti';

export function Countdown(){
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    isBreakActive,
    startCountdown,
    resetCountdown,
    skipBreak
  } = useContext(CountdownContext)

  const { breakTaskCompleted, completeBreakTask } = useContext(ChallengesContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2,'0').split('');

  // Break cooldown tips
  const breakTips = [
    { title: "💧 Hidratação Contínua", desc: "Dica: Dê pequenos goles de água agora. Manter o cérebro hidratado evita dores de cabeça e fadiga mental." },
    { title: "🧘 Respiração Consciente", desc: "Dica: Respire fundo pelo nariz por 4s, segure por 4s e solte pela boca por 6s. Sinta a tensão sair dos ombros." },
    { title: "📐 Ajuste de Postura", desc: "Dica: Gire os ombros para trás 5 vezes. Mantenha os pés totalmente apoiados no chão e a coluna ereta." },
    { title: "👁️ Descanso Visual", desc: "Dica: Foque o olhar no ponto mais distante da sala ou olhe pela janela para relaxar o músculo dos olhos." },
    { title: "⚡ Circulação Ativa", desc: "Dica: Fique de pé e sacuda as pernas por alguns segundos. Isso ativa o retorno venoso e traz mais oxigênio ao cérebro." }
  ];

  // Pick a tip based on the current minutes/seconds to keep it deterministic but shifting
  const activeTip = breakTips[(minutes + seconds) % breakTips.length];

  function handleCompleteBreakTask() {
    completeBreakTask();
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.8 }
    });
  }

  return (
    <div>
      <div className={`${styles.countdownContainer} ${isBreakActive ? styles.countdownBreak : ''}`}>  
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

      {isBreakActive && (
        <div className={styles.cooldownCard}>
          <h4>{activeTip.title}</h4>
          <p>{activeTip.desc}</p>
          
          <button
            type="button"
            disabled={breakTaskCompleted}
            onClick={handleCompleteBreakTask}
            className={`${styles.breakTaskBtn} ${breakTaskCompleted ? styles.breakTaskDone : ''}`}
          >
            {breakTaskCompleted ? "✅ Atividade Concluída! (+15 XP)" : "🧘 Concluí a Atividade (+15 XP)"}
          </button>
        </div>
      )}

      {isBreakActive ? (
        <button 
          type="button" 
          className={`${styles.countdownButton} ${styles.countdownBreakButton}`}
          onClick={skipBreak}
        >
          Pular Pausa Ativa 🧘
        </button>
      ) : hasFinished ? (
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
              className={`${styles.countdownButton}`}
              onClick={startCountdown}
            >
              Iniciar um ciclo
              <img src="icons/play.svg" alt="check"/>
            </button>
          )}
        </>
      )}
    </div>
  );
}