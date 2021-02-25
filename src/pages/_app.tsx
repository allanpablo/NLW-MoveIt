import "../styles/global.css";
import { ChallengesProvider}  from '../contexts/ChallengesContext'
import { ChallengeBox } from "../Components/ChallengeBox";
function MyApp({ Component, pageProps }) {
  return ( 
  <ChallengesProvider>
    <Component {...pageProps} />
  </ChallengesProvider>
  )
}

export default MyApp;
