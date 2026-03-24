import ClearkAndConvexProvider from "@/providers/ConvexAndProvider";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useCallback } from "react";
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
