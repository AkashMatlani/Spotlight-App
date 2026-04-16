import ClearkAndConvexProvider from "@/providers/ConvexAndProvider";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import IntialLayout from "./components/IntialLayout";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fonstLoaded] = useFonts({
    "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf")
  })

  const onLayoutRootView = useCallback(async () => {
    if (fonstLoaded) await SplashScreen.hideAsync();
  }, [fonstLoaded]);

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#000000"),
        NavigationBar.setButtonStyleAsync("light");
    }
  }, [])
  return (
    <ClearkAndConvexProvider >
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }} onLayout={onLayoutRootView}>
          <IntialLayout />
        </SafeAreaView>
      </SafeAreaProvider>
    </ClearkAndConvexProvider >

  )
}
