import { useContext } from "react";
import { ChallengesContext, ALL_BADGES } from "../contexts/ChallengesContext";
import styles from "../styles/components/SquadModal.module.css";

export function SquadModal() {
  const { 
    userCompany, 
    userSector, 
    getUsersDatabase, 
    closeSquadModal 
  } = useContext(ChallengesContext);

  const db = getUsersDatabase();
  
  // Filter users belonging to the same company and sector
  const squadTeammates = db
    .filter(u => u.company === userCompany && u.sector === userSector)
    .sort((a, b) => {
      if (b.level !== a.level) return b.level - a.level;
      return b.currentExperience - a.currentExperience;
    });

  const sectorName = userSector === 'ti' ? 'TI & Engenharia' 
                   : userSector === 'vendas' ? 'Vendas & Growth'
                   : userSector === 'rh' ? 'Recursos Humanos'
                   : userSector === 'financeiro' ? 'Financeiro'
                   : userSector === 'marketing' ? 'Marketing' : userSector;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>
          <h2>Membros do Squad</h2>
          <span className={styles.squadSubtitle}>{userCompany} • {sectorName}</span>
        </header>

        <div className={styles.teammatesList}>
          {squadTeammates.length === 0 ? (
            <p className={styles.emptyMsg}>Nenhum colega de equipe encontrado neste setor.</p>
          ) : (
            squadTeammates.map((mate, idx) => {
              // Find the last unlocked badge if any
              const lastBadgeId = mate.unlockedBadges && mate.unlockedBadges.length > 0 
                ? mate.unlockedBadges[mate.unlockedBadges.length - 1] 
                : null;
              const lastBadge = lastBadgeId ? ALL_BADGES.find(b => b.id === lastBadgeId) : null;

              return (
                <div key={mate.email} className={styles.teammateRow}>
                  <div className={styles.rankNumber}>#{idx + 1}</div>
                  
                  <img src={mate.avatar || "https://github.com/allanpablo.png"} alt={mate.name} className={styles.avatar} />
                  
                  <div className={styles.mainInfo}>
                    <strong>{mate.name}</strong>
                    <span>Level {mate.level}</span>
                  </div>

                  <div className={styles.statsCol}>
                    <div className={styles.statLine}>
                      <span>Ciclos:</span>
                      <strong>{mate.challengesCompleted}</strong>
                    </div>
                    {mate.currentStreak > 0 && (
                      <div className={styles.statLine}>
                        <span>Sequência:</span>
                        <strong className={styles.streakText}>🔥 {mate.currentStreak}</strong>
                      </div>
                    )}
                  </div>

                  <div className={styles.badgeCol}>
                    {lastBadge ? (
                      <div className={styles.badgeWrap} title={`${lastBadge.name}: ${lastBadge.description}`}>
                        <span className={styles.badgeIcon}>{lastBadge.icon}</span>
                        <span className={styles.badgeName}>{lastBadge.name}</span>
                      </div>
                    ) : (
                      <span className={styles.noBadges}>Sem conquistas</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <button type="button" onClick={closeSquadModal} className={styles.closeBtn}>
          <img src="/icons/close.svg" alt="Fechar" />
        </button>
      </div>
    </div>
  );
}
