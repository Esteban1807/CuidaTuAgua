import { StyleSheet } from "react-native";
import { ThemeColors, spacing, typography } from "@theme/index";

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },

    webSafeArea: {
      padding: spacing.xxl,
    },

    container: {
      flex: 1,
      justifyContent: "center",
    },

    webContainer: {
      alignItems: "center",
      justifyContent: "center",
      padding: spacing.xxl,
      flexDirection: "row",
      maxWidth: 1500,
      alignSelf: "center",
      width: "100%",
      backgroundColor: colors.surface,
      borderRadius: 50,
      minHeight: 520,
      maxHeight: "90%",
    },

    formSection: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      justifyContent: "space-between",
    },

    webForm: {
      flex: 1,
      maxWidth: 600,
      marginRight: spacing.xxl,
    },

    mobileForm: {
      paddingTop: spacing.xxl,
    },

    logoContainer: {
      alignItems: "center",
      marginBottom: spacing.xxl,
    },

    logoTitle: {
      ...typography.title,
      color: colors.textPrimary,
      textAlign: "center",
      marginTop: spacing.md,
    },

    mobileFormFields: {
      marginTop: spacing.xl,
    },


    webAuthLink: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: spacing.md,
      marginRight: spacing.md,
    },

    rightPanel: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      height: "100%",
      maxWidth: 600,
      marginLeft: spacing.xxl,
    },

    carouselRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.lg,
    },

    carouselItem: {
      alignItems: "center",
      justifyContent: "center",
    },

    imageContainer: {
      width: "100%",
      alignItems: "center",
    },

    leftArrow: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.grayLight,
      borderRadius: 20,
    },

    rightArrow: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.grayLight,
      borderRadius: 20,
    },

    arrowText: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.primary,
    },

    carouselImage: {
      width: "70%",
      height: 290,
      borderRadius: 20,
    },

    carouselTitle: {
      ...typography.subtitle,
      marginTop: spacing.md,
      color: colors.primary,
      textAlign: "center",
    },

    carouselDescription: {
      ...typography.body,
      marginTop: spacing.sm,
      color: colors.textSecondary,
      textAlign: "center",
    },
  });
