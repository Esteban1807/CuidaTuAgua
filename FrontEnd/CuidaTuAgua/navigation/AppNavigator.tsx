import React, { useState, useRef } from "react";
import {
  Animated,
  Platform,
  StyleSheet,
  View,
} from "react-native";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

import DashboardScreen from "../screens/dashboard/DashboardScreen";

import LandingScreen from "../screens/LandingScreen";

import ProfileScreen from "../screens/dashboard/profile/ProfileScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import ResultsScreen from "../screens/dashboard/results/ResultsScreen";

import ThemeToggleButton from "../components/common/ThemeToggleButton";
import ThemeSelector from "../components/common/ThemeSelector";

import { useTheme } from "../theme/ThemeContext";

type Screen =
  | "landing"
  | "login"
  | "register"
  | "dashboard"
  | "profile"
  | "settings"
  | "results";

export default function AppNavigator() {

  const [screen, setScreen] = useState<Screen>(
    Platform.OS === "web"
      ? "landing"
      : "login",
  );

  const { colors } = useTheme();

  const fadeAnim =
    useRef(new Animated.Value(1)).current;

  const translateAnim =
    useRef(new Animated.Value(0)).current;

  const navigate = (next: Screen) => {

    Animated.parallel([

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true,
      }),

      Animated.timing(translateAnim, {
        toValue: -20,
        duration: 120,
        useNativeDriver: true,
      }),

    ]).start(() => {

      setScreen(next);

      translateAnim.setValue(20);

      Animated.parallel([

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),

        Animated.timing(translateAnim, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),

      ]).start();

    });

  };

  const showGlobalToggle =
    screen !== "landing";

  return (

    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [
            { translateX: translateAnim },
          ],
          backgroundColor: colors.background,
        },
      ]}
    >

      {/* LANDING */}

      {screen === "landing" && (

        <LandingScreen
          onAccess={() => navigate("login")}
        />

      )}

      {/* LOGIN */}

      {screen === "login" && (

        <LoginScreen
          goToRegister={() => navigate("register")}
          onLoginSuccess={() => navigate("dashboard")}
        />

      )}

      {/* REGISTER */}

      {screen === "register" && (

        <RegisterScreen
          goToLogin={() => navigate("login")}
        />

      )}

      {/* DASHBOARD */}

      {screen === "dashboard" && (

        <DashboardScreen

          onLogout={() => navigate("login")}

          onProfilePress={() => navigate("profile")}

          onSettingsPress={() => navigate("settings")}

          onResultsPress={() => navigate("results")}

        />

      )}

      {/* PROFILE */}

      {screen === "profile" && (

        <ProfileScreen
          onBack={() => navigate("dashboard")}
        />

      )}

      {/* SETTINGS */}

      {screen === "settings" && (

        <SettingsScreen
          onBack={() => navigate("dashboard")}
        />

      )}

      {/* RESULTS */}

      {screen === "results" && (

        <ResultsScreen
          onBack={() => navigate("dashboard")}
        />

      )}

      {/* THEME */}

      {showGlobalToggle && (

        <View style={styles.toggleWrapper}>



        </View>

      )}

    </Animated.View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  toggleWrapper: {
    position: "absolute",

    top: 16,
    right: 16,

    zIndex: 999,
  },

});