import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/ActivityChart.module.css";

export function ActivityChart() {
  const { weeklyHistory } = useContext(ChallengesContext);
  const currentDayOfWeek = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

  const labels = ["S", "T", "Q", "Q", "S", "S", "D"];
  const weekDays = labels.map((label, idx) => ({
    label,
    count: weeklyHistory[idx] || 0,
    isToday: idx === currentDayOfWeek
  }));

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
