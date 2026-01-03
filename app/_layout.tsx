import { Slot } from 'expo-router';
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};
export default function RootLayout() {
  // const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Slot />
    </GestureHandlerRootView>
  );
}
