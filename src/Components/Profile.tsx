import { useContext } from 'react';
import { ChallengesContext, ALL_BADGES } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile(){
    const { level, currentStreak, unlockedBadges, featuredBadgeId, selectFeaturedBadge } = useContext(ChallengesContext);

    const featuredBadge = featuredBadgeId ? ALL_BADGES.find(b => b.id === featuredBadgeId) : null;

    const families = [
      {
        key: 'level',
        badges: [
          { id: 'level_5', name: 'Veterano Bronze', description: 'Alcançou o nível 5', icon: '🥉', tier: 'bronze' },
          { id: 'level_10', name: 'Veterano Prata', description: 'Alcançou o nível 10', icon: '🥈', tier: 'silver' },
          { id: 'level_25', name: 'Veterano Ouro', description: 'Alcançou o nível 25', icon: '🥇', tier: 'gold' },
          { id: 'level_50', name: 'Veterano Diamante', description: 'Alcançou o nível 50', icon: '💎', tier: 'diamond' },
          { id: 'level_100', name: 'Veterano Lenda', description: 'Alcançou o nível 100', icon: '👑', tier: 'legend' },
        ]
      },
      {
        key: 'streak',
        badges: [
          { id: 'streak_3', name: 'Inabalável Bronze', description: 'Alcançou sequência de 3 ciclos', icon: '🔥', tier: 'bronze' },
          { id: 'streak_5', name: 'Inabalável Prata', description: 'Alcançou sequência de 5 ciclos', icon: '⚡', tier: 'silver' },
          { id: 'streak_10', name: 'Inabalável Ouro', description: 'Alcançou sequência de 10 ciclos', icon: '💫', tier: 'gold' },
          { id: 'streak_20', name: 'Inabalável Diamante', description: 'Alcançou sequência de 20 ciclos', icon: '🔮', tier: 'diamond' },
          { id: 'streak_50', name: 'Inabalável Lenda', description: 'Alcançou sequência de 50 ciclos', icon: '🌌', tier: 'legend' },
        ]
      },
      {
        key: 'hydration',
        badges: [
          { id: 'hydration_3', name: 'Hidratado Bronze', description: 'Bebeu água 3 vezes', icon: '💧', tier: 'bronze' },
          { id: 'hydration_10', name: 'Hidratado Prata', description: 'Bebeu água 10 vezes', icon: '🥤', tier: 'silver' },
          { id: 'hydration_30', name: 'Hidratado Ouro', description: 'Bebeu água 30 vezes', icon: '🌊', tier: 'gold' },
          { id: 'hydration_100', name: 'Hidratado Diamante', description: 'Bebeu água 100 vezes', icon: '🏄', tier: 'diamond' },
          { id: 'hydration_300', name: 'Hidratado Lenda', description: 'Bebeu água 300 vezes', icon: '🐳', tier: 'legend' },
        ]
      },
      {
        key: 'posture',
        badges: [
          { id: 'posture_3', name: 'Coluna de Bronze', description: 'Ajustou a postura 3 vezes', icon: '📐', tier: 'bronze' },
          { id: 'posture_10', name: 'Coluna de Prata', description: 'Ajustou a postura 10 vezes', icon: '🤸', tier: 'silver' },
          { id: 'posture_30', name: 'Coluna de Ouro', description: 'Ajustou a postura 30 vezes', icon: '🧘', tier: 'gold' },
          { id: 'posture_100', name: 'Coluna de Diamante', description: 'Ajustou a postura 100 vezes', icon: '🛡️', tier: 'diamond' },
          { id: 'posture_300', name: 'Coluna Lendária', description: 'Ajustou a postura 300 vezes', icon: '🏯', tier: 'legend' },
        ]
      },
      {
        key: 'mind',
        badges: [
          { id: 'mind_3', name: 'Mental Bronze', description: 'Concluiu 3 relaxamentos', icon: '🧠', tier: 'bronze' },
          { id: 'mind_10', name: 'Mental Prata', description: 'Concluiu 10 relaxamentos', icon: '🍃', tier: 'silver' },
          { id: 'mind_30', name: 'Mental Ouro', description: 'Concluiu 30 relaxamentos', icon: '🌸', tier: 'gold' },
          { id: 'mind_100', name: 'Mental Diamante', description: 'Concluiu 100 relaxamentos', icon: '☀️', tier: 'diamond' },
          { id: 'mind_300', name: 'Mental Lendário', description: 'Concluiu 300 relaxamentos', icon: '🌌', tier: 'legend' },
        ]
      }
    ];

    const exclusiveBadges = [
      { id: 'first_step', name: 'Primeiro Passo', description: 'Completou o primeiro desafio', icon: '🌱', tier: 'bronze' },
      { id: 'forja_pioneiro', name: 'Pioneiro Forjador', description: 'Membro exclusivo da equipe ForjaJS', icon: '🛠️', tier: 'legend' },
      { id: 'coruja_noite', name: 'Coruja da Noite', description: 'Completou um desafio após às 22:00', icon: '🦉', tier: 'gold' },
      { id: 'dia_impecavel', name: 'Dia Impecável', description: 'Completou 8 ciclos em um único dia', icon: '☀️', tier: 'diamond' },
    ];

    const badgesToDisplay = families.map(f => {
      const unlockedInFamily = f.badges.filter(b => unlockedBadges.includes(b.id));
      if (unlockedInFamily.length > 0) {
        return { ...unlockedInFamily[unlockedInFamily.length - 1], isUnlocked: true };
      }
      return { ...f.badges[0], isUnlocked: false };
    });

    const exclusives = exclusiveBadges.map(eb => ({
      ...eb,
      isUnlocked: unlockedBadges.includes(eb.id)
    }));

    const finalGridBadges = [...badgesToDisplay, ...exclusives];

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
                    {finalGridBadges.map(badge => {
                        const isUnlocked = badge.isUnlocked;
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