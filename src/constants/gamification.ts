export const XP_REWARDS = {
  LOG_WEIGHT: 10,
  WORKOUT_BEGINNER: 30,
  WORKOUT_INTERMEDIATE: 50,
  WORKOUT_ADVANCED: 80,
  DAILY_CHALLENGE: 25,
  STREAK_BONUS: 5,
  LOG_FOOD: 5,
};

export const LEVEL_TITLES: Record<number, string> = {
  1: 'Principiante',
  2: 'Iniciado',
  3: 'Comprometido',
  4: 'Constante',
  5: 'Dedicado',
  6: 'Atleta',
  7: 'Guerrero',
  8: 'Campeón',
  9: 'Leyenda',
  10: 'Maestro',
};

export function xpForLevel(level: number): number {
  return level * 100;
}

export function calculateLevel(totalXP: number): number {
  let level = 1;
  let xpNeeded = 0;
  while (true) {
    xpNeeded += xpForLevel(level);
    if (totalXP < xpNeeded) break;
    level++;
    if (level > 10) { level = 10; break; }
  }
  return level;
}

export function xpProgressInLevel(totalXP: number): { current: number; needed: number } {
  let level = 1;
  let accumulated = 0;
  while (true) {
    const needed = xpForLevel(level);
    if (totalXP < accumulated + needed || level >= 10) {
      return { current: totalXP - accumulated, needed };
    }
    accumulated += needed;
    level++;
  }
}
