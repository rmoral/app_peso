import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../constants/colors';
import { useGamification } from '../hooks/useGamification';
import { useWeightLog } from '../hooks/useWeightLog';
import { getDailyQuote } from '../constants/quotes';
import { xpProgressInLevel } from '../constants/gamification';
import { getTodayStr } from '../services/gamification';
import { StatBox } from '../components/ui/StatBox';
import { ProgressBar } from '../components/ui/ProgressBar';
import { QuoteCard } from '../components/QuoteCard';
import { DailyChallengeCard } from '../components/DailyChallengeCard';
import { LevelBadge } from '../components/LevelBadge';

export function HomeScreen() {
  const { profile, getTodayChallenge, completeDailyChallenge, markActive } = useGamification();
  const { getLatestWeight, getWeightChange, targetWeight } = useWeightLog();

  React.useEffect(() => {
    markActive();
  }, []);

  const today = getTodayStr();
  const quote = getDailyQuote(today);
  const challenge = getTodayChallenge();
  const xpProgress = xpProgressInLevel(profile.currentXP);
  const latestWeight = getLatestWeight();
  const weightChange = getWeightChange();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>{getGreeting()},</Text>
          <Text style={styles.name}>{profile.name || 'Atleta'}</Text>
        </View>
        <LevelBadge level={profile.currentLevel} size={50} />
      </View>

      <View style={styles.xpRow}>
        <Text style={styles.xpLabel}>
          {xpProgress.current} / {xpProgress.needed} XP
        </Text>
        <ProgressBar
          progress={xpProgress.current / xpProgress.needed}
          color={Colors.accent}
          height={8}
        />
      </View>

      <QuoteCard text={quote.text} author={quote.author} />

      <View style={styles.statsRow}>
        <StatBox icon="🔥" value={profile.currentStreak} label="Racha" />
        <View style={{ width: 10 }} />
        <StatBox
          icon="⚖️"
          value={latestWeight ? `${latestWeight}` : '--'}
          label="Último peso"
        />
        <View style={{ width: 10 }} />
        <StatBox
          icon="📉"
          value={
            weightChange !== null
              ? `${weightChange > 0 ? '+' : ''}${weightChange.toFixed(1)}`
              : '--'
          }
          label="Cambio"
        />
      </View>

      {latestWeight !== null && (
        <View style={styles.targetInfo}>
          <Text style={styles.targetText}>
            {Math.abs(latestWeight - targetWeight).toFixed(1)} kg para tu objetivo de {targetWeight} kg
          </Text>
        </View>
      )}

      <DailyChallengeCard challenge={challenge} onComplete={completeDailyChallenge} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.text,
  },
  xpRow: {
    gap: 4,
  },
  xpLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
  },
  targetInfo: {
    backgroundColor: Colors.primaryLight + '30',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  targetText: {
    fontSize: 14,
    color: Colors.primaryDark,
    fontWeight: '600',
  },
});
