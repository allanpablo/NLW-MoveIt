import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';
import confetti from 'canvas-confetti';

function getExerciseGuide(title: string, description: string): string[] {
  const lower = title.toLowerCase();
  if (lower.includes('cervical') || lower.includes('pescoço')) {
    return [
      "1. Sente-se ereto com os ombros relaxados e braços soltos.",
      "2. Incline suavemente a cabeça lateralmente, aproximando a orelha do ombro.",
      "3. Use a mão do mesmo lado para aplicar uma leve pressão opcional.",
      "4. Respire fundo e mantenha a posição por 20 segundos de cada lado.",
      "⚠️ Dica: Não empurre com força e pare se sentir qualquer desconforto."
    ];
  }
  if (lower.includes('punho') || lower.includes('mão') || lower.includes('dedos') || lower.includes('antebraço')) {
    return [
      "1. Estique o braço para a frente com a palma da mão voltada para a frente.",
      "2. Com a outra mão, puxe suavemente os dedos para trás, alongando o antebraço.",
      "3. Mantenha os cotovelos alinhados e respire calmamente.",
      "4. Segure por 15 a 20 segundos e depois repita com a palma para baixo.",
      "⚠️ Dica: Evite tensionar os ombros enquanto alonga os braços."
    ];
  }
  if (lower.includes('ombro') || lower.includes('escápula')) {
    return [
      "1. Cruze um dos braços à frente do corpo na altura do peito.",
      "2. Com o outro braço, pressione o cotovelo contra o peito para alongar.",
      "3. Mantenha os ombros abaixados e gire levemente a cabeça para o lado oposto.",
      "4. Segure por 20 segundos e repita no lado oposto.",
      "⚠️ Dica: Mantenha a coluna perfeitamente alinhada durante o alongamento."
    ];
  }
  if (lower.includes('lombar') || lower.includes('costas') || lower.includes('tronco')) {
    return [
      "1. Sente-se na ponta da cadeira com os pés firmes no chão.",
      "2. Entrelace os dedos e empurre os braços para a frente, curvando as costas.",
      "3. Abaixe a cabeça entre os braços para alongar a região torácica e lombar.",
      "4. Mantenha a respiração lenta por 20 segundos.",
      "⚠️ Dica: Contraia levemente o abdômen para proteger a coluna."
    ];
  }
  if (lower.includes('olho') || lower.includes('visão') || lower.includes('piscar') || lower.includes('olhos')) {
    return [
      "1. Desvie o olhar da tela e foque em um objeto a mais de 6 metros de distância.",
      "2. Pisque os olhos lentamente 10 vezes para lubrificar as córneas.",
      "3. Feche as pálpebras firmemente por 3 segundos, relaxando em seguida.",
      "4. Faça movimentos circulares com os olhos para ambos os lados.",
      "⚠️ Dica: Repita este ciclo regularmente para evitar a fadiga visual digital."
    ];
  }
  return [
    "1. Afaste-se da mesa de trabalho e fique em uma postura ereta e confortável.",
    "2. Execute o movimento indicado de forma lenta e controlada.",
    "3. Mantenha uma respiração rítmica e profunda por toda a duração.",
    "4. Sustente a posição final por pelo menos 15 a 20 segundos.",
    "⚠️ Dica: O alongamento deve gerar sensação de alívio e nunca dor aguda."
  ];
}

export function ChallengeBox() {
    const { activeChallenge, resetChallenge, completeChallenge }  = useContext(ChallengesContext);
    const { startBreak, resetCountdown } = useContext(CountdownContext);

    function handleChallengeSucceded(){
        completeChallenge();
        startBreak();
        confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
        });
    }
    function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();
    }

    const steps = activeChallenge ? getExerciseGuide(activeChallenge.title || "", activeChallenge.description) : [];

    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className ={styles.challengeActive}>
                    <header>
                        Ganhe {activeChallenge.amount} xp
                    </header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="Ex. Olhos ou Corpo" className={styles.staticIcon} />
                        <strong>{activeChallenge.title || "Novo desafio"}</strong>
                        <p className={styles.descText}>{activeChallenge.description}</p>
                        
                        <div className={styles.guideContainer}>
                            <h4>Instruções Passo a Passo:</h4>
                            {steps.map((step, idx) => (
                                <p key={idx} className={styles.guideStep}>{step}</p>
                            ))}
                        </div>
                    </main>
                    <footer>
                        <button type="button" className={styles.challengeFailedButton}
                        onClick={handleChallengeFailed}>
                            Falhei
                            </button>
                        <button type="button" className={styles.challengeSuccededButton}
                        onClick={handleChallengeSucceded}>
                            Completei
                            </button>
                    </footer>
                </div>
            ) : (
                            <div className={styles.challengeNotActive}>
                            <strong>
                                Finalize um ciclo para receber um desafio
                            </strong>
                            <p>
                                <img src="icons/level-up.svg" alt="Level Up"/>
                                Avance de level completando desafios.
                            </p>
                        </div>
            )}
        </div>
    );
};