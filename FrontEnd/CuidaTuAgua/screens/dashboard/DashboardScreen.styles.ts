import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../theme";

export const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#FFFFFF' },
  topBar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#1f1f1f',
  },
  profileTrigger: { flexDirection: 'row', alignItems: 'center' },
  userNameOriginal: { color: 'white', marginRight: 10, fontWeight: '500' },
  
  // Estilos del Drawer
  expandedHeader: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  userNameExpanded: { color: 'white', marginLeft: 15, fontWeight: 'bold', fontSize: 18 },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#f57c00', justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#4caf50'
  },
  avatarText: { color: 'white', fontWeight: 'bold' },
  separator: { height: 1, backgroundColor: '#333', marginHorizontal: 20 },
  option: { padding: 20 },
  optionText: { color: '#ccc', fontSize: 16 },

  // Estilos del cuerpo
  bodyContent: { flex: 1, padding: 20 },
  logoSection: {flexDirection : 'row'},
  appLogo: { width: 60, height: 60, marginBottom: -3 },
  textLogo: { top: 4,fontSize: 22, fontWeight: 'bold', color: '#118FC3' },
  descriptionLogo: {end: 150, top: 30 , color: '#6B7280', fontSize: 13 },
  cardsContainer: { flex: 1, marginTop: 20, justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row' },
  card: { minWidth: 300 , minHeight: 100 , padding: 16, backgroundColor: '#F3F4F6', borderRadius: 10, margin: 30, alignItems: 'center', justifyContent: 'center'},
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardValue: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  logoutButtonText: { color: '#FFFFFF', fontWeight: '600' }
})
