export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface UserProfile {
  name: string;
  targetWeight: number;
  currentXP: number;
  currentLevel: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  createdAt: string;
}

export interface WeightEntry {
  id: string;
  date: string;
  weight: number;
  note?: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  durationSeconds: number;
  restSeconds: number;
}

export interface ExerciseRoutine {
  id: string;
  name: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  exercises: Exercise[];
  xpReward: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: AchievementCondition;
}

export type AchievementCondition =
  | { type: 'streak'; days: number }
  | { type: 'workouts_completed'; count: number }
  | { type: 'weight_entries'; count: number }
  | { type: 'xp_total'; amount: number }
  | { type: 'level_reached'; level: number };

export interface DailyChallenge {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'workout' | 'weight_log' | 'custom';
  targetRoutineId?: string;
  xpReward: number;
  completed: boolean;
}

export interface WorkoutLogEntry {
  routineId: string;
  routineName: string;
  completedAt: string;
  durationSeconds: number;
  xpEarned: number;
}

export interface AppSettings {
  reminderEnabled: boolean;
  reminderHour: number;
  reminderMinute: number;
  weightUnit: 'kg' | 'lb';
}

export interface AppState {
  profile: UserProfile;
  weightEntries: WeightEntry[];
  workoutLog: WorkoutLogEntry[];
  unlockedAchievements: string[];
  dailyChallenges: DailyChallenge[];
  settings: AppSettings;
  onboarded: boolean;
}
