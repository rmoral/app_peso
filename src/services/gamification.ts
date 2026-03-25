import { ACHIEVEMENTS } from '../constants/achievements';
import { EXERCISE_ROUTINES } from '../constants/exercises';
import { AppState, DailyChallenge } from '../types';

export function checkNewAchievements(state: AppState): string[] {
  const newlyUnlocked: string[] = [];

  for (const achievement of ACHIEVEMENTS) {
    if (state.unlockedAchievements.includes(achievement.id)) continue;

    let unlocked = false;
    const cond = achievement.condition;

    switch (cond.type) {
      case 'streak':
        unlocked = state.profile.currentStreak >= cond.days;
        break;
      case 'workouts_completed':
        unlocked = state.workoutLog.length >= cond.count;
        break;
      case 'weight_entries':
        unlocked = state.weightEntries.length >= cond.count;
        break;
      case 'xp_total':
        unlocked = state.profile.currentXP >= cond.amount;
        break;
      case 'level_reached':
        unlocked = state.profile.currentLevel >= cond.level;
        break;
      case 'food_entries':
        unlocked = state.foodEntries.length >= cond.count;
        break;
    }

    if (unlocked) {
      newlyUnlocked.push(achievement.id);
    }
  }

  return newlyUnlocked;
}

export function generateDailyChallenge(dateStr: string): DailyChallenge {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);

  const challengeTemplates = [
    { title: 'Registra tu peso', description: 'Pésate hoy y registra tu peso en la app.', type: 'weight_log' as const },
    { title: 'Entrena hoy', description: 'Completa cualquier rutina de ejercicios.', type: 'workout' as const },
    { title: '¡Muévete!', description: 'Haz al menos una rutina de cardio hoy.', type: 'workout' as const },
    { title: 'Fuerza interior', description: 'Completa una rutina de fuerza hoy.', type: 'workout' as const },
    { title: 'Flexibilidad', description: 'Dedica tiempo a estirar con una rutina suave.', type: 'workout' as const },
    { title: 'Doble sesión', description: 'Completa dos entrenamientos hoy.', type: 'custom' as const },
    { title: 'Peso y ejercicio', description: 'Registra tu peso y completa un entrenamiento.', type: 'custom' as const },
    { title: 'Control nutricional', description: 'Registra todas las comidas del día.', type: 'custom' as const },
    { title: 'Come sano', description: 'Registra al menos 3 alimentos saludables hoy.', type: 'custom' as const },
  ];

  const template = challengeTemplates[absHash % challengeTemplates.length];
  const routineIndex = absHash % EXERCISE_ROUTINES.length;

  return {
    id: `challenge_${dateStr}`,
    date: dateStr,
    title: template.title,
    description: template.description,
    type: template.type,
    targetRoutineId: template.type === 'workout' ? EXERCISE_ROUTINES[routineIndex].id : undefined,
    xpReward: 25,
    completed: false,
  };
}

export function getTodayStr(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

export function updateStreak(lastActiveDate: string, currentStreak: number): { newStreak: number; isNewDay: boolean } {
  const today = getTodayStr();
  if (lastActiveDate === today) {
    return { newStreak: currentStreak, isNewDay: false };
  }

  const last = new Date(lastActiveDate);
  const now = new Date(today);
  const diffMs = now.getTime() - last.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return { newStreak: currentStreak + 1, isNewDay: true };
  }
  return { newStreak: 1, isNewDay: true };
}
