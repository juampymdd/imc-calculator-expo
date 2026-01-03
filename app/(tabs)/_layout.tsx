import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabsLayout = () => {
 const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 8);
  const tabBarHeight = 65 + bottomPadding;

  return (
    <Tabs
       screenOptions={{
        tabBarActiveTintColor: "#10B981",
        tabBarInactiveTintColor: "#9CA3AF",
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 4,
          marginBottom: 4,
        },
        tabBarStyle: {
          height: tabBarHeight,
          paddingBottom: bottomPadding,
          paddingTop: 10,
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderTopColor: theme === "dark" ? "#1F2937" : "#E5E7EB",
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
            },
          }),
        },
      }}
    >
      <Tabs.Screen
        name="calculator/index"
        options={{
          title: "Calculadora",
          tabBarIcon: ({ color, focused }) => {
            const size = focused ? 32 : 30;

            return (
              <View
                style={{
                  width: 44,
                  height: 34,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons size={size} name="calculator-outline" color={color} />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="meals/index"
        options={{
          title: "Comidas",
          tabBarIcon: ({ color, focused }) => {
            const size = focused ? 32 : 30;

            return (
              <View
                style={{
                  width: 44,
                  height: 34,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons size={size} name="pizza-outline" color={color} />
              </View>
            );
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;