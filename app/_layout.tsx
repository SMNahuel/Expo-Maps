import { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import "react-native-reanimated";

//Components
import Footer from "@/components/Footer";
import Header from "@/components/Header";

//Store
import useStore from "../store/index";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { init } = useStore();
  const [load, error] = useFonts({
    "TradeGothic": require("../assets/fonts/TradeGothicLTStd-BdCn20.otf"),
  });
  
  useEffect(() => {
    init();
    if (load) {
      SplashScreen.hideAsync();
    }
  }, [load]);

  if (!load) {
    return null;
  }

  return (
    <>
      <Header />
      <Stack screenOptions={{ headerShown: false}} />
      <Footer />
    </>
  );
}
