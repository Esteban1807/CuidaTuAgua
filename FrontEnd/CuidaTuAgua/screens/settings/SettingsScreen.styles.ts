// SettingsScreen.styles.ts

import { StyleSheet } from 'react-native';
import { ThemeColors, spacing, typography } from '../../theme/';

export const createStyles = (
  colors: any,
  isMobile: boolean,
) =>
  StyleSheet.create({

    /* =========================
       ROOT
    ========================== */

    safeArea: {
      flex: 1,
      backgroundColor: colors.surface,
    },

    /* =========================
       TOPBAR
    ========================== */

    topBar: {
      height: 60,

      backgroundColor: '#FFFFFF',

      borderBottomWidth: 1,
      borderColor: '#D1D5DB',

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',

      paddingHorizontal: 20,
    },

    topLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },

    topRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 18,
    },

    topBarText: {
      fontSize: 16,
      color: '#111827',
      fontWeight: '500',
    },

    /* =========================
       MAIN
    ========================== */

    contentArea: {
      flexGrow: 1,

      paddingHorizontal: isMobile ? 20 : 40,
      paddingVertical: 30,
      paddingBottom: 100,
    },

    /* =========================
       PROFILE
    ========================== */

    profileRow: {
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'center' : 'flex-start',

      gap: 40,

      marginBottom: 40,
    },

    profileImage: {
      width: 80,
      height: 80,

      borderRadius: 999,

      backgroundColor: '#E5E7EB',

      borderWidth: 1,
      borderColor: '#9CA3AF',
    },

    /* =========================
       TITLE
    ========================== */

    titleContainer: {
      flex: 1,
      justifyContent: 'center',
    },

    title: {
      fontSize: isMobile ? 32 : 42,
      fontWeight: '700',

      color: '#111827',

      textAlign: isMobile ? 'center' : 'left',
    },

    /* =========================
       SECTION
    ========================== */

    section: {
      width: '100%',
      maxWidth: 500,

      marginBottom: 50,

      alignSelf: isMobile ? 'center' : 'flex-start',
    },

    sectionTitle: {
      fontSize: 28,
      fontWeight: '700',

      color: '#111827',
      maxWidth: 300,
      marginBottom: 30,
    },

    fieldGroup: {
      marginBottom: 30,
    },

    label: {
      fontSize: 15,
      fontWeight: '600',

      color: '#374151',

      marginBottom: 12,
    },

    /* =========================
       SELECT
    ========================== */

    select: {
      width: '100%',
      height: 52,

      borderWidth: 1,
      borderColor: '#D1D5DB',

      borderRadius: 10,

      backgroundColor: '#FFFFFF',

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',

      paddingHorizontal: 16,
    },

    selectText: {
      fontSize: 15,
      color: '#111827',
    },

    /* =========================
       RADIO GROUP
    ========================== */

    radioGroup: {
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'flex-start' : 'center',

      gap: 20,
    },

    radioOption: {
      flexDirection: 'row',
      alignItems: 'center',

      gap: 10,
    },

    radioOuter: {
      width: 18,
      height: 18,

      borderRadius: 999,

      borderWidth: 2,
      borderColor: '#374151',

      justifyContent: 'center',
      alignItems: 'center',
    },

    radioInner: {
      width: 8,
      height: 8,

      borderRadius: 999,

      backgroundColor: '#111827',
    },

    radioText: {
      fontSize: 15,
      color: '#111827',
    },

  });