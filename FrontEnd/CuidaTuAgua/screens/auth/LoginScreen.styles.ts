import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  webSafeArea: {  
    padding: spacing.xxl,
  },

  container: {
    flex: 1,
  
  },

  webContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.xxl,
    flexDirection: 'row',
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: 50,
    minHeight: 520,
    maxHeight: '90%',
    top: '5%',
  },

  formSection: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
  },

  webForm: {
    paddingHorizontal: spacing.lg,
    flex: 0.65,
    maxWidth: 600,
  },

  mobileForm: {
    paddingTop: spacing.xxl,
  },

  mobileFormFields: {
    marginTop: spacing.xl,
  },

  mobileButton: {
    bottom: 30,
  },

  webAuthLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    marginRight: spacing.md,
  },

  rightPanel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    height: '100%',
    maxWidth: 600,
  },

  carouselRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },

  carouselItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageContainer: {
    width: '100%',
    alignItems: 'center',
  },

  leftArrow: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grayLight,
    borderRadius: 20,
  },

  rightArrow: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grayLight,
    borderRadius: 20,
  },

  arrowText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },

  carouselImage: {
    width: '70%',
    height: 290,
    borderRadius: 20,
  },

  carouselTitle: {
    ...typography.subtitle,
    marginTop: spacing.md,
    color: colors.primary,
    textAlign: 'center',
  },

  carouselDescription: {
    ...typography.body,
    marginTop: spacing.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },

});