import React, { useState } from "react";
import { View, Text} from "react-native";
import Sidebar from "./Sidebar";
import HomeScreen from "@screens/dashboard/layouts/HomeScreen";
import ProfileScreen from "@screens/dashboard/layouts/ProfileScreen";
import SettingsScreen from "@screens/dashboard/layouts/SettingsScreen";
import { useNavigation } from "@react-navigation/native";

interface SidebarLayoutProps {
  onSignOut?: () => void;
}

export default function SidebarLayout({ onSignOut }: SidebarLayoutProps) {
  const safeOnSignOut = onSignOut ?? (() => {});
  const navigation = useNavigation<any>();
  const [tab, setTab] = useState("home");

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <Sidebar tab={tab} onTabChange={setTab} onSignOut={safeOnSignOut} />

      <View style={{ flex: 1 }}>
        {tab === "home" && <HomeScreen />}
        {tab === "profile" && <ProfileScreen />}
        {tab === "settings" && <SettingsScreen />}
      </View>
      
    </View>
  );
}