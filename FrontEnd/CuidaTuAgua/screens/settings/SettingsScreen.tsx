// SettingsScreen.tsx

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  Home,
  Bell,
  Settings,
  ChevronDown,
} from 'lucide-react-native';

import { useResponsive } from '../../hooks/useResponsive';
import { useTheme } from '../../theme';
import LanguageSelector from '../../components/common/LenguageSelector';

import { createStyles } from './SettingsScreen.styles';

type Props = {
  onBack: () => void;
};

const SettingsScreen = (onBack: Props) => {

  const { isMobile } = useResponsive();

  const { colors, mode, themeType, setThemeMode, setThemeType } = useTheme();

  const { t, i18n } = useTranslation('settings');

  const styles = createStyles(colors, isMobile);

  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);


  const handleThemeChange = (newMode: 'light' | 'dark') => {
    setThemeMode(newMode);
  };

  const handleThemeTypeChange = (newType: 'standard' | 'eco') => {
    setThemeType(newType);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };

  return (
    <View style={styles.safeArea}>

      {/* =========================
          TOPBAR
      ========================== */}

      <View style={styles.topBar}>

        <View style={styles.topLeft}>

            <TouchableOpacity onPress={() => onBack.onBack()}>
            <Text style={styles.topBarText}>
              {t('back')}
            </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.topRight}>

          <Home
            size={24}
            color="#111827"
          />

          <Bell
            size={24}
            color="#111827"
          />

          <Settings
            size={24}
            color="#111827"
          />

        </View>

      </View>

      {/* =========================
          CONTENT
      ========================== */}

      <ScrollView
        contentContainerStyle={styles.contentArea}
        showsVerticalScrollIndicator={false}
      >

        {/* PROFILE + TITLE */}

        <View style={styles.profileRow}>

          <View style={styles.profileImage} />

          <View style={styles.titleContainer}>

            <Text style={styles.title}>
              {t('title')}
            </Text>

          </View>

        </View>

           <LanguageSelector/>  

        {/* =========================
            SECTION
        ========================== */}

        <View style={styles.section}>

          {/* IDIOMA */}

          <View style={styles.fieldGroup}>

            <Text style={styles.label}>
              {t('language.title')}
            </Text>

          </View>

        </View>
        {/* =========================
            VISUAL SETTINGS
        ========================== */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            {t('theme.title')}
          </Text>

          {/* TIPO DE TEMA */}

          <View style={styles.fieldGroup}>

            <Text style={styles.label}>
              {t('theme.title')}
            </Text>

            <View style={styles.radioGroup}>

              {/* STANDARD */}

              <TouchableOpacity
                style={styles.radioOption}
                onPress={() => handleThemeTypeChange('standard')}
              >

                <View style={styles.radioOuter}>

                  {themeType === 'standard' && (
                    <View style={styles.radioInner} />
                  )}

                </View>

                <Text style={styles.radioText}>
                  {t('theme.standard')}
                </Text>

              </TouchableOpacity>

              {/* ECO */}

              <TouchableOpacity
                style={styles.radioOption}
                onPress={() => handleThemeTypeChange('eco')}
              >

                <View style={styles.radioOuter}>

                  {themeType === 'eco' && (
                    <View style={styles.radioInner} />
                  )}

                </View>

                <Text style={styles.radioText}>
                  {t('theme.eco')}
                </Text>

              </TouchableOpacity>

            </View>

          </View>

          {/* MODO CLARO/OSCURO */}

          <View style={styles.fieldGroup}>

            <Text style={styles.label}>
              Modo
            </Text>

            <View style={styles.radioGroup}>

              {/* CLARO */}

              <TouchableOpacity
                style={styles.radioOption}
                onPress={() => handleThemeChange('light')}
              >

                <View style={styles.radioOuter}>

                  {mode === 'light' && (
                    <View style={styles.radioInner} />
                  )}

                </View>

                <Text style={styles.radioText}>
                  {t('theme.light')}
                </Text>

              </TouchableOpacity>

              {/* OSCURO */}

              <TouchableOpacity
                style={styles.radioOption}
                onPress={() => handleThemeChange('dark')}
              >

                <View style={styles.radioOuter}>

                  {mode === 'dark' && (
                    <View style={styles.radioInner} />
                  )}

                </View>

                <Text style={styles.radioText}>
                  {t('theme.dark')}
                </Text>

              </TouchableOpacity>

            </View>

          </View>

          {/* TAMAÑO FUENTE */}

         

        </View>

      </ScrollView>

    </View>
  );
};

export default SettingsScreen;