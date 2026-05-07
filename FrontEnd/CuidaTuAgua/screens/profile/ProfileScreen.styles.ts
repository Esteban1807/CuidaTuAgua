import { StyleSheet } from 'react-native';
import { ThemeColors, spacing, typography } from '../../theme/index';

export const createStyles = (colors: ThemeColors, isMobile: boolean) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.surface,
    },
    content: {
      padding: spacing.lg,
    },
    title: {
      ...typography.title,
      color: colors.textPrimary,
      marginBottom: spacing.xl,
    },
    section: {
      marginBottom: spacing.xl,
    },
    sectionTitle: {
      ...typography.subtitle,
      color: colors.textPrimary,
      marginBottom: spacing.md,
    },
    label: {
      ...typography.body,
      color: colors.textSecondary,
      marginBottom: spacing.sm,
    },
    button: {
      backgroundColor: colors.primary,
      padding: spacing.md,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: spacing.xl,
    },
    buttonText: {
      color: colors.textOnPrimary,
      fontWeight: '600',
    },
  });