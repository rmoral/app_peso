import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { HomeScreen } from '../screens/HomeScreen';
import { WeightScreen } from '../screens/WeightScreen';
import { ExerciseListScreen } from '../screens/ExerciseListScreen';
import { ExerciseDetailScreen } from '../screens/ExerciseDetailScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { FoodScreen } from '../screens/FoodScreen';

const Tab = createBottomTabNavigator();
const ExerciseStack = createNativeStackNavigator();

function ExerciseStackNavigator() {
  return (
    <ExerciseStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.background },
        headerTintColor: Colors.text,
        headerShadowVisible: false,
      }}
    >
      <ExerciseStack.Screen
        name="ExerciseList"
        component={ExerciseListScreen}
        options={{ headerShown: false }}
      />
      <ExerciseStack.Screen
        name="ExerciseDetail"
        component={ExerciseDetailScreen}
        options={{ title: 'Rutina', headerBackTitle: 'Volver' }}
      />
    </ExerciseStack.Navigator>
  );
}

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

export function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: IoniconsName = 'home';
          switch (route.name) {
            case 'Inicio': iconName = focused ? 'home' : 'home-outline'; break;
            case 'Peso': iconName = focused ? 'scale' : 'scale-outline'; break;
            case 'Comida': iconName = focused ? 'restaurant' : 'restaurant-outline'; break;
            case 'Ejercicio': iconName = focused ? 'barbell' : 'barbell-outline'; break;
            case 'Perfil': iconName = focused ? 'person' : 'person-outline'; break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          paddingBottom: 4,
          height: 56,
        },
        headerStyle: { backgroundColor: Colors.background },
        headerTintColor: Colors.text,
        headerShadowVisible: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Peso" component={WeightScreen} />
      <Tab.Screen name="Comida" component={FoodScreen} />
      <Tab.Screen name="Ejercicio" component={ExerciseStackNavigator} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
