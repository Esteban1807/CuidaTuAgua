import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import { useResponsive } from '../../hooks/useResponsive';
import { createStyles } from './ResultsScreen.styles';

type Props = {
  navigation?: any;
};

const ResultsScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const { isMobile } = useResponsive();
  const { t } = useTranslation('results');
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
          <Text style={styles.sectionTitle}>{t('summary.title')}</Text>
          <Text style={styles.label}>{t('summary.today')}: 25 L</Text>
          <Text style={styles.label}>{t('summary.thisMonth')}: 750 L</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ResultsScreen;