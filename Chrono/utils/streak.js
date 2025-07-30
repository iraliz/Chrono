// Utilidad para manejar la racha (streak) usando localStorage en React Native (AsyncStorage)
import AsyncStorage from '@react-native-async-storage/async-storage';

const STREAK_KEY = 'USER_STREAK';

function formattedDate(date) {
  return date.toISOString().split('T')[0];
}

export async function getStreak() {
  const streakStr = await AsyncStorage.getItem(STREAK_KEY);
  return streakStr ? JSON.parse(streakStr) : null;
}

export async function updateStreak(streak) {
  await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(streak));
}

export async function calculateStreak() {
  const today = new Date();
  const todayStr = formattedDate(today);
  let streak = await getStreak();

  if (!streak) {
    streak = {
      currentCount: 1,
      lastLoginDate: todayStr,
      startDate: todayStr,
    };
    await updateStreak(streak);
    return streak;
  }

  if (streak.lastLoginDate === todayStr) {
    // Ya se contó hoy
    return streak;
  }

  const lastDate = new Date(streak.lastLoginDate);
  const diff = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

  if (diff === 1) {
    // Día consecutivo
    streak.currentCount += 1;
    streak.lastLoginDate = todayStr;
    await updateStreak(streak);
    return streak;
  } else if (diff > 1) {
    // Se perdió la racha
    streak = {
      currentCount: 1,
      lastLoginDate: todayStr,
      startDate: todayStr,
    };
    await updateStreak(streak);
    return streak;
  }

  // Si diff < 1, no hacer nada
  return streak;
}
