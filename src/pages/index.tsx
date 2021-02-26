import { ExperienceBar } from "../Components/ExperienceBar";
import { Profile } from "../Components/Profile";
import styles from "../styles/pages/Home.module.css"
import { CompletedChallenges } from "../Components/CompletedChallenges";
import { Countdown } from "../Components/Countdown";
import Head from 'next/head';
import { ChallengeBox } from "../Components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import {GetServerSideProps} from 'next';
import { ChallengesProvider } from "../contexts/ChallengesContext";


interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props) {
  return (
    <ChallengesProvider
    level={props.level}
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}>
    
        <div className={styles.container}>
          <Head>
            <title>Início | Move.it</title>
          </Head>
          <ExperienceBar />
          <CountdownProvider>
            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
            </CountdownProvider>
        </div>
    </ChallengesProvider>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;

  return{
    props:{
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)

    }
  }

}