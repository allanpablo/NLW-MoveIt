import { useContext } from 'react';
import { ChallengesContext, ALL_BADGES } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile(){
    const { level, currentStreak, unlockedBadges, featuredBadgeId, selectFeaturedBadge } = useContext(ChallengesContext);

    const featuredBadge = featuredBadgeId ? ALL_BADGES.find(b => b.id === featuredBadgeId) : null;

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
                            <span>Foco Ativo (+{currentStreak * 5}% XP)</span>
                            <strong>{currentStreak} {currentStreak === 1 ? 'Ciclo' : 'Ciclos'}</strong>
                        </div>
                    </div>
                )}

                {featuredBadge && (
                    <div className={`${styles.statItem} ${styles.featuredBadgeStat}`}>
                        <span className={styles.featuredBadgeIcon}>{featuredBadge.icon}</span>
                        <div>
                            <span>Medalha Destaque</span>
                            <strong>{featuredBadge.name}</strong>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.badgesContainer}>
                <h3>Conquistas</h3>
                <span className={styles.subtitleCabinet}>Clique em uma medalha desbloqueada para deixá-la em destaque</span>
                <div className={styles.badgesGrid}>
                    {ALL_BADGES.map(badge => {
                        const isUnlocked = unlockedBadges.includes(badge.id);
                        const isSelected = featuredBadgeId === badge.id;
                        return (
                            <div 
                                key={badge.id} 
                                onClick={() => isUnlocked && selectFeaturedBadge(badge.id)}
                                className={`${styles.badgeCard} ${isUnlocked ? styles.unlocked : styles.locked} ${styles[badge.tier]} ${isSelected ? styles.selectedFeatured : ""} ${isUnlocked ? styles.clickableBadge : ""}`}
                            >
                                <span className={styles.badgeIcon}>{badge.icon}</span>
                                <span className={styles.badgeName}>{badge.name}</span>
                                
                                <div className={styles.badgeTooltip}>
                                    <span className={`${styles.tierBadge} ${styles[badge.tier + 'Text']}`}>{badge.tier.toUpperCase()}</span>
                                    <strong>{badge.name}</strong>
                                    <p>{badge.description}</p>
                                    <span className={isUnlocked ? styles.tooltipUnlocked : styles.tooltipLocked}>
                                        {isUnlocked ? (isSelected ? "⭐ Em Destaque" : "👆 Clique para destacar") : "🔒 Bloqueada"}
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