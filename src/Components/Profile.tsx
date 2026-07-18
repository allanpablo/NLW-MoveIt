import { useContext, useEffect, useState } from 'react';
import { ChallengesContext, ALL_BADGES } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile(){
    const { level, currentStreak, unlockedBadges, userName, userAvatar, userSector, logout } = useContext(ChallengesContext);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDark(true);
            document.body.classList.add('dark');
        }
    }, []);

    function handleToggleTheme() {
        if (isDark) {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDark(false);
        } else {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDark(true);
        }
    }

    const sectorName = userSector === 'ti' ? 'TI & Engenharia' 
                     : userSector === 'vendas' ? 'Vendas & Growth'
                     : userSector === 'rh' ? 'Recursos Humanos'
                     : userSector === 'financeiro' ? 'Financeiro'
                     : userSector === 'marketing' ? 'Marketing' : 'Geral';

    return(
        <div className={styles.profileArea}>
            <div className={styles.profileContainer}>
                <img src={userAvatar || "https://github.com/allanpablo.png"} alt={userName || "Usuário"}/>
                <div>
                    <div className={styles.nameRow}>
                        <strong>{userName || "Allan Pablo"}</strong>
                        <div className={styles.profileButtons}>
                            <button type="button" onClick={handleToggleTheme} className={styles.themeToggle}>
                                {isDark ? '☀️' : '🌙'}
                            </button>
                            <button type="button" onClick={logout} className={styles.logoutBtn} title="Sair da conta">
                                🚪
                            </button>
                        </div>
                    </div>
                    <p className={styles.sectorMeta}>
                      Setor: <span>{sectorName}</span>
                    </p>
                    <p>
                        <img src="icons/level.svg" alt="Level"/>
                        Level {level}
                    </p>
                    {currentStreak > 0 && (
                        <span className={styles.streakBadge}>
                            🔥 {currentStreak} {currentStreak === 1 ? 'Ciclo' : 'Ciclos'} Seguidos
                        </span>
                    )}
                </div>
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
                                title={`${badge.name}: ${badge.description}`}
                            >
                                <span className={styles.badgeIcon}>{badge.icon}</span>
                                <span className={styles.badgeName}>{badge.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}