import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/ActivityChart.module.css";

export function ActivityChart() {
  const { challengesCompleted } = useContext(ChallengesContext);

  // Mock activity for the last 6 days, with the 7th day (today) bound to actual challengesCompleted
  const weekDays = [
    { label: "S", count: 3 },
    { label: "T", count: 5 },
    { label: "Q", count: 2 },
    { label: "Q", count: 4 },
    { label: "S", count: 6 },
    { label: "S", count: 1 },
    { label: "D", count: challengesCompleted, isToday: true }
  ];

  // Find max count to scale the bars proportionally (minimum height is 15% for visual style)
  const maxCount = Math.max(...weekDays.map(d => d.count), 1);

  return (
    <div className={styles.chartContainer}>
      <h3>Rendimento Semanal (Ciclos)</h3>
      
      <div className={styles.barsRow}>
        {weekDays.map((day, idx) => {
          const heightPercent = Math.max((day.count / maxCount) * 100, 15);
          return (
            <div key={idx} className={styles.barColumn}>
              <div className={styles.barTrack}>
                <div 
                  className={`${styles.barFill} ${day.isToday ? styles.todayBar : ""}`}
                  style={{ height: `${heightPercent}%` }}
                >
                  <span className={styles.barTooltip}>{day.count} ciclos</span>
                </div>
              </div>
              <span className={`${styles.dayLabel} ${day.isToday ? styles.todayLabel : ""}`}>
                {day.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
