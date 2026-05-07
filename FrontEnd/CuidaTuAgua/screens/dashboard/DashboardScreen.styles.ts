// DashboardScreen.styles.ts

import { StyleSheet, Dimensions } from "react-native";

const isMobile =
  Dimensions.get("window").width < 768;

export const styles = StyleSheet.create({

  /* =========================
     ROOT
  ========================== */

  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  /* =========================
     TOPBAR
  ========================== */

  topBar: {
    height: 60,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 20,

    backgroundColor: "#1F1F1F",

    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
  },

  profileTrigger: {
    flexDirection: "row",
    alignItems: "center",
  },

  userNameOriginal: {
    color: "#FFFFFF",

    marginRight: 10,

    fontWeight: "500",
    fontSize: 14,
  },

  /* =========================
     AVATAR
  ========================== */

  avatar: {
    width: 42,
    height: 42,

    borderRadius: 999,

    backgroundColor: "#118FC3",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    borderColor: "#4CAF50",
  },

  avatarText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

  /* =========================
     BODY
  ========================== */

  bodyContent: {
    flex: 1,

    paddingHorizontal: isMobile ? 20 : 40,
    paddingVertical: 30,
  },

  /* =========================
     LOGO SECTION
  ========================== */

  logoSection: {
    alignItems: "center",

    marginBottom: 40,
  },

  appLogo: {
    width: isMobile ? 80 : 100,
    height: isMobile ? 80 : 100,

    marginBottom: 16,

    resizeMode: "contain",
  },

  textLogo: {
    fontSize: isMobile ? 28 : 34,
    fontWeight: "700",

    color: "#118FC3",

    marginBottom: 10,
  },

  descriptionLogo: {
    textAlign: "center",

    color: "#6B7280",

    fontSize: 15,

    maxWidth: 500,

    lineHeight: 24,
  },

  /* =========================
     CARDS
  ========================== */

  cardsContainer: {
    flex: 1,

    gap: 20,
  },

  card: {
    width: "100%",

    backgroundColor: "#F9FAFB",

    borderWidth: 1,
    borderColor: "#E5E7EB",

    borderRadius: 16,

    padding: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,

    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",

    color: "#111827",

    marginBottom: 8,
  },

  cardValue: {
    fontSize: 16,
    color: "#6B7280",
  },

  /* =========================
     LOGOUT
  ========================== */

  logoutButton: {
    height: 52,

    backgroundColor: "#118FC3",

    borderRadius: 12,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 30,
  },

  logoutButtonText: {
    color: "#FFFFFF",

    fontWeight: "700",
    fontSize: 15,
  },

  /* =========================
     CUSTOM DRAWER
  ========================== */

  customDrawer: {
    position: "absolute",

    top: 0,
    right: 0,
    bottom: 0,

    backgroundColor: "#181818",

    paddingTop: 60,

    zIndex: 999,

    shadowColor: "#000",
    shadowOffset: {
      width: -4,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,

    elevation: 12,
  },

  expandedHeader: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 24,
    paddingBottom: 24,
  },

  userNameExpanded: {
    color: "#FFFFFF",

    marginLeft: 16,

    fontWeight: "700",
    fontSize: 18,
  },

  separator: {
    height: 1,

    backgroundColor: "#333333",

    marginHorizontal: 20,
    marginBottom: 10,
  },

  /* =========================
     DRAWER OPTIONS
  ========================== */

  option: {
    paddingVertical: 18,
    paddingHorizontal: 24,
  },

  optionText: {
    color: "#E5E7EB",

    fontSize: 16,
    fontWeight: "500",
  },

  /* =========================
     RESPONSIVE
  ========================== */

  mobileDrawer: {
    width: "75%",
  },

  desktopDrawer: {
    width: 320,
  },

});