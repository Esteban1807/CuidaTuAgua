// DashboardScreen.styles.ts

import { StyleSheet } from 'react-native';

export const createStyles = (colors: any, isMobile: boolean) =>
  StyleSheet.create({

    /* =========================
       ROOT
    ========================== */

    safeArea: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },

    /* =========================
       TOPBAR
    ========================== */

    topBar: {
      height: 60,
      borderBottomWidth: 1,
      borderColor: '#D1D5DB',
      backgroundColor: '#FFFFFF',

      justifyContent: 'center',

      paddingHorizontal: 20,
    },

    brand: {
      fontSize: 22,
      fontWeight: '700',
      color: '#2563EB',
    },

    /* =========================
       MAIN LAYOUT
    ========================== */

    mainContainer: {
      flex: 1,
      flexDirection: isMobile ? 'column' : 'row',
    },

    contentArea: {
      flexGrow: 1,
      padding: 20,
      paddingBottom: 80,
    },

    /* =========================
       HOME TITLE
    ========================== */

    homeTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,

      marginBottom: 20,
    },

    homeTitleText: {
      fontSize: 22,
      fontWeight: '700',
      color: '#111827',
    },

    /* =========================
       CARD
    ========================== */

    card: {
      width: '100%',

      backgroundColor: '#FFFFFF',

      borderWidth: 1,
      borderColor: '#D1D5DB',

      borderRadius: 16,

      padding: 20,

      marginBottom: 20,
    },

    /* =========================
       STATS CARD
    ========================== */

    statsCard: {
      flexDirection: isMobile ? 'column' : 'row',
      gap: 30,
    },

    statsLeft: {
      flex: 1,
    },

    statsValue: {
      fontSize: isMobile ? 54 : 72,
      fontWeight: '700',
      color: '#111827',

      marginBottom: 20,
    },

    chart: {
      width: '100%',
      height: 220,

      borderLeftWidth: 3,
      borderBottomWidth: 3,

      borderColor: '#111827',

      marginBottom: 20,

      position: 'relative',
      overflow: 'hidden',
    },

    lineGray: {
      position: 'absolute',

      width: '80%',
      height: 3,

      backgroundColor: '#D1D5DB',

      top: '40%',
      left: '10%',

      transform: [{ rotate: '-15deg' }],
    },

    lineBlue: {
      position: 'absolute',

      width: '80%',
      height: 3,

      backgroundColor: '#2563EB',

      top: '50%',
      left: '10%',

      transform: [{ rotate: '10deg' }],
    },

    updateButton: {
      width: 170,
      height: 42,

      borderRadius: 10,

      backgroundColor: '#2563EB',

      justifyContent: 'center',
      alignItems: 'center',
    },

    updateButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
    },

    statsRight: {
      flex: 1,
      justifyContent: 'center',
    },

    statusTitle: {
      fontSize: 28,
      fontWeight: '700',

      color: '#111827',

      marginBottom: 16,
    },

    statusText: {
      fontSize: 14,
      lineHeight: 24,
      color: '#4B5563',
    },

    /* =========================
       GOALS
    ========================== */

    goalsTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: '#111827',

      marginBottom: 24,
    },

    goalItem: {
      marginBottom: 20,
    },

    goalTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',

      marginBottom: 8,
    },

    goalLabel: {
      fontSize: 14,
      color: '#111827',
    },

    goalPercent: {
      fontSize: 14,
      fontWeight: '600',
      color: '#111827',
    },

    goalBar: {
      width: '100%',
      height: 18,

      borderRadius: 20,

      backgroundColor: '#E5E7EB',

      overflow: 'hidden',
    },

    goalFill30: {
      width: '30%',
      height: '100%',
      backgroundColor: '#6B7280',
    },

    goalFill40: {
      width: '40%',
      height: '100%',
      backgroundColor: '#6B7280',
    },

    goalFill55: {
      width: '55%',
      height: '100%',
      backgroundColor: '#6B7280',
    },

    goalFill45: {
      width: '45%',
      height: '100%',
      backgroundColor: '#6B7280',
    },

    /* =========================
       SIDEBAR
    ========================== */

    sidebar: {
      width: isMobile ? '100%' : 220,

      borderLeftWidth: isMobile ? 0 : 1,
      borderTopWidth: isMobile ? 1 : 0,

      borderColor: '#D1D5DB',

      backgroundColor: '#FFFFFF',

      padding: 20,

      justifyContent: 'space-between',
    },

    sidebarTop: {
      gap: 16,
    },

    sidebarButton: {
      height: 48,

      borderWidth: 1,
      borderColor: '#D1D5DB',

      borderRadius: 10,

      backgroundColor: '#FFFFFF',

      justifyContent: 'center',
      alignItems: 'center',
    },

    sidebarButtonText: {
      fontSize: 14,
      fontWeight: '500',
      color: '#111827',
    },

    logoutButton: {
      height: 48,

      borderWidth: 1,
      borderColor: '#D1D5DB',

      borderRadius: 10,

      backgroundColor: '#FFFFFF',

      justifyContent: 'center',
      alignItems: 'center',

      marginTop: 30,
    },

  });