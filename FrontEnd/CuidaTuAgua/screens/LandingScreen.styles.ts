import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
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

    brand: {
      fontSize: 18,
      fontWeight: '700',
      color: '#111827',
    },

    menuButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },

    menuButtonText: {
      fontSize: 28,
      fontWeight: '700',
      color: '#111827',
    },

    searchBar: {
      flex: 1,
      maxWidth: 700,

      height: 38,

      marginLeft: 20,

      borderWidth: 1,
      borderColor: '#9CA3AF',
      borderRadius: 20,

      justifyContent: 'center',

      paddingHorizontal: 16,

      backgroundColor: '#FFFFFF',
    },

    searchText: {
      fontSize: 13,
      color: '#4B5563',
    },

    /* =========================
       MAIN
    ========================== */

    mainContainer: {
      flex: 1,
      flexDirection: 'row',
    },

    contentArea: {
      flexGrow: 1,
      padding: 20,
      paddingBottom: 100,
    },

    userText: {
      fontSize: 14,
      color: '#111827',
      marginBottom: 20,
    },

    /* =========================
       HOUSE CARD
    ========================== */

    houseCard: {
      width: '100%',
      maxWidth: 520,

      minHeight: 180,

      borderWidth: 1,
      borderColor: '#D1D5DB',

      backgroundColor: '#FFFFFF',

      flexDirection: 'row',

      padding: 20,

      marginBottom: 30,
    },

    houseCardMobile: {
      flexDirection: 'column',
    },

    houseImage: {
      width: '45%',
      minWidth: 120,

      height: 140,

      borderWidth: 1,
      borderColor: '#9CA3AF',

      backgroundColor: '#E5E7EB',

      justifyContent: 'center',
      alignItems: 'center',

      marginRight: 20,
    },

    houseImageMobile: {
      width: '100%',
      marginRight: 0,
      marginBottom: 20,
    },

    imagePlaceholder: {
      fontSize: 42,
    },

    houseInfo: {
      flex: 1,
      justifyContent: 'center',
      gap: 10,
    },

    houseTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: '#111827',
    },

    houseText: {
      fontSize: 14,
      color: '#374151',
    },

    /* =========================
       ADD CARD
    ========================== */

    addCard: {
      width: '100%',
      maxWidth: 520,

      height: 180,

      borderWidth: 1,
      borderColor: '#D1D5DB',

      backgroundColor: '#FFFFFF',

      justifyContent: 'center',
      alignItems: 'center',
    },

    plus: {
      fontSize: 72,
      color: '#6B7280',
      fontWeight: '200',
    },

    /* =========================
       SIDEBAR
    ========================== */

    sidebar: {
      width: 180,

      borderLeftWidth: 1,
      borderColor: '#D1D5DB',

      backgroundColor: '#FFFFFF',

      justifyContent: 'space-between',
      alignItems: 'center',

      paddingVertical: 30,
    },

    sidebarMobile: {
      position: 'absolute',

      top: 0,
      right: 0,
      bottom: 0,

      width: 220,

      zIndex: 999,

      shadowColor: '#000',
      shadowOffset: {
        width: -2,
        height: 0,
      },
      shadowOpacity: 0.15,
      shadowRadius: 8,

      elevation: 10,
    },

    sidebarTop: {
      alignItems: 'center',
      gap: 20,
    },

    sidebarButton: {
      width: 120,
      height: 40,

      borderWidth: 1,
      borderColor: '#9CA3AF',
      borderRadius: 8,

      justifyContent: 'center',
      alignItems: 'center',

      backgroundColor: '#FFFFFF',
    },

    logoutButton: {
      width: 120,
      height: 40,

      borderWidth: 1,
      borderColor: '#9CA3AF',
      borderRadius: 8,

      justifyContent: 'center',
      alignItems: 'center',

      backgroundColor: '#FFFFFF',
    },

    sidebarButtonText: {
      fontSize: 13,
      fontWeight: '500',
      color: '#111827',
    },

  });