import { StyleSheet } from "react-native";
import { ThemeColors, spacing, typography } from "../../theme";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },

    safeAreaMobile: {
      backgroundColor: colors.background,
      flex: 1,
    },

    wrapper: {
      flex: 1,
      width: "100%",
      alignSelf: "center",
      maxWidth: 1600,
    },

    page: {
      flex: 1,
    },

    pageWeb: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: spacing.xl,
      paddingHorizontal: spacing.xxl,
      paddingTop: spacing.lg,
      backgroundColor: colors.background,
      
    },

    container: {
      maxWidth: 400,
      paddingHorizontal: spacing.lg,
      
    },

    card: {
      flex: 1,
      maxWidth: 650,

      backgroundColor: colors.surface,
      borderRadius: 24,

      padding: spacing.xl,

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

      justifyContent: "space-between",
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

    cardBottom: {
      marginTop: spacing.lg,
    },

    cardBottomSpacing: {
      height: 60,
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
    },

    backButton: {
      padding: spacing.sm,
      marginRight: spacing.md,
    },

    backIcon: {
      width: 24,
      height: 24,
    },

    title: {
      ...typography.title,
      color: colors.textSecondary,

      fontSize: 32,
      fontWeight: "700",
      letterSpacing: 0.5,
    },

    section: {
      ...typography.subtitle,
      color: colors.primary,

      fontSize: 20,
      fontWeight: "600",

      marginBottom: spacing.lg,
    },

    sectionWeb: {
      marginBottom: spacing.xl,
    },

    footer: {
      backgroundColor: colors.background,

      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.lg,

      borderTopWidth: 1,
      borderTopColor: "rgba(255,255,255,0.05)",
    },
    footerWeb: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
    },
  });
