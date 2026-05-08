import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { useTranslation } from 'react-i18next';
import { useResponsive } from '../../hooks/useResponsive';
import { useTheme, spacing, typography } from '../../theme';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function TermsModal({ visible, onClose }: Props) {
  const { isWeb } = useResponsive();
  const { colors } = useTheme()
  const t = useTranslation('register').t;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: colors.surface },
            isWeb && styles.modalContainerWeb,
          ]}
        >
          <Text style={[styles.title, { color: colors.textSecondary }]}>{t('section2.checkbox')}</Text>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <Text style={[styles.paragraph, { color: colors.textPrimary }]}>{t('paragraph1')}</Text>

            <Text style={[styles.paragraph, { color: colors.textPrimary }]}>{t('paragraph2')}</Text>

            <Text style={[styles.paragraph, { color: colors.textPrimary }]}>{t('paragraph3')}</Text>

            <Text style={[styles.paragraph, { color: colors.textPrimary }]}>{t('paragraph4')}</Text>

            <Text style={[styles.paragraph, { color: colors.textPrimary }]}>{t('paragraph5')}</Text>

            <Text style={[styles.paragraph, { color: colors.textPrimary }]}>{t('paragraph6')}</Text>
          </ScrollView>

          <TouchableOpacity style={[styles.button, { backgroundColor: colors.secondary }]} onPress={onClose}>
            <Text style={[styles.buttonText, { color: colors.surface }]}>{t('close')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
  },

  modalContainer: {
    width: '100%',
    maxHeight: '80%',
    borderRadius: 14,
    maxWidth: 500,
    padding: spacing.lg,
  },

  modalContainerWeb: {
    maxWidth: 700,
  },

  title: {
    ...typography.subtitle,
    marginBottom: spacing.md,
    textAlign: 'center',
  },

  content: {
    marginBottom: spacing.lg,
  },

  paragraph: {
    ...typography.body,
    marginBottom: spacing.sm,
  },

  button: {
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    ...typography.body,
    fontWeight: '600',
  },
});