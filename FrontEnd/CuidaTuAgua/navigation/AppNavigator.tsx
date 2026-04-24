import React, { useState, useRef } from 'react';
import { Animated, Platform } from 'react-native';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import LandingScreen from '../screens/LandingScreen';

type Screen = 'landing' | 'login' | 'register' | 'dashboard';

export default function AppNavigator() {
  const [screen, setScreen] = useState<Screen>(
    Platform.OS === 'web' ? 'landing' : 'login'
  );

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;

  const navigate = (nextScreen: Screen) => {
    // animación de salida
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: -40,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // cambiar pantalla
      setScreen(nextScreen);

      // reset antes de entrar
      translateAnim.setValue(40);

      // animación de entrada
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(translateAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const renderScreen = () => {
    switch (screen) {
      case 'landing':
        return (
          <LandingScreen
            onAccess={() => navigate('login')}
          />
        )
      case 'register':
        return (
          <RegisterScreen
            goToLogin={() => navigate('login')}
          />
        );

      case 'dashboard':
        return (
          <DashboardScreen
            onLogout={() => navigate('login')}
          />
        );

      default:
        return (
          <LoginScreen
            goToRegister={() => navigate('register')}
            onLoginSuccess={() => navigate('dashboard')}
          />
        );
    }
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: fadeAnim,
        transform: [{ translateX: translateAnim }],
      }}
    >
      {renderScreen()}
    </Animated.View>
  );
}