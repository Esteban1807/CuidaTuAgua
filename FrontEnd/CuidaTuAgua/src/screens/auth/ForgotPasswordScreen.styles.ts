import { StyleSheet } from "react-native";
import { ThemeColors, spacing, typography } from "@theme/index";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },

    wrapper: {
      flex: 1,
      width: "100%",
      alignSelf: "center",
      maxWidth: 1600,
    },

    page: {
      flex: 1,
      justifyContent: "space-between",
    },

    pageWeb: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: spacing.xxl,
      paddingVertical: spacing.xxl,
      backgroundColor: colors.background,
    },

    header: {
      backgroundColor: colors.background,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.sm,
      paddingBottom: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(255,255,255,0.05)",
    },

    headerWeb: {
      padding: spacing.md,
      marginBottom: spacing.xl,
    },

    backButton: {
      padding: spacing.sm,
      marginRight: spacing.md,
    },

    title: {
      ...typography.title,
      color: colors.textSecondary,
      fontSize: 32,
      fontWeight: "700",
      letterSpacing: 0.5,
    },

    titleMobile: {
      fontSize: 24,
      fontWeight: "600",
    },

    card: {
      backgroundColor: colors.surface,
      borderRadius: 24,
      paddingTop: 40,
      paddingLeft: 40,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.05)",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      elevation: 8,
      maxWidth: 600,
      maxHeight: 500,
      width: "100%",
    },

    cardMobile: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      padding: spacing.lg,
      marginHorizontal: spacing.md,
      marginBottom: spacing.lg,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.04)",
    },

    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.xl,
    },

    containerWeb: {
      maxWidth: 500,
      justifyContent: "space-between",
    },

    stepsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.xxl,
      paddingHorizontal: spacing.md,
    },

    step: {
      flexDirection: "column",
      alignItems: "center",
    },

    stepNumber: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: "rgba(255,255,255,0.05)",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: spacing.sm,
      borderWidth: 2,
      borderColor: "rgba(255,255,255,0.1)",
    },

    stepNumberActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },

    stepNumberCompleted: {
      backgroundColor: colors.success || colors.primary,
      borderColor: colors.success || colors.primary,
    },

    stepNumberText: {
      ...typography.subtitle,
      color: colors.textSecondary,
      fontWeight: "600",
      fontSize: 16,
    },

    stepNumberTextActive: {
      color: colors.background,
      fontWeight: "700",
    },

    stepLabel: {
      ...typography.body,
      color: colors.textSecondary,
      fontSize: 12,
      textAlign: "center",
    },

    stepLabelActive: {
      color: colors.primary,
      fontWeight: "600",
    },

    stepLine: {
      position: "absolute",
      height: 2,
      backgroundColor: "rgba(255,255,255,0.1)",
      top: 25,
    },

    stepLineActive: {
      backgroundColor: colors.primary,
    },

    section: {
      ...typography.subtitle,
      color: colors.primary,
      fontSize: 20,
      fontWeight: "600",
      marginBottom: spacing.lg,
      textAlign: "center",
    },

    sectionWeb: {
      marginBottom: spacing.xl,
      fontSize: 22,
    },

    subtitle: {
      ...typography.body,
      color: colors.textSecondary,
      marginBottom: spacing.md,
      textAlign: "center",
      lineHeight: 22,
    },

    inputContainer: {
      marginVertical: spacing.lg,
    },

    twoInputRow: {
      flexDirection: "row",
      gap: spacing.md,
    },

    twoInputFlex: {
      flex: 1,
    },

    footer: {
      backgroundColor: colors.background,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.lg,
      borderTopWidth: 1,
      borderTopColor: "rgba(255,255,255,0.05)",
    },

    footerMobile: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.background,
    },

    footerWeb: {
      width: "100%",
      maxWidth: 650,
      marginTop: spacing.lg,
      borderTopWidth: 0,
      paddingHorizontal: 0,
      paddingTop: 0,
      backgroundColor: "transparent",
    },

    loadingContainer: {
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: spacing.xl,
    },

    progressDots: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: spacing.lg,
      gap: spacing.sm,
    },

    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "rgba(255,255,255,0.2)",
    },

    dotActive: {
      backgroundColor: colors.primary,
      width: 24,
    },

    infoBox: {
      backgroundColor: "rgba(255,255,255,0.03)",
      borderRadius: 12,
      padding: spacing.md,
      marginBottom: spacing.lg,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
    },

    infoBoxText: {
      ...typography.small,
      color: colors.textSecondary,
      lineHeight: 18,
    },
  });
