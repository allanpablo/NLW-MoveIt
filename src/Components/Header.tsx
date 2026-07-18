import { useContext, useEffect, useState } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Header.module.css";

export function Header() {
  const { userName, userAvatar, userCompany, userSector, logout, isMuted, toggleMute, openSettingsModal } = useContext(ChallengesContext);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.body.classList.add("dark");
    }
  }, []);

  function handleToggleTheme() {
    if (isDark) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  }

  const sectorName = userSector === 'ti' ? 'TI & Engenharia' 
                   : userSector === 'vendas' ? 'Vendas & Growth'
                   : userSector === 'rh' ? 'Recursos Humanos'
                   : userSector === 'financeiro' ? 'Financeiro'
                   : userSector === 'marketing' ? 'Marketing' : 'Geral';

  return (
    <header className={styles.headerContainer}>
      <div className={styles.logoArea}>
        <img src="/icons/level-up.svg" alt="WorkRats logo" />
        <span>WorkRats</span>
        <span className={styles.companyBadge}>
          {userCompany} • {sectorName}
        </span>
      </div>

      <div className={styles.profileActionArea}>
        <button 
          type="button" 
          onClick={handleToggleTheme} 
          className={styles.themeToggleBtn}
          title={isDark ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
        >
          {isDark ? "☀️" : "🌙"}
        </button>

        <button 
          type="button" 
          onClick={toggleMute} 
          className={styles.themeToggleBtn}
          title={isMuted ? "Ativar Som" : "Silenciar Notificações"}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>

        <button 
          type="button" 
          onClick={openSettingsModal} 
          className={styles.themeToggleBtn}
          title="Configurações da Conta"
        >
          ⚙️
        </button>

        <div className={styles.userDropdown}>
          <img src={userAvatar} alt={userName} className={styles.avatar} />
          <span className={styles.username}>{userName}</span>
        </div>

        <button 
          type="button" 
          onClick={logout} 
          className={styles.logoutButton}
          title="Sair da Conta"
        >
          🚪 Sair
        </button>
      </div>
    </header>
  );
}
