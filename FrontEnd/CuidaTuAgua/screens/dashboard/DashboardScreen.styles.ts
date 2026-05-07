// DashboardScreen.styles.ts

import { StyleSheet, Dimensions } from "react-native";
import { ThemeColors } from "../../theme/ThemeContext";


export const createStyles = (
  colors: ThemeColors,
) =>
  StyleSheet.create( {
  mainContainer: { flex: 1, backgroundColor: colors.surface },
  topBar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.surface,
  },
  profileTrigger: { flexDirection: 'row', alignItems: 'center' },
  userNameOriginal: { color: colors.textPrimary, marginRight: 10, fontWeight: '500' },

  // Estilos del Drawer
  expandedHeader: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  userNameExpanded: { color: colors.textPrimary, marginLeft: 15, fontWeight: 'bold', fontSize: 18 },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: colors.success
  },
  avatarText: { color: colors.textOnPrimary, fontWeight: 'bold' },
  separator: { height: 1, backgroundColor: colors.border, marginHorizontal: 20 },
  option: { padding: 20 },
  optionText: { color: colors.textSecondary, fontSize: 16 },

  // Estilos del cuerpo
  bodyContent: { flex: 1, padding: 20 },
  logoSection: {flexDirection : 'row'},
  appLogo: { width: 60, height: 60, marginBottom: -3 },
  textLogo: { top: 4,fontSize: 22, fontWeight: 'bold', color: colors.primary },
  descriptionLogo: {end: 150, top: 30 , color: colors.textMuted, fontSize: 13 },
  cardsContainer: { flex: 1, marginTop: 20, justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row' },
  card: {
    minWidth: 300,
    minHeight: 100,
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 10,
    margin: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  cardValue: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
  logoutButtonText: { color: colors.textOnPrimary, fontWeight: '600' }
});
