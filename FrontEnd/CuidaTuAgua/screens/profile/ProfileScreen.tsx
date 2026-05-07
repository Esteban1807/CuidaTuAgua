import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import { useResponsive } from '../../hooks/useResponsive';
import { createStyles } from './ProfileScreen.styles';

type Props = {
  navigation?: any;
};

const ProfileScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const { isMobile } = useResponsive();
  const { t } = useTranslation('profile');
  const styles = createStyles(colors, isMobile);

  const handleBack = () => {
    if (navigation?.navigate) {
      navigation.navigate('dashboard');
    }
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t('title')}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('personalInfo.title')}</Text>
          <Text style={styles.label}>{t('personalInfo.name')}: Diego Pérez</Text>
          <Text style={styles.label}>{t('personalInfo.email')}: diego@example.com</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>{t('cancel')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;