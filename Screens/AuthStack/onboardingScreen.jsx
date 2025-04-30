import { useState } from "react";
import {
  View,
  Text,
  
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { onboardingData } from "../../utils/onBoarding";
import { useNavigation } from "@react-navigation/native";
import GestureRecognizer from "react-native-swipe-gestures";
import { Image } from "expo-image";

// Import SVGs
import Car1Svg from "../../assets/UmairAssets/OnBoard1.svg";
import LogoSvg from "../../assets/UmairAssets/Logo.svg";
import Car2Svg from "../../assets/UmairAssets/OnBoard3.svg";
import Car3Svg from "../../assets/UmairAssets/OnBoard3.2.svg";
import { useAuth } from "../../R1_Contexts/authContext";

const { width, height } = Dimensions.get("window");

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  //Auth Context
  const {onboardingComplete} = useAuth();

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSkip = () => {
    setCurrentIndex(onboardingData.length - 1);
  };

  const R1_onNavigate = (routeName) => {
    onboardingComplete();
    navigation.navigate(routeName);
  };

  return (
    <GestureRecognizer
      onSwipeLeft={handleNext}
      onSwipeRight={handlePrevious}
      config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }}
      style={styles.safeContainer}
    >
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        {/* Background Image */}
        <Image
          source={
            currentIndex === 1 || currentIndex === 3
              ? require("../../assets/Vector2.png")
              : require("../../assets/Vector1.png")
          }
          style={styles.bgImage}
          contentFit="cover"
        />

        {/* Logo at the Top */}
        <View style={styles.logoContainer}>
          <View style={styles.logoWrapper}>
            <LogoSvg width="100%" height="100%" />
          </View>
        </View>

        {/* SVGS and PNGS */}
        <View style={styles.svgContainer}>
          {currentIndex === 0 ? (
            <Car1Svg width={300} height={250} style={styles.carSvg} />
          ) : currentIndex === 1 ? (
            <Image
              source={require("../../assets/UmairAssets/OnBoard2Png.png")}
              style={styles.handRight}
              contentFit="contain"
            />
          ) : currentIndex === 2 ? (
            <>
              <Car2Svg width={300} height={250} style={styles.Car2Svg} />
              <Car3Svg width={300} height={250} style={styles.Car3Svg} />
            </>
          ) : (
            <Image
              source={require("../../assets/car4.png")}
              style={styles.car4}
              contentFit="contain"
            />
          )}
        </View>

        {/* Bottom Content */}
        <View style={styles.bottomContent}>
          <Text style={styles.title}>{onboardingData[currentIndex].title}</Text>
          <Text style={styles.description}>
            {onboardingData[currentIndex].description}
          </Text>

          <View style={styles.bottomContainer}>
            {currentIndex < onboardingData.length - 1 ? (
              <TouchableOpacity
                onPress={handleNext}
                style={[styles.button, styles.nextButton]}
              >
                <Text style={[styles.buttonText, { color: "#fff" }]}>{currentIndex === 0 ? "Start Your Journey" : "Experience Live Bidding"} </Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => R1_onNavigate("Signupscreen")}
                  style={[styles.button, styles.signupButton]}
                >
                  <Text style={[styles.buttonText, { color: "#fff" }]}>
                    Sign Up </Text>
                </TouchableOpacity>
                <Text style={styles.signupText}>Already have an account? </Text>
              </>
            )}

            <View style={styles.dotsContainer}>
              {onboardingData.map((_, dotIndex) => (
                <TouchableOpacity
                  key={dotIndex}
                  onPress={() => setCurrentIndex(dotIndex)}
                >
                  <View
                    style={[
                      styles.dot,
                      currentIndex === dotIndex && styles.activeDot,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {currentIndex < onboardingData.length - 1 ? (
              <TouchableOpacity
                onPress={handleSkip}
                style={[styles.button, styles.skipButton]}
              >
                <Text style={[styles.buttonText, { color: "#18B0F8" }]}>
                  Skip </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => R1_onNavigate("SignInScreen")}
                style={[styles.button, styles.loginButton]}
              >
                <Text style={[styles.buttonText, { color: "#18B0F8" }]}>
                  Login </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    height: "100%",
  },

  bgImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "12%",
  },

  /* Top Logo */
  logoContainer: {
    alignItems: "center",
    marginTop: "10%",
  },
  logoWrapper: {
    width: width * 0.5, // Adjust width dynamically
    height: height * 0.15, // Adjust height dynamically
  },

  svgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  carSvg: {
    width: "100%",
    height: "100%",
    alignSelf: "start",
    transform: [{ scaleX: Platform.OS === "ios" ? -1 : 1 }],
  },
  Car2Svg: {
    position: "absolute",
    bottom: "-5%",
    left: "-10%",
  },

  Car3Svg: {
    position: "absolute",
    top: "-25%",
    right: "-5%",
  },

  handRight: {
    width: width * 0.7,
    height: height * 0.8,
    resizeMode: "contain",
    position: "absolute",
    right: "2%",
    bottom: Platform.OS === "ios" ? "-40%" : "-40%",
    transform: [{ rotate: "-10deg" }],
  },

  car4: {
    width: "100%",
    height: "100%",
    position: "absolute",
    right: "-30%",
    bottom: "4%",
    alignSelf: "end",
  },

  bottomContent: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: "2%",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#3A3A3A",
    textAlign: "center",
    fontFamily: "Inter-Regular",
  },
  description: {
    fontSize: 16,
    color: "#3A3A3A",
    textAlign: "center",
    marginTop: "3%",
    paddingHorizontal: "5%",
    width: "100%",
    alignSelf: "center",
    fontFamily: "Inter-Regular",
  },

  bottomContainer: { alignItems: "center", width: "100%", marginTop: "4%" },

  button: {
    paddingVertical: "3%",
    borderRadius: 15,
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "2%",
  },
  nextButton: { backgroundColor: "#2F61BF", paddingVertical: "4%" },

  loginButton: { borderWidth: 2, borderColor: "#00DBFF" },
  signupButton: { backgroundColor: "#2F61BF" },
  skipButton: { borderWidth: 2, borderColor: "#18B0F8" },

  dotsContainer: { flexDirection: "row", marginVertical: "5%" },
  dot: {
    width: 11,
    height: 11,
    borderRadius: 50,
    backgroundColor: "#fff",
    marginHorizontal: 5,
  },
  activeDot: { backgroundColor: "#2F61BF", width: 11, height: 11 },
});

export default OnboardingScreen;
