# PesoFit - Contexto del Proyecto

> Resumen completo para continuar el desarrollo en un nuevo chat.

## Repositorio
- **GitHub**: `rmoral/app_peso`
- **Branch de desarrollo**: `claude/fitness-gamification-app-j3KMI`
- **Ruta local**: `/home/user/app_peso`

## Stack Tecnológico
- **Framework**: React Native con Expo SDK 55
- **Lenguaje**: TypeScript (strict mode)
- **Navegación**: React Navigation v7 (bottom tabs + native stack)
- **Estado**: React Context + useReducer con auto-persistencia
- **Almacenamiento**: AsyncStorage (todo local, sin backend)
- **Gráficos**: react-native-chart-kit + react-native-svg
- **Iconos**: @expo/vector-icons (Ionicons)

## Funcionalidades Implementadas

### 1. Control de Peso (`WeightScreen`)
- Registro diario de peso con gráfico de evolución (30 días)
- Línea de peso objetivo en el gráfico
- Historial con eliminación (long press)
- +10 XP por registro

### 2. Rutinas de Ejercicio (`ExerciseListScreen` + `ExerciseDetailScreen`)
- 9 rutinas organizadas por dificultad:
  - Principiante (3): Cuerpo Completo, Cardio Suave, Estiramientos
  - Intermedio (3): Fuerza, Core, Cardio Intenso
  - Avanzado (3): HIIT Total, Fuerza Avanzada, Tabata Extremo
- Timer con fases trabajo/descanso
- Controles: play, pausa, skip, reiniciar
- +30/50/80 XP según dificultad

### 3. Control de Alimentación (`FoodScreen`)
- Base de datos de 70 alimentos comunes españoles con info nutricional
- 4 comidas: Desayuno, Comida, Cena, Snack
- Contador de calorías vs objetivo diario (default 2000 kcal)
- Macros: proteínas, carbohidratos, grasas
- Búsqueda de alimentos + alimentos personalizados
- +5 XP por alimento registrado

### 4. Gamificación
- **XP**: 10 (peso), 5 (comida), 30-80 (ejercicio), 25 (reto), 5 (racha)
- **10 niveles**: Principiante → Maestro (XP necesario = nivel × 100)
- **19 logros**: rachas (3,7,14,30 días), entrenamientos (1,5,10,25,50), peso (1,7,30), comida (1,7,30), XP (500,1000), nivel (5,10)
- **Retos diarios**: generados determinísticamente por fecha
- **Rachas**: días consecutivos activos

### 5. Motivación
- 30 frases motivacionales en español (una diaria, determinística)
- Dashboard con estadísticas, reto del día, saludo personalizado

### 6. Onboarding
- Pantalla inicial pidiendo nombre y peso objetivo
- Se muestra solo la primera vez

## Estructura de Archivos

```
app_peso/
├── App.tsx                          # Entry point (providers + routing)
├── app.json                         # Expo config
├── eas.json                         # EAS Build config
├── package.json
├── assets/
│   ├── icon.png                     # 1024x1024 app icon
│   ├── splash-icon.png              # Splash screen
│   ├── adaptive-icon-*.png          # Android adaptive icons
│   ├── favicon.png                  # Web
│   └── store/                       # Store listing assets
│       ├── icon-512.png             # Google Play icon
│       ├── icon-1024.png            # Apple App Store icon
│       ├── feature-graphic.png      # Google Play banner
│       ├── screenshot-android-*.png # 5 screenshots (1080x1920)
│       ├── screenshot-iphone67-*.png # 5 screenshots (1290x2796)
│       └── screenshot-iphone55-*.png # 5 screenshots (1242x2208)
├── docs/
│   ├── privacy-policy.html          # Política de privacidad
│   ├── store-listing.md             # Textos para las tiendas
│   └── PROJECT-CONTEXT.md           # Este archivo
├── scripts/
│   └── generate-assets.js           # Regenerar iconos/assets
├── src/
│   ├── types/index.ts               # Todas las interfaces TS
│   ├── constants/
│   │   ├── colors.ts                # Tema verde/teal
│   │   ├── exercises.ts             # 9 rutinas (datos estáticos)
│   │   ├── achievements.ts          # 19 logros
│   │   ├── quotes.ts               # 30 frases motivacionales
│   │   ├── foods.ts                 # 70 alimentos comunes
│   │   └── gamification.ts          # XP, niveles, cálculos
│   ├── context/
│   │   └── AppContext.tsx           # Estado global + reducer + persistencia
│   ├── hooks/
│   │   ├── useWeightLog.ts          # CRUD peso + XP
│   │   ├── useFoodLog.ts            # CRUD alimentación + calorías + macros
│   │   ├── useGamification.ts       # XP, rachas, logros, retos
│   │   └── useExerciseTimer.ts      # Timer trabajo/descanso
│   ├── services/
│   │   ├── storage.ts              # AsyncStorage wrapper
│   │   └── gamification.ts         # Lógica pura: logros, retos, rachas
│   ├── navigation/
│   │   └── RootNavigator.tsx       # 5 tabs + exercise stack
│   ├── screens/
│   │   ├── OnboardingScreen.tsx
│   │   ├── HomeScreen.tsx          # Dashboard
│   │   ├── WeightScreen.tsx
│   │   ├── FoodScreen.tsx          # Control alimentación
│   │   ├── ExerciseListScreen.tsx
│   │   ├── ExerciseDetailScreen.tsx
│   │   └── ProfileScreen.tsx       # Perfil, logros, ajustes
│   └── components/
│       ├── ui/Card.tsx, Button.tsx, ProgressBar.tsx, StatBox.tsx, Badge.tsx
│       ├── WeightChart.tsx
│       ├── ExerciseTimer.tsx
│       ├── DailyChallengeCard.tsx
│       ├── QuoteCard.tsx
│       └── LevelBadge.tsx
```

## Modelo de Datos (AppState)

```typescript
interface AppState {
  profile: {
    name, targetWeight, currentXP, currentLevel,
    currentStreak, longestStreak, lastActiveDate, createdAt
  };
  weightEntries: WeightEntry[];     // {id, date, weight, note?}
  foodEntries: FoodEntry[];         // {id, date, mealType, food: FoodItem, quantity}
  workoutLog: WorkoutLogEntry[];    // {routineId, routineName, completedAt, duration, xpEarned}
  unlockedAchievements: string[];
  dailyChallenges: DailyChallenge[];
  settings: {
    reminderEnabled, reminderHour, reminderMinute,
    weightUnit: 'kg'|'lb', dailyCalorieGoal
  };
  onboarded: boolean;
}
```

## Estado de Publicación

### Ya hecho
- [x] App completa y funcional
- [x] TypeScript compila sin errores
- [x] Iconos de la app (1024x1024, adaptive Android, splash)
- [x] Assets para Google Play (icon 512, feature graphic, 5 screenshots)
- [x] Assets para Apple App Store (icon 1024, screenshots 6.7" y 5.5")
- [x] eas.json configurado
- [x] Política de privacidad (docs/privacy-policy.html)
- [x] Textos de ficha (docs/store-listing.md)
- [x] Código pusheado en GitHub

### Pendiente para publicar
- [ ] Crear cuenta Google Play Console (25$ único)
- [ ] Crear cuenta Apple Developer Program (99$/año)
- [ ] Configurar eas.json con credenciales reales (Apple ID, Team ID, Google service account)
- [ ] Alojar política de privacidad en URL pública (GitHub Pages, Netlify, etc.)
- [ ] Ejecutar `eas build --platform android --profile production`
- [ ] Ejecutar `eas build --platform ios --profile production`
- [ ] Subir builds a las tiendas (`eas submit` o manualmente)
- [ ] Fijar precio en Google Play Console y App Store Connect
- [ ] Completar cuestionario de clasificación de contenido
- [ ] Completar ficha de seguridad de datos (Google Play)
- [ ] Reemplazar screenshots placeholder por capturas reales de la app
- [ ] Reemplazar `[TU_EMAIL_DE_CONTACTO]` en la política de privacidad
- [ ] Testing en dispositivos reales antes del envío

### Posibles mejoras futuras
- Notificaciones push (recordatorios diarios)
- Historial de calorías por día/semana con gráficos
- Exportar/importar datos (backup)
- Modo oscuro
- Sincronización en la nube
- Más rutinas de ejercicio
- Integración con Apple Health / Google Fit
- Suscripción mensual con contenido premium (alternativa al pago único)

## Comandos Útiles

```bash
# Desarrollo
npx expo start              # Iniciar dev server
npx expo start --web        # Probar en navegador

# Builds
eas build --platform android --profile production
eas build --platform ios --profile production

# Publicar
eas submit --platform android
eas submit --platform ios

# Regenerar assets
node scripts/generate-assets.js

# TypeScript check
npx tsc --noEmit
```
