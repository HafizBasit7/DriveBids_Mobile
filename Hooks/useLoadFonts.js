import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function useLoadFonts() {
  const [fontsLoaded] = useFonts({
    'Poppins-Black': require('../assets/Fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/Fonts/Poppins-Bold.ttf'),
    'Poppins-Regular': require('../assets/Fonts/Poppins-Regular.ttf'),
    'Poppins-Thin': require('../assets/Fonts/Poppins-Thin.ttf'),
    'Poppins-Medium': require('../assets/Fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/Fonts/Poppins-SemiBold.ttf'),
  });

  const [isFontReady, setFontReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      // Prevent the splash screen from auto-hiding
      await SplashScreen.preventAutoHideAsync();

      if (fontsLoaded) {
        setFontReady(true);
        // Only hide splash screen when fonts are fully loaded
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  return isFontReady;
}
