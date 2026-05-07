// ProfileScreen.styles.ts

import { StyleSheet } from 'react-native';

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
      backgroundColor: '#F5F5F5',
    },

    /* =========================
       TOPBAR
    ========================== */

    topBar: {
      height: 60,

      backgroundColor: '#FFFFFF',

      borderBottomWidth: 1,
      borderColor: '#D1D5DB',

      justifyContent: 'center',

      paddingHorizontal: 20,
    },

    brand: {
      fontSize: 20,
      fontWeight: '700',
      color: '#2563EB',
    },

    /* =========================
       MAIN
    ========================== */

    mainContainer: {
      flex: 1,
      flexDirection: isMobile ? 'column' : 'row',
    },

    contentArea: {
      flexGrow: 1,

      padding: 20,
      paddingBottom: 100,
    },

    /* =========================
       EDIT BUTTON
    ========================== */

    editButton: {
      width: 120,
      height: 42,

      borderWidth: 1,
      borderColor: '#9CA3AF',

      borderRadius: 10,

      backgroundColor: '#FFFFFF',

      justifyContent: 'center',
      alignItems: 'center',

      marginBottom: 30,
    },

    editButtonText: {
      fontSize: 14,
      fontWeight: '600',
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

      padding: isMobile ? 20 : 30,
    },

    title: {
      fontSize: isMobile ? 28 : 34,
      fontWeight: '700',

      color: '#111827',

      marginBottom: 40,

      textAlign: isMobile ? 'center' : 'left',
    },

    /* =========================
       PROFILE CONTENT
    ========================== */

    profileContent: {
      flexDirection: isMobile ? 'column' : 'row',
      gap: 40,
    },

    /* =========================
       IMAGE
    ========================== */

    imageSection: {
      alignItems: 'center',
    },

    imageLabel: {
      fontSize: 13,
      color: '#4B5563',

      marginBottom: 14,
    },

    profileImage: {
      width: 120,
      height: 120,

      borderRadius: 999,

      borderWidth: 1,
      borderColor: '#9CA3AF',

      backgroundColor: '#E5E7EB',
    },

    /* =========================
       FORM
    ========================== */

    form: {
      flex: 1,
      gap: 20,
    },

    inputGroup: {
      gap: 8,
    },

    label: {
      fontSize: 14,
      fontWeight: '600',
      color: '#374151',
    },

    input: {
      width: '100%',
      height: 48,

      borderWidth: 1,
      borderColor: '#D1D5DB',

      borderRadius: 10,

      backgroundColor: '#FFFFFF',

      paddingHorizontal: 14,

      fontSize: 14,
      color: '#111827',
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