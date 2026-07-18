import { useState, useContext } from "react";
import { ChallengesContext, SECTORS, UserDbEntry } from "../contexts/ChallengesContext";
import styles from "../styles/components/Leaderboard.module.css";

type TabOption = "global" | "sectors" | "users";

export function Leaderboard() {
  const { 
    level, 
    currentExperience, 
    userSector, 
    userCompany, 
    userName, 
    userAvatar, 
    userEmail,
    getUsersDatabase 
  } = useContext(ChallengesContext);

  const [activeTab, setActiveTab] = useState<TabOption>("users");

  // Helper to calculate total XP based on level and current XP
  function getTotalXp(lvl: number, curXp: number) {
    let xp = curXp;
    for (let i = 1; i < lvl; i++) {
      xp += Math.pow((i + 1) * 4, 2);
    }
    return xp;
  }

  const currentUserXp = getTotalXp(level, currentExperience);

  // Read all users from local DB
  const rawUsers = getUsersDatabase();
  
  // Ensure the active user is represented in our list with their current fresh context stats
  const activeUserEntry: UserDbEntry = {
    email: userEmail || "guest@guest.com",
    name: userName || "Você",
    company: userCompany || "Geral",
    sector: userSector || "ti",
    level,
    currentExperience,
    challengesCompleted: 0,
    currentStreak: 0,
    unlockedBadges: [],
    avatar: userAvatar
  };

  const allUsersMap = new Map<string, UserDbEntry>();
  rawUsers.forEach(u => allUsersMap.set(u.email, u));
  if (userEmail) {
    allUsersMap.set(userEmail, activeUserEntry);
  } else {
    allUsersMap.set("guest@guest.com", activeUserEntry);
  }
  const allUsers = Array.from(allUsersMap.values());

  // 1. GLOBAL RANKING (Companies by Average XP)
  const companyGroups: { [key: string]: { totalXp: number; count: number } } = {};
  allUsers.forEach(u => {
    const xp = getTotalXp(u.level, u.currentExperience);
    if (!companyGroups[u.company]) {
      companyGroups[u.company] = { totalXp: 0, count: 0 };
    }
    companyGroups[u.company].totalXp += xp;
    companyGroups[u.company].count += 1;
  });

  const rankedCompanies = Object.keys(companyGroups).map(name => ({
    name,
    count: companyGroups[name].count,
    averageXp: Math.round(companyGroups[name].totalXp / companyGroups[name].count)
  })).sort((a, b) => b.averageXp - a.averageXp);

  // 2. SECTORS RANKING (Within user's company by Average XP)
  const targetCompany = userCompany || "Geral";
  const companyUsers = allUsers.filter(u => u.company === targetCompany);
  
  const sectorGroups: { [key: string]: { totalXp: number; count: number } } = {};
  companyUsers.forEach(u => {
    const xp = getTotalXp(u.level, u.currentExperience);
    if (!sectorGroups[u.sector]) {
      sectorGroups[u.sector] = { totalXp: 0, count: 0 };
    }
    sectorGroups[u.sector].totalXp += xp;
    sectorGroups[u.sector].count += 1;
  });

  // Ensure all defined sectors have a representation
  SECTORS.forEach(sec => {
    if (!sectorGroups[sec.id]) {
      sectorGroups[sec.id] = { totalXp: 0, count: 0 };
    }
  });

  const rankedSectors = Object.keys(sectorGroups).map(id => {
    const secInfo = SECTORS.find(s => s.id === id);
    const count = sectorGroups[id].count;
    const avg = count > 0 ? Math.round(sectorGroups[id].totalXp / count) : 0;
    return {
      id,
      name: secInfo?.name || id,
      count,
      averageXp: avg
    };
  }).sort((a, b) => b.averageXp - a.averageXp);

  // 3. COLLABORATORS RANKING (Within user's sector and company)
  const rankedUsers = companyUsers
    .filter(u => u.sector === userSector)
    .map(u => ({
      name: u.name,
      avatar: u.avatar,
      level: u.level,
      xp: getTotalXp(u.level, u.currentExperience),
      isCurrentUser: u.email === userEmail
    }))
    .sort((a, b) => b.xp - a.xp);

  return (
    <div className={styles.leaderboardContainer}>
      <div className={styles.header}>
        <h2>WorkRats Arena</h2>
        <div className={styles.tabSwitcher}>
          <button 
            onClick={() => setActiveTab("users")} 
            className={activeTab === "users" ? styles.activeTab : ""}
          >
            👥 Meu Time
          </button>
          <button 
            onClick={() => setActiveTab("sectors")} 
            className={activeTab === "sectors" ? styles.activeTab : ""}
          >
            🏢 Setores
          </button>
          <button 
            onClick={() => setActiveTab("global")} 
            className={activeTab === "global" ? styles.activeTab : ""}
          >
            🌍 Global
          </button>
        </div>
      </div>

      <div className={styles.tablesContainer}>
        {/* Render Users */}
        {activeTab === "users" && (
          <div className={styles.section}>
            <h3>Colaboradores em {SECTORS.find(s => s.id === userSector)?.name || "TI"}</h3>
            <div className={styles.rankList}>
              {rankedUsers.length > 0 ? rankedUsers.map((usr, index) => (
                <div 
                  key={usr.name} 
                  className={`${styles.rankItem} ${usr.isCurrentUser ? styles.activeItem : ''}`}
                >
                  <span className={styles.position}>{index + 1}º</span>
                  <img src={usr.avatar} alt={usr.name} className={styles.avatar} />
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{usr.name} {usr.isCurrentUser && "(Você)"}</span>
                    <span className={styles.itemMeta}>Lvl {usr.level}</span>
                  </div>
                  <span className={styles.itemValue}>{usr.xp} XP</span>
                </div>
              )) : <p className={styles.emptyMsg}>Nenhum usuário registrado neste setor.</p>}
            </div>
          </div>
        )}

        {/* Render Sectors */}
        {activeTab === "sectors" && (
          <div className={styles.section}>
            <h3>Ranking de Setores em {userCompany || "Sua Empresa"}</h3>
            <div className={styles.rankList}>
              {rankedSectors.map((sec, index) => {
                const isUserSec = sec.id === userSector;
                return (
                  <div 
                    key={sec.id} 
                    className={`${styles.rankItem} ${isUserSec ? styles.activeItem : ''}`}
                  >
                    <span className={styles.position}>{index + 1}º</span>
                    <div className={styles.itemInfo}>
                      <span className={styles.itemName}>{sec.name}</span>
                      <span className={styles.itemMeta}>{sec.count} colab.</span>
                    </div>
                    <span className={styles.itemValue}>{sec.averageXp} XP/avg</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Render Global Companies */}
        {activeTab === "global" && (
          <div className={styles.section}>
            <h3>Ranking Global de Empresas</h3>
            <div className={styles.rankList}>
              {rankedCompanies.map((comp, index) => {
                const isUserComp = comp.name === userCompany;
                return (
                  <div 
                    key={comp.name} 
                    className={`${styles.rankItem} ${isUserComp ? styles.activeItem : ''}`}
                  >
                    <span className={styles.position}>{index + 1}º</span>
                    <div className={styles.itemInfo}>
                      <span className={styles.itemName}>{comp.name}</span>
                      <span className={styles.itemMeta}>{comp.count} Rats cadastrados</span>
                    </div>
                    <span className={styles.itemValue}>{comp.averageXp} XP/avg</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
