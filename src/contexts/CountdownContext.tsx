import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext, SECTORS } from "./ChallengesContext";

interface CountdownContextData{
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps{
    children: ReactNode;
}

export const CountdownContext = createContext ({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({children}: CountdownProviderProps){
    const { startNewChallenge, userSector } = useContext(ChallengesContext);
    
    // Find sector time (default to 25 mins)
    const sectorInfo = SECTORS.find(s => s.id === userSector);
    const initialTime = sectorInfo ? sectorInfo.pomodoroTime * 60 : 25 * 60;
    
    const [time, setTime] = useState(initialTime);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
  
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    // Synchronize initial time if user changes sector when countdown is not active
    useEffect(() => {
        if (!isActive && !hasFinished) {
            setTime(initialTime);
        }
    }, [userSector, initialTime, isActive, hasFinished]);

    function startCountdown(){
        setIsActive(true);
      }
    
      function resetCountdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(initialTime);
        setHasFinished(false);
      } 
    
      useEffect(() => {
        if(isActive && time > 0 ) {
         countdownTimeout = setTimeout(( ) => {
            setTime(time - 1);
          }, 1000)
        } else if (isActive && time === 0) {
          setHasFinished(true);
          setIsActive(false);
          startNewChallenge();
        }
      }, [isActive, time, startNewChallenge])

    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    );
};
