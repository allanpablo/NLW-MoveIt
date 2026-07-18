import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext, SECTORS } from "./ChallengesContext";

interface CountdownContextData{
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    isBreakActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
    startBreak: () => void;
    skipBreak: () => void;
}

interface CountdownProviderProps{
    children: ReactNode;
}

export const CountdownContext = createContext ({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({children}: CountdownProviderProps){
    const { startNewChallenge, userSector, completeChallenge, resetChallenge } = useContext(ChallengesContext);
    
    // Find sector time (default to 25 mins)
    const sectorInfo = SECTORS.find(s => s.id === userSector);
    const workTime = sectorInfo ? sectorInfo.pomodoroTime * 60 : 25 * 60;
    const breakTime = 5 * 60; // 5 minutes break
    
    const [time, setTime] = useState(workTime);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    const [isBreakActive, setIsBreakActive] = useState(false);
  
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    // Synchronize initial time if user changes sector when countdown is not active
    useEffect(() => {
        if (!isActive && !hasFinished && !isBreakActive) {
            setTime(workTime);
        }
    }, [userSector, workTime, isActive, hasFinished, isBreakActive]);

    function startCountdown(){
        setIsActive(true);
    }
    
    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setIsBreakActive(false);
        setTime(workTime);
    } 

    function startBreak() {
        clearTimeout(countdownTimeout);
        setIsActive(true);
        setHasFinished(false);
        setIsBreakActive(true);
        setTime(breakTime);
    }

    function skipBreak() {
        resetCountdown();
    }
    
    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
            setIsActive(false);
            if (!isBreakActive) {
                // Work finished, open challenge
                setHasFinished(true);
                startNewChallenge();
            } else {
                // Break finished, return to work
                setIsBreakActive(false);
                setTime(workTime);
                new Audio('/notification.mp3').play();
                if (Notification.permission === 'granted') {
                    new Notification('Pausa Encerrada! 🚀', {
                        body: 'Hora de voltar ao foco! Inicie um novo ciclo.'
                    });
                }
            }
        }
    }, [isActive, time, isBreakActive, workTime, startNewChallenge])

    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            isBreakActive,
            startCountdown,
            resetCountdown,
            startBreak,
            skipBreak
        }}>
            {children}
        </CountdownContext.Provider>
    );
};
