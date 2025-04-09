import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export default function useLoadFonts() {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../assets/Fonts/Poppins-Bold.ttf"),

    "Inter-Bold": require("../assets/Fonts/Inter_18pt-Bold.ttf"),
    "Inter-Regular": require("../assets/Fonts/Inter_18pt-Regular.ttf"),

    "Inter-SemiBold": require("../assets/Fonts/Inter_18pt-SemiBold.ttf"),
  });

  const [isFontReady, setFontReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      // Prevent the splash screen from auto-hiding
      await SplashScreen.preventAutoHideAsync();

      if (fontsLoaded) {
        setFontReady(true);
        // Do not hide splash screen, hide on auth load completion
        // await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  return isFontReady;
}
