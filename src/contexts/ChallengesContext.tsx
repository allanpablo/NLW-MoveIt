import { createContext, useState, ReactNode, useEffect } from "react";
import challenges from '../../challenges.json';
import Cookies from 'js-cookie'
import { LevelUpModal } from "../Components/LevelUpModal";

interface Challenge {
    type: 'body' | 'eye' | 'hydration' | 'mind' | 'posture';
    title?: string;
    description: string;
    amount: number;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    tier: 'bronze' | 'silver' | 'gold' | 'diamond' | 'legend';
}

export interface SectorInfo {
  id: string;
  name: string;
  pomodoroTime: number;
}

export const SECTORS: SectorInfo[] = [
  { id: 'ti', name: 'TI & Engenharia', pomodoroTime: 25 },
  { id: 'vendas', name: 'Vendas & Growth', pomodoroTime: 20 },
  { id: 'rh', name: 'Recursos Humanos', pomodoroTime: 30 },
  { id: 'financeiro', name: 'Financeiro', pomodoroTime: 25 },
  { id: 'marketing', name: 'Marketing', pomodoroTime: 22 },
];

export interface UserDbEntry {
  email: string;
  password?: string;
  name: string;
  company: string;
  sector: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  currentStreak: number;
  unlockedBadges: string[];
  avatar: string;
  weekly_history?: number[];
  featured_badge_id?: string | null;
}

export const ALL_BADGES: Badge[] = [
    // Primeiro Passo (Bronze)
    { id: 'first_step', name: 'Primeiro Passo', description: 'Completou o primeiro desafio', icon: '🌱', tier: 'bronze' },

    // Veterano (Nível)
    { id: 'level_5', name: 'Veterano Bronze', description: 'Alcançou o nível 5', icon: '🥉', tier: 'bronze' },
    { id: 'level_10', name: 'Veterano Prata', description: 'Alcançou o nível 10', icon: '🥈', tier: 'silver' },
    { id: 'level_25', name: 'Veterano Ouro', description: 'Alcançou o nível 25', icon: '🥇', tier: 'gold' },
    { id: 'level_50', name: 'Veterano Diamante', description: 'Alcançou o nível 50', icon: '💎', tier: 'diamond' },
    { id: 'level_100', name: 'Veterano Lenda', description: 'Alcançou o nível 100', icon: '👑', tier: 'legend' },

    // Inabalável (Sequência)
    { id: 'streak_3', name: 'Inabalável Bronze', description: 'Alcançou sequência de 3 ciclos', icon: '🔥', tier: 'bronze' },
    { id: 'streak_5', name: 'Inabalável Prata', description: 'Alcançou sequência de 5 ciclos', icon: '⚡', tier: 'silver' },
    { id: 'streak_10', name: 'Inabalável Ouro', description: 'Alcançou sequência de 10 ciclos', icon: '💫', tier: 'gold' },
    { id: 'streak_20', name: 'Inabalável Diamante', description: 'Alcançou sequência de 20 ciclos', icon: '🔮', tier: 'diamond' },
    { id: 'streak_50', name: 'Inabalável Lenda', description: 'Alcançou sequência de 50 ciclos', icon: '🌌', tier: 'legend' },

    // Hidratado
    { id: 'hydration_3', name: 'Hidratado Bronze', description: 'Bebeu água 3 vezes', icon: '💧', tier: 'bronze' },
    { id: 'hydration_10', name: 'Hidratado Prata', description: 'Bebeu água 10 vezes', icon: '🥤', tier: 'silver' },
    { id: 'hydration_30', name: 'Hidratado Ouro', description: 'Bebeu água 30 vezes', icon: '🌊', tier: 'gold' },
    { id: 'hydration_100', name: 'Hidratado Diamante', description: 'Bebeu água 100 vezes', icon: '🏄', tier: 'diamond' },
    { id: 'hydration_300', name: 'Hidratado Lenda', description: 'Bebeu água 300 vezes', icon: '🐳', tier: 'legend' },

    // Coluna de Aço
    { id: 'posture_3', name: 'Coluna de Bronze', description: 'Ajustou a postura 3 vezes', icon: '📐', tier: 'bronze' },
    { id: 'posture_10', name: 'Coluna de Prata', description: 'Ajustou a postura 10 vezes', icon: '🤸', tier: 'silver' },
    { id: 'posture_30', name: 'Coluna de Ouro', description: 'Ajustou a postura 30 vezes', icon: '🧘', tier: 'gold' },
    { id: 'posture_100', name: 'Coluna de Diamante', description: 'Ajustou a postura 100 vezes', icon: '🛡️', tier: 'diamond' },
    { id: 'posture_300', name: 'Coluna Lendária', description: 'Ajustou a postura 300 vezes', icon: '🏯', tier: 'legend' },

    // Mente Serena
    { id: 'mind_3', name: 'Mental Bronze', description: 'Concluiu 3 relaxamentos', icon: '🧠', tier: 'bronze' },
    { id: 'mind_10', name: 'Mental Prata', description: 'Concluiu 10 relaxamentos', icon: '🍃', tier: 'silver' },
    { id: 'mind_30', name: 'Mental Ouro', description: 'Concluiu 30 relaxamentos', icon: '🌸', tier: 'gold' },
    { id: 'mind_100', name: 'Mental Diamante', description: 'Concluiu 100 relaxamentos', icon: '☀️', tier: 'diamond' },
    { id: 'mind_300', name: 'Mental Lendário', description: 'Concluiu 300 relaxamentos', icon: '🌌', tier: 'legend' },

    // Medalhas Exclusivas
    { id: 'forja_pioneiro', name: 'Pioneiro Forjador', description: 'Membro exclusivo da equipe ForjaJS', icon: '🛠️', tier: 'legend' },
    { id: 'coruja_noite', name: 'Coruja da Noite', description: 'Completou um desafio após às 22:00', icon: '🦉', tier: 'gold' },
    { id: 'dia_impecavel', name: 'Dia Impecável', description: 'Completou 8 ciclos em um único dia', icon: '☀️', tier: 'diamond' },
];

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    currentStreak: number;
    unlockedBadges: string[];
    userName: string;
    userAvatar: string;
    userSector: string;
    userCompany: string;
    userEmail: string;
    isLoggedIn: boolean;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
    signUp: (name: string, email: string, password: string, company: string, sector: string, avatar: string) => void;
    signIn: (email: string, password: string) => boolean;
    logout: () => void;
    getUsersDatabase: () => UserDbEntry[];
    breakTaskCompleted: boolean;
    completeBreakTask: () => void;
    isMuted: boolean;
    toggleMute: () => void;
    isSettingsModalOpen: boolean;
    openSettingsModal: () => void;
    closeSettingsModal: () => void;
    updatePassword: (newPass: string) => void;
    updateProfile: (name: string, company: string, sector: string, avatar: string) => void;
    isSquadModalOpen: boolean;
    openSquadModal: () => void;
    closeSquadModal: () => void;
    weeklyHistory: number[];
    featuredBadgeId: string | null;
    selectFeaturedBadge: (badgeId: string) => void;
    isArenaModalOpen: boolean;
    openArenaModal: () => void;
    closeArenaModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  currentStreak?: number;
  unlockedBadges?: string;
  userName?: string;
  userAvatar?: string;
  userSector?: string;
  userCompany?: string;
  userEmail?: string;
  isLoggedIn?: boolean;
  weeklyHistory?: string;
  featuredBadgeId?: string | null;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ 
  children, 
  ...rest }: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [currentStreak, setCurrentStreak] = useState(rest.currentStreak ?? 0);
  
  // User multi-tenant login states
  const [userName, setUserName] = useState(rest.userName ?? "");
  const [userAvatar, setUserAvatar] = useState(rest.userAvatar ?? "");
  const [userSector, setUserSector] = useState(rest.userSector ?? "ti");
  const [userCompany, setUserCompany] = useState(rest.userCompany ?? "");
  const [userEmail, setUserEmail] = useState(rest.userEmail ?? "");
  const [isLoggedIn, setIsLoggedIn] = useState(rest.isLoggedIn ?? false);
  
  const [isMuted, setIsMuted] = useState(false);
  const [dbUsers, setDbUsers] = useState<UserDbEntry[]>([]);
  
  const [weeklyHistory, setWeeklyHistory] = useState<number[]>(() => {
    try {
      return (rest as any).weeklyHistory ? JSON.parse((rest as any).weeklyHistory) : [0,0,0,0,0,0,0];
    } catch {
      return [0,0,0,0,0,0,0];
    }
  });

  const [featuredBadgeId, setFeaturedBadgeId] = useState<string | null>((rest as any).featuredBadgeId ?? null);

  function selectFeaturedBadge(badgeId: string) {
    if (unlockedBadges.includes(badgeId)) {
      setFeaturedBadgeId(badgeId);
    }
  }

  async function loadDbUsers() {
    try {
      const response = await fetch('/api/leaderboard');
      if (response.ok) {
        const data = await response.json();
        setDbUsers(data);
        return data;
      }
    } catch (e) {
      console.warn("Postgres database offline/unconfigured. Falling back to local storage.", e);
    }
    const local = getUsersDatabase();
    setDbUsers(local);
    return local;
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMute = localStorage.getItem("workrats:muted");
      if (savedMute === "true") {
        setIsMuted(true);
      }
    }
  }, []);

  function toggleMute() {
    setIsMuted(prev => {
      const newVal = !prev;
      localStorage.setItem("workrats:muted", String(newVal));
      return newVal;
    });
  }

  const [breakTaskCompleted, setBreakTaskCompleted] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSquadModalOpen, setIsSquadModalOpen] = useState(false);
  const [isArenaModalOpen, setIsArenaModalOpen] = useState(false);

  function openSettingsModal() {
    setIsSettingsModalOpen(true);
  }

  function closeSettingsModal() {
    setIsSettingsModalOpen(false);
  }

  function openSquadModal() {
    setIsSquadModalOpen(true);
  }

  function closeSquadModal() {
    setIsSquadModalOpen(false);
  }

  function openArenaModal() {
    setIsArenaModalOpen(true);
  }

  function closeArenaModal() {
    setIsArenaModalOpen(false);
  }

  function updatePassword(newPass: string) {
    if (!userEmail) return;
    const db = getUsersDatabase();
    const idx = db.findIndex(u => u.email === userEmail);
    if (idx >= 0) {
      db[idx].password = newPass;
      saveUsersDatabase(db);
    }

    // API Sync
    fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'change_password',
        email: userEmail,
        new_password: newPass
      })
    }).catch(() => {});
  }

  function updateProfile(name: string, company: string, sector: string, avatar: string) {
    const cleanName = name.trim();
    const cleanCompany = company.trim();
    const cleanSector = sector.trim();
    const cleanAvatar = avatar.trim();

    setUserName(cleanName);
    setUserCompany(cleanCompany);
    setUserSector(cleanSector);
    setUserAvatar(cleanAvatar);

    // API Sync
    fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update_profile',
        email: userEmail,
        name: cleanName,
        company: cleanCompany,
        sector: cleanSector,
        avatar: cleanAvatar
      })
    }).then(() => loadDbUsers()).catch(() => {});
  }

  function completeBreakTask() {
    if (breakTaskCompleted) return;
    setBreakTaskCompleted(true);
    
    let finalExperience = currentExperience + 15;
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    setCurrentExperience(finalExperience);
  }

  const initialBadges = () => {
    try {
      return rest.unlockedBadges ? JSON.parse(rest.unlockedBadges) : [];
    } catch {
      return [];
    }
  };
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(initialBadges);
  
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
    initializeMockUsers();
    loadDbUsers();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadDbUsers();
    }
  }, [isLoggedIn]);

  // Sync state to local user DB on change
  useEffect(() => {
    if (isLoggedIn && userEmail) {
      updateUserInDb();
    }
  }, [level, currentExperience, challengesCompleted, currentStreak, unlockedBadges, featuredBadgeId]);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
    Cookies.set('currentStreak', String(currentStreak));
    Cookies.set('unlockedBadges', JSON.stringify(unlockedBadges));
    Cookies.set('weeklyHistory', JSON.stringify(weeklyHistory));
    Cookies.set('featuredBadgeId', featuredBadgeId || "");
    
    Cookies.set('userName', userName);
    Cookies.set('userAvatar', userAvatar);
    Cookies.set('userSector', userSector);
    Cookies.set('userCompany', userCompany);
    Cookies.set('userEmail', userEmail);
    Cookies.set('isLoggedIn', String(isLoggedIn));
  }, [level, currentExperience, challengesCompleted, currentStreak, unlockedBadges, weeklyHistory, featuredBadgeId, userName, userAvatar, userSector, userCompany, userEmail, isLoggedIn]);

  function getUsersDatabase(): UserDbEntry[] {
    if (dbUsers && dbUsers.length > 0) return dbUsers;
    if (typeof window === "undefined") return [];
    const db = localStorage.getItem("workrats:users");
    return db ? JSON.parse(db) : [];
  }

  function saveUsersDatabase(db: UserDbEntry[]) {
    if (typeof window !== "undefined") {
      localStorage.setItem("workrats:users", JSON.stringify(db));
    }
  }

  function initializeMockUsers() {
    if (typeof window === "undefined") return;
    const db = getUsersDatabase();
    if (db.length === 0) {
      const mockUsers: UserDbEntry[] = [
        { email: "thiago@forja.com", name: "Thiago Oliveira", company: "ForjaJS", sector: "ti", level: 4, currentExperience: 100, challengesCompleted: 15, currentStreak: 3, unlockedBadges: ["first_step", "streak_3"], avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Thiago" },
        { email: "mariana@forja.com", name: "Mariana Silva", company: "ForjaJS", sector: "ti", level: 5, currentExperience: 250, challengesCompleted: 24, currentStreak: 5, unlockedBadges: ["first_step", "streak_5"], avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Mariana" },
        { email: "beatriz@forja.com", name: "Beatriz Costa", company: "ForjaJS", sector: "ti", level: 3, currentExperience: 80, challengesCompleted: 8, currentStreak: 2, unlockedBadges: ["first_step"], avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Beatriz" },
        { email: "pedro@vendas.com", name: "Pedro Santos", company: "ForjaJS", sector: "vendas", level: 4, currentExperience: 150, challengesCompleted: 14, currentStreak: 4, unlockedBadges: ["first_step"], avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Pedro" },
        { email: "camila@google.com", name: "Camila Rocha", company: "Google", sector: "ti", level: 6, currentExperience: 300, challengesCompleted: 35, currentStreak: 8, unlockedBadges: ["first_step", "streak_5", "level_5"], avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Camila" }
      ];
      saveUsersDatabase(mockUsers);
    }
  }

  function updateUserInDb() {
    const db = getUsersDatabase();
    const index = db.findIndex(u => u.email === userEmail);
    if (index >= 0) {
      db[index] = {
        ...db[index],
        level,
        currentExperience,
        challengesCompleted,
        currentStreak,
        unlockedBadges,
        avatar: userAvatar,
        name: userName,
        company: userCompany,
        sector: userSector,
        weekly_history: weeklyHistory,
        featured_badge_id: featuredBadgeId
      };
      saveUsersDatabase(db);
    }

    // Parallel API Sync
    fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update',
        email: userEmail,
        level,
        current_experience: currentExperience,
        challenges_completed: challengesCompleted,
        current_streak: currentStreak,
        unlocked_badges: unlockedBadges,
        weekly_history: weeklyHistory,
        featured_badge_id: featuredBadgeId
      })
    }).then(() => loadDbUsers()).catch(() => {});
  }

  function signUp(name: string, email: string, password: string, company: string, sector: string, avatar: string) {
    const cleanCompany = company.trim();
    const cleanSector = sector.trim();
    const finalAvatar = avatar.trim() || `https://api.dicebear.com/7.x/bottts/svg?seed=${name.trim()}`;

    // API Sync
    fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'signup',
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        company: cleanCompany,
        sector: cleanSector,
        avatar: finalAvatar
      })
    }).then(res => {
      if (res.ok) {
        loadDbUsers();
      }
    }).catch(() => {});

    const db = getUsersDatabase();
    const existing = db.find(u => u.email === email);
    if (existing) return;

    const newUser: UserDbEntry = {
      email: email.trim(),
      password: password.trim(),
      name: name.trim(),
      company: cleanCompany,
      sector: cleanSector,
      level: 1,
      currentExperience: 0,
      challengesCompleted: 0,
      currentStreak: 0,
      unlockedBadges: [],
      avatar: finalAvatar,
      weekly_history: [0,0,0,0,0,0,0],
      featured_badge_id: null
    };

    db.push(newUser);
    saveUsersDatabase(db);
    
    setUserName(newUser.name);
    setUserAvatar(newUser.avatar);
    setUserSector(newUser.sector);
    setUserCompany(newUser.company);
    setUserEmail(newUser.email);
    setLevel(1);
    setCurrentExperience(0);
    setChallengesCompleted(0);
    setCurrentStreak(0);
    setUnlockedBadges([]);
    setIsLoggedIn(true);
  }

  function signIn(email: string, password: string): boolean {
    const db = getUsersDatabase();
    const user = db.find(u => u.email === email && (!u.password || u.password === password));
    
    if (user) {
      setUserName(user.name);
      setUserAvatar(user.avatar);
      setUserSector(user.sector);
      setUserCompany(user.company);
      setUserEmail(user.email);
      setLevel(user.level);
      setCurrentExperience(user.currentExperience);
      setChallengesCompleted(user.challengesCompleted);
      setCurrentStreak(user.currentStreak);
      setUnlockedBadges(user.unlockedBadges || []);
      setFeaturedBadgeId(user.featured_badge_id || null);
      setIsLoggedIn(true);

      // Try syncing credentials from database
      fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'signin', email, password })
      }).then(async res => {
        if (res.ok) {
          const data = await res.json();
          const u = data.user;
          if (u) {
            setUserName(u.name);
            setUserAvatar(u.avatar);
            setUserSector(u.sector);
            setUserCompany(u.company);
            setLevel(u.level);
            setCurrentExperience(u.current_experience);
            setChallengesCompleted(u.challenges_completed);
            setCurrentStreak(u.current_streak);
            setUnlockedBadges(u.unlocked_badges || []);
            if (u.weekly_history) {
              setWeeklyHistory(u.weekly_history);
            }
            if (u.featured_badge_id) {
              setFeaturedBadgeId(u.featured_badge_id);
            }
          }
        }
      }).catch(() => {});

      return true;
    }
    return false;
  }

  function logout() {
    setUserName("");
    setUserAvatar("");
    setUserSector("ti");
    setUserCompany("");
    setUserEmail("");
    setIsLoggedIn(false);
    setLevel(1);
    setCurrentExperience(0);
    setChallengesCompleted(0);
    setCurrentStreak(0);
    setUnlockedBadges([]);
    setWeeklyHistory([0,0,0,0,0,0,0]);
    setFeaturedBadgeId(null);
    setActiveChallenge(null);
  }

  function levelUp() {
    const nextLevel = level + 1;
    setLevel(nextLevel);
    setIsLevelUpModalOpen(true);
    
    if (nextLevel >= 5 && !unlockedBadges.includes('level_5')) unlockBadge('level_5');
    if (nextLevel >= 10 && !unlockedBadges.includes('level_10')) unlockBadge('level_10');
    if (nextLevel >= 25 && !unlockedBadges.includes('level_25')) unlockBadge('level_25');
    if (nextLevel >= 50 && !unlockedBadges.includes('level_50')) unlockBadge('level_50');
    if (nextLevel >= 100 && !unlockedBadges.includes('level_100')) unlockBadge('level_100');
  }

  function closeLevelUpModal(){
    setIsLevelUpModalOpen(false);
  }

  function unlockBadge(badgeId: string) {
    if (!unlockedBadges.includes(badgeId)) {
      setUnlockedBadges(prev => [...prev, badgeId]);
      
      if (Notification.permission === 'granted') {
        const badge = ALL_BADGES.find(b => b.id === badgeId);
        if (badge) {
          new Notification('Medalha Desbloqueada! 🎖️', {
            body: `${badge.icon} ${badge.name}: ${badge.description}`,
            icon: '/icons/level-up.svg'
          });
        }
      }
    }
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length) ;
    const challenge = challenges[randomChallengeIndex] as Challenge;

    setActiveChallenge(challenge)

    if (!isMuted) {
      new Audio('/notification.mp3').play().catch(() => {});
    }

    if (Notification.permission === 'granted') {
      new Notification('Novo Desafio Laboral! 📣', {
        body: `Valendo ${challenge.amount} XP! Alongamento: ${challenge.description}`,
        icon: `/icons/level-up.svg`
      });
    }
  }

  function resetChallenge(){
      setActiveChallenge(null);
      setCurrentStreak(0);
      setBreakTaskCompleted(false);
  }

  function completeChallenge(){
    if(!activeChallenge){
      return;
    }
    const { amount, type } = activeChallenge;
    // Calculate streak boost: +5% XP per consecutive focus cycle completed
    const xpBoost = 1 + (currentStreak * 0.05);
    const experienceGained = Math.round(amount * xpBoost);
    
    let finalExperience = currentExperience + experienceGained;

    if (finalExperience >= experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setBreakTaskCompleted(false);
    const newCompletedCount = challengesCompleted + 1;
    setChallengesCompleted(newCompletedCount);
    
    const dayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
    const nextHistory = [...weeklyHistory];
    nextHistory[dayIndex] = (nextHistory[dayIndex] || 0) + 1;
    setWeeklyHistory(nextHistory);
    
    const newStreak = currentStreak + 1;
    setCurrentStreak(newStreak);

    // Track detailed type completions
    let newHydration = Number(localStorage.getItem("workrats:hydrationCount") || "0");
    let newPosture = Number(localStorage.getItem("workrats:postureCount") || "0");
    let newMind = Number(localStorage.getItem("workrats:mindCount") || "0");

    if (type === 'hydration') {
      newHydration += 1;
      localStorage.setItem("workrats:hydrationCount", String(newHydration));
    } else if (type === 'posture') {
      newPosture += 1;
      localStorage.setItem("workrats:postureCount", String(newPosture));
    } else if (type === 'mind') {
      newMind += 1;
      localStorage.setItem("workrats:mindCount", String(newMind));
    }

    const nextUnlocked = [...unlockedBadges];
    
    const checkBadge = (id: string) => {
      if (!nextUnlocked.includes(id)) {
        nextUnlocked.push(id);
        
        if (Notification.permission === 'granted') {
          const badge = ALL_BADGES.find(b => b.id === id);
          if (badge) {
            new Notification('Medalha Desbloqueada! 🎖️', {
              body: `${badge.icon} ${badge.name}: ${badge.description}`,
              icon: '/icons/level-up.svg'
            });
          }
        }
      }
    };

    // First Step
    if (newCompletedCount >= 1) checkBadge('first_step');

    // Streaks
    if (newStreak >= 3) checkBadge('streak_3');
    if (newStreak >= 5) checkBadge('streak_5');
    if (newStreak >= 10) checkBadge('streak_10');
    if (newStreak >= 20) checkBadge('streak_20');
    if (newStreak >= 50) checkBadge('streak_50');

    // Hydration
    if (newHydration >= 3) checkBadge('hydration_3');
    if (newHydration >= 10) checkBadge('hydration_10');
    if (newHydration >= 30) checkBadge('hydration_30');
    if (newHydration >= 100) checkBadge('hydration_100');
    if (newHydration >= 300) checkBadge('hydration_300');

    // Posture
    if (newPosture >= 3) checkBadge('posture_3');
    if (newPosture >= 10) checkBadge('posture_10');
    if (newPosture >= 30) checkBadge('posture_30');
    if (newPosture >= 100) checkBadge('posture_100');
    if (newPosture >= 300) checkBadge('posture_300');

    // Mind
    if (newMind >= 3) checkBadge('mind_3');
    if (newMind >= 10) checkBadge('mind_10');
    if (newMind >= 30) checkBadge('mind_30');
    if (newMind >= 100) checkBadge('mind_100');
    if (newMind >= 300) checkBadge('mind_300');

    // Exclusive - Coruja da Noite
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 5) {
      checkBadge('coruja_noite');
    }

    // Exclusive - Pioneiro Forjador
    if (userCompany && userCompany.trim().toLowerCase() === 'forjajs') {
      checkBadge('forja_pioneiro');
    }

    // Exclusive - Dia Impecável
    if (nextHistory[dayIndex] >= 8) {
      checkBadge('dia_impecavel');
    }

    setUnlockedBadges(nextUnlocked);
  }

  return (
    <ChallengesContext.Provider
      value={{ 
          level, 
          levelUp, 
          currentExperience, 
          challengesCompleted, 
          startNewChallenge, 
          activeChallenge, 
          resetChallenge,
          experienceToNextLevel,
          completeChallenge,
          closeLevelUpModal,
          currentStreak,
          unlockedBadges,
          userName,
          userAvatar,
          userSector,
          userCompany,
          userEmail,
          isLoggedIn,
          signUp,
          signIn,
          logout,
          getUsersDatabase,
          breakTaskCompleted,
          completeBreakTask,
          isMuted,
          toggleMute,
          isSettingsModalOpen,
          openSettingsModal,
          closeSettingsModal,
          updatePassword,
          updateProfile,
          isSquadModalOpen,
          openSquadModal,
          closeSquadModal,
          weeklyHistory,
          featuredBadgeId,
          selectFeaturedBadge,
          isArenaModalOpen,
          openArenaModal,
          closeArenaModal
        }}
    >
      {children}

      { isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
