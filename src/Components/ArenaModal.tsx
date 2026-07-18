import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import { Leaderboard } from "./Leaderboard";
import { ActivityChart } from "./ActivityChart";
import styles from "../styles/components/ArenaModal.module.css";

export function ArenaModal() {
  const { closeArenaModal } = useContext(ChallengesContext);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2>Arena & Estatísticas de Rendimento</h2>
          <p>Acompanhe o ranking da sua empresa e o seu histórico de ciclos</p>
        </header>

        <div className={styles.modalContent}>
          <div className={styles.chartSection}>
            <ActivityChart />
          </div>
          <div className={styles.leaderboardSection}>
            <Leaderboard />
          </div>
        </div>

        <button type="button" onClick={closeArenaModal} className={styles.closeBtn}>
          <img src="/icons/close.svg" alt="Fechar" />
        </button>
      </div>
    </div>
  );
}
