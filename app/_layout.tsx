import { useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {View} from 'react-native'

import "react-native-reanimated";

// Hooks
import { useColorScheme } from "@/hooks/useColorScheme";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{headerShown : false}}>
      <Stack.Screen name="index" options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name="Home" options={{ animation: 'slide_from_bottom' ,header: () => <View>Hola</View>, }}   />
      </Stack>
    </ThemeProvider>
  );
}
