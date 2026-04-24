import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.grayMedium,
  },

   safeAreaMobile: {
    backgroundColor: colors.background,
  },

  page: {
    flex: 1,
  },

  pageWeb: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    padding: spacing.lg,
  },

  card: {
    width: '100%',
    maxWidth: 760,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.xl,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },

  backButton: {
    padding: spacing.sm,
    marginRight: spacing.md,
  },

  backIcon: {
    width: 30,
    height: 30,
  },

  title: {
    ...typography.title,
    color: colors.textSecondary,
    textAlign: 'center',
  },

  form: {
    flexGrow: 1,
  },

  section: {
    ...typography.subtitle,
    color: colors.primary,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,

  },
});