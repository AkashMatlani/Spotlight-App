import ClearkAndConvexProvider from "@/providers/ConvexAndProvider";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import IntialLayout from "./components/IntialLayout";

export default function RootLayout() {
  return (
    <ClearkAndConvexProvider >
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
            <IntialLayout />
          </SafeAreaView>
        </SafeAreaProvider>
    </ClearkAndConvexProvider >

  )
}
