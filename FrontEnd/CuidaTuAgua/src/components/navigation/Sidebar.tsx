import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@theme/index";
import { useTranslation } from "react-i18next";
import Logo from "../common/Logo";

interface SidebarProps {
  tab: string;
  onTabChange: (tab: string) => void;
  onSignOut: () => void;
}

export default function Sidebar({ tab, onTabChange, onSignOut }: SidebarProps) {
  const { colors } = useTheme();
  const { t } = useTranslation("dashboard");
  const navItems = [
    { label: t("drawer.home"), value: "home" },
    { label: t("drawer.profile"), value: "profile" },
    { label: t("drawer.settings"), value: "settings" },
  ];

  return (
    <View
      style={{
        width: 280,
        backgroundColor: colors.surface,
        padding: 16,
      }}
    >
      <View style={{ alignItems: "center", marginBottom: 32 }}>
        <Logo />
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 24,
          }}
        >
          {t("drawer.appName")}
        </Text>
      </View>

      <View style={{ gap: 12, flex: 1 }}>
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.value}
            onPress={() => onTabChange(item.value)}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
              backgroundColor: tab === item.value ? colors.primary: "transparent",
            }}
          >
            <Text
              style={{
                color: tab === item.value ? colors.textOnPrimary : colors.textPrimary,
                fontSize: 16,
                fontWeight: tab === item.value ? "600" : "400",
              }}
            >
              {item.label}
            </Text>
            
          </TouchableOpacity>
          
        ))}
        
      </View>
      <TouchableOpacity
        onPress={onSignOut}
        style={{
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 8,
          backgroundColor: colors.error,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: colors.textOnPrimary,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {t("drawer.logout")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
