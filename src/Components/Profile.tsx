import { useContext } from 'react';
import { ChallengesContext, ALL_BADGES } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile(){
    const { level, currentStreak, unlockedBadges } = useContext(ChallengesContext);

    return(
        <div className={styles.profileArea}>
            <div className={styles.statsOverviewContainer}>
                <div className={styles.statItem}>
                    <img src="icons/level.svg" alt="Level" />
                    <div>
                        <span>Nível Atual</span>
                        <strong>Level {level}</strong>
                    </div>
                </div>

                {currentStreak > 0 && (
                    <div className={styles.statItem}>
                        <span className={styles.fireIcon}>🔥</span>
                        <div>
                            <span>Foco Ativo</span>
                            <strong>{currentStreak} {currentStreak === 1 ? 'Ciclo' : 'Ciclos'}</strong>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.badgesContainer}>
                <h3>Conquistas</h3>
                <div className={styles.badgesGrid}>
                    {ALL_BADGES.map(badge => {
                        const isUnlocked = unlockedBadges.includes(badge.id);
                        return (
                            <div 
                                key={badge.id} 
                                className={`${styles.badgeCard} ${isUnlocked ? styles.unlocked : styles.locked}`}
                            >
                                <span className={styles.badgeIcon}>{badge.icon}</span>
                                <span className={styles.badgeName}>{badge.name}</span>
                                
                                <div className={styles.badgeTooltip}>
                                    <strong>{badge.name}</strong>
                                    <p>{badge.description}</p>
                                    <span className={isUnlocked ? styles.tooltipUnlocked : styles.tooltipLocked}>
                                        {isUnlocked ? "✅ Desbloqueada" : "🔒 Bloqueada"}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}