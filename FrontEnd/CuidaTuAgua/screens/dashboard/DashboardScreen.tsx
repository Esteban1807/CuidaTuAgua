import React, { useState } from "react";

import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";

import { useTranslation } from "react-i18next";

import { styles } from "./DashboardScreen.styles";

type Props = {
  onLogout: () => void;
  onSettingsPress?: () => void;
  onProfilePress?: () => void;
  onResultsPress?: () => void;
};

const logo = require("../../assets/images/logo.png");

export default function DashboardScreen({
  onLogout,
  onSettingsPress,
  onProfilePress,
  onResultsPress,
}: Props) {

  const { t, i18n } = useTranslation("dashboard");

  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMobile =
    Dimensions.get("window").width < 768;

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (

    <SafeAreaView style={styles.mainContainer}>

      {/* =========================
          TOPBAR
      ========================== */}

      <View style={styles.topBar}>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={styles.profileTrigger}
          onPress={() => setDrawerOpen(!drawerOpen)}
        >

          <Text style={styles.userNameOriginal}>
            Diego Pérez
          </Text>

          <View style={styles.avatar}>

            <Text style={styles.avatarText}>
              D
            </Text>

          </View>

        </TouchableOpacity>

      </View>

      {/* =========================
          BODY
      ========================== */}

      <View style={styles.bodyContent}>

        {/* LOGO */}

        <View style={styles.logoSection}>

          <Image
            source={logo}
            style={styles.appLogo}
          />

          <Text style={styles.textLogo}>
            Cuida Tu Agua
          </Text>

          <Text style={styles.descriptionLogo}>
            {t("main.welcome")}
          </Text>

        </View>

        {/* CARD */}

        <View style={styles.cardsContainer}>

          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              onResultsPress?.();
            }}
          >

            <Text style={styles.cardTitle}>
              {t("main.monthlyConsumption")}
            </Text>

            <Text style={styles.cardValue}>
              120 {t("main.liters")}
            </Text>

          </TouchableOpacity>

        </View>

        {/* LOGOUT */}

        <TouchableOpacity
          onPress={onLogout}
          style={styles.logoutButton}
        >

          <Text style={styles.logoutButtonText}>
            {t("main.logout")}
          </Text>

        </TouchableOpacity>

      </View>

      {/* =========================
          SIDEBAR
      ========================== */}

      {drawerOpen && (

        <View
          style={[
            styles.customDrawer,

            {
              width: isMobile ? "75%" : 320,
            },
          ]}
        >

          {/* USER */}

          <View style={styles.expandedHeader}>

            <View style={styles.avatar}>

              <Text style={styles.avatarText}>
                D
              </Text>

            </View>

            <Text style={styles.userNameExpanded}>
              Diego Pérez
            </Text>

          </View>

          <View style={styles.separator} />

          {/* PROFILE */}

          <TouchableOpacity
            style={styles.option}
            onPress={() => {

              setDrawerOpen(false);

              onProfilePress?.();

            }}
          >

            <Text style={styles.optionText}>
              {t("drawer.profile")}
            </Text>

          </TouchableOpacity>

          {/* SETTINGS */}

          <TouchableOpacity
            style={styles.option}
            onPress={() => {

              setDrawerOpen(false);

              onSettingsPress?.();

            }}
          >

            <Text style={styles.optionText}>
              {t("drawer.settings")}
            </Text>

          </TouchableOpacity>

          {/* SPANISH */}

          <TouchableOpacity
            style={styles.option}
            onPress={() => changeLanguage("es")}
          >

            <Text style={styles.optionText}>
              Español
            </Text>

          </TouchableOpacity>

          {/* ENGLISH */}

          <TouchableOpacity
            style={styles.option}
            onPress={() => changeLanguage("en")}
          >

            <Text style={styles.optionText}>
              English
            </Text>

          </TouchableOpacity>

          {/* LOGOUT */}

          <TouchableOpacity
            style={styles.option}
            onPress={onLogout}
          >

            <Text style={styles.optionText}>
              {t("drawer.logout")}
            </Text>

          </TouchableOpacity>

        </View>

      )}

    </SafeAreaView>

  );

}