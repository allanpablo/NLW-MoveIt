import { useContext } from "react";
import { ExperienceBar } from "../Components/ExperienceBar";
import { Profile } from "../Components/Profile";
import styles from "../styles/pages/Home.module.css"
import { CompletedChallenges } from "../Components/CompletedChallenges";
import { Countdown } from "../Components/Countdown";
import Head from 'next/head';
import { ChallengeBox } from "../Components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { GetServerSideProps } from 'next';
import { ChallengesProvider, ChallengesContext } from "../contexts/ChallengesContext";
import { Login } from "../Components/Login";
import { Leaderboard } from "../Components/Leaderboard";
import { Header } from "../Components/Header";
import { SettingsModal } from "../Components/SettingsModal";
import { SquadModal } from "../Components/SquadModal";
import { ActivityChart } from "../Components/ActivityChart";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  currentStreak: number;
  unlockedBadges: string;
  userName: string;
  userAvatar: string;
  userSector: string;
  userCompany: string;
  userEmail: string;
  isLoggedIn: boolean;
}

function HomeContent() {
  const { isLoggedIn, isSettingsModalOpen, isSquadModalOpen } = useContext(ChallengesContext);

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Início | Move.it</title>
      </Head>
      <Header />
      <ExperienceBar />
      <CountdownProvider>
        <main className={styles.dashboardGrid}>
          <div className={styles.leftColumn}>
            <Profile />
            <CompletedChallenges />
            <ActivityChart />
          </div>
          
          <div className={styles.centerColumn}>
            <ChallengeBox />
          </div>
          
          <div className={styles.rightColumn}>
            <Leaderboard />
            <Countdown />
          </div>
        </main>
      </CountdownProvider>

      {isSettingsModalOpen && <SettingsModal />}
      {isSquadModalOpen && <SquadModal />}
    </div>
  );
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
      currentStreak={props.currentStreak}
      unlockedBadges={props.unlockedBadges}
      userName={props.userName}
      userAvatar={props.userAvatar}
      userSector={props.userSector}
      userCompany={props.userCompany}
      userEmail={props.userEmail}
      isLoggedIn={props.isLoggedIn}
    >
      <HomeContent />
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 
    level, 
    currentExperience, 
    challengesCompleted, 
    currentStreak, 
    unlockedBadges,
    userName,
    userAvatar,
    userSector,
    userCompany,
    userEmail,
    isLoggedIn 
  } = ctx.req.cookies;

  return {
    props: {
      level: Number(level ?? 1),
      currentExperience: Number(currentExperience ?? 0),
      challengesCompleted: Number(challengesCompleted ?? 0),
      currentStreak: Number(currentStreak ?? 0),
      unlockedBadges: unlockedBadges ?? "[]",
      userName: userName ?? "",
      userAvatar: userAvatar ?? "",
      userSector: userSector ?? "",
      userCompany: userCompany ?? "",
      userEmail: userEmail ?? "",
      isLoggedIn: isLoggedIn === "true"
    }
  };
}