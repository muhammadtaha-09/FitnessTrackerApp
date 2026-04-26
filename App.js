import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';

import { ExerciseProvider } from './context/ExerciseContext';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';

import HomeScreen from './screens/HomeScreen';
import ExerciseDetailScreen from './screens/ExerciseDetailScreen';
import AddExerciseScreen from './screens/AddExerciseScreen';
import LoginScreen from './screens/LoginScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();

function Navigation() {
  const { isAuthenticated } = useContext(AuthContext);
  const { colors, isDarkMode } = useContext(ThemeContext);

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator 
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { 
            fontWeight: '700', 
            color: colors.text,
            fontSize: 17,
          },
          headerShadowVisible: false, 
          contentStyle: { backgroundColor: colors.background }
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }} 
          />
        ) : (
          <>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="ExerciseDetail" 
              component={ExerciseDetailScreen} 
              options={{ 
                title: 'Details', 
                headerTransparent: true, 
                headerTintColor: '#FFFFFF',
              }} 
            />
            <Stack.Screen 
              name="AddExercise" 
              component={AddExerciseScreen} 
              options={{ title: 'New Exercise' }} 
            />
            <Stack.Screen 
              name="Settings" 
              component={SettingsScreen} 
              options={{ title: 'Settings' }} 
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ExerciseProvider>
          <Navigation />
        </ExerciseProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
