import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { Colors } from '../constants/colors';
import { useGamification } from '../hooks/useGamification';
import { useAppState } from '../context/AppContext';
import { xpProgressInLevel, LEVEL_TITLES } from '../constants/gamification';
import { ACHIEVEMENTS } from '../constants/achievements';
import { LevelBadge } from '../components/LevelBadge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { StatBox } from '../components/ui/StatBox';
import { Button } from '../components/ui/Button';

export function ProfileScreen() {
  const { state, dispatch } = useAppState();
  const { profile, unlockedAchievements } = useGamification();
  const xpProgress = xpProgressInLevel(profile.currentXP);
  const [editingName, setEditingName] = React.useState(false);
  const [nameInput, setNameInput] = React.useState(profile.name);
  const [editingTarget, setEditingTarget] = React.useState(false);
  const [targetInput, setTargetInput] = React.useState(String(profile.targetWeight));

  const handleSaveName = () => {
    if (nameInput.trim()) {
      dispatch({ type: 'UPDATE_PROFILE', payload: { name: nameInput.trim() } });
    }
    setEditingName(false);
  };

  const handleSaveTarget = () => {
    const w = parseFloat(targetInput);
    if (!isNaN(w) && w > 0) {
      dispatch({ type: 'UPDATE_PROFILE', payload: { targetWeight: w } });
    }
    setEditingTarget(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>
            {profile.name ? profile.name[0].toUpperCase() : '?'}
          </Text>
        </View>

        {editingName ? (
          <View style={styles.editRow}>
            <TextInput
              style={styles.editInput}
              value={nameInput}
              onChangeText={setNameInput}
              autoFocus
            />
            <Button title="Guardar" onPress={handleSaveName} small />
          </View>
        ) : (
          <Text style={styles.name} onPress={() => setEditingName(true)}>
            {profile.name || 'Tu nombre'} ✏️
          </Text>
        )}

        <LevelBadge level={profile.currentLevel} size={70} />
      </View>

      <Card>
        <Text style={styles.xpTitle}>Progreso de nivel</Text>
        <ProgressBar
          progress={xpProgress.current / xpProgress.needed}
          color={Colors.accent}
          height={12}
          label={`${xpProgress.current} / ${xpProgress.needed} XP para nivel ${profile.currentLevel + 1}`}
        />
        <Text style={styles.totalXP}>XP Total: {profile.currentXP}</Text>
      </Card>

      <View style={styles.statsRow}>
        <StatBox icon="🏋️" value={state.workoutLog.length} label="Entrenamientos" />
        <View style={{ width: 10 }} />
        <StatBox icon="🔥" value={profile.currentStreak} label="Racha actual" />
        <View style={{ width: 10 }} />
        <StatBox icon="⭐" value={profile.longestStreak} label="Mejor racha" />
      </View>

      <View style={styles.statsRow}>
        <StatBox icon="⚖️" value={state.weightEntries.length} label="Registros peso" />
        <View style={{ width: 10 }} />
        <StatBox icon="📅" value={profile.createdAt} label="Miembro desde" />
      </View>

      <Text style={styles.sectionTitle}>
        Logros ({unlockedAchievements.length}/{ACHIEVEMENTS.length})
      </Text>
      <View style={styles.badgeGrid}>
        {ACHIEVEMENTS.map(achievement => (
          <Badge
            key={achievement.id}
            icon={achievement.icon}
            name={achievement.name}
            unlocked={unlockedAchievements.includes(achievement.id)}
          />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Ajustes</Text>
      <Card>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Peso objetivo</Text>
          {editingTarget ? (
            <View style={styles.editRow}>
              <TextInput
                style={[styles.editInput, { width: 80 }]}
                value={targetInput}
                onChangeText={setTargetInput}
                keyboardType="decimal-pad"
                autoFocus
              />
              <Text style={styles.unit}>kg</Text>
              <Button title="OK" onPress={handleSaveTarget} small />
            </View>
          ) : (
            <Text style={styles.settingValue} onPress={() => setEditingTarget(true)}>
              {profile.targetWeight} kg ✏️
            </Text>
          )}
        </View>
      </Card>
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
  profileHeader: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.textLight,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  editInput: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    color: Colors.text,
  },
  xpTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  totalXP: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 6,
    textAlign: 'right',
  },
  statsRow: {
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 8,
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'flex-start',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 15,
    color: Colors.text,
  },
  settingValue: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: '600',
  },
  unit: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
