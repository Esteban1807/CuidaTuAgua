import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomesScreen from '../screens/homes/HomesScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';

export default function AppNavigator() {
  const { isAuthenticated, selectedHome } = useAuth();
  const [authView, setAuthView] = useState('login');

  // Temporal para probar
  // const isAuthenticated = true;

  if (!isAuthenticated) {
    if (authView === 'register') {
      return <RegisterScreen goToLogin={() => setAuthView('login')} />;
    }

    return <LoginScreen goToRegister={() => setAuthView('register')} />;
  }

  // if (!selectedHome) {
  //   return <HomesScreen />;
  // }

  return <DashboardScreen />;
  
}