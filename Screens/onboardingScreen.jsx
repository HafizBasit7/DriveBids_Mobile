import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Platform,
} from "react-native";
import { onboardingData } from "../utils/onBoarding";
import { useNavigation } from "@react-navigation/native";

// Import SVGs
import Car1Svg from "../assets/UmairAssets/OnBoard1.svg";
import LogoSvg from "../assets/UmairAssets/Logo.svg";
import Car2Svg from "../assets/UmairAssets/OnBoard3.svg";
import Car3Svg from "../assets/UmairAssets/OnBoard3.2.svg";

const { width, height } = Dimensions.get("window");

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSkip = () => {
    setCurrentIndex(onboardingData.length - 1);
  };

  return (
    <View style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Background Image */}
        <Image
          source={
            currentIndex === 1 || currentIndex === 3
              ? require("../assets/Vector2.png")
              : require("../assets/Vector1.png")
          }
          style={styles.bgImage}
          resizeMode="cover"
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
              source={require("../assets/UmairAssets/OnBoard2Png.png")}
              style={styles.handRight}
              resizeMode="contain"
            />
          ) : currentIndex === 2 ? (
            <>
              <Car2Svg width={300} height={250} style={styles.Car2Svg} />
              <Car3Svg width={300} height={250} style={styles.Car3Svg} />
            </>
          ) : (
            <Image
              source={require("../assets/car4.png")}
              style={styles.car4}
              resizeMode="contain"
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
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SignUp")}
                  style={[styles.button, styles.signupButton]}
                >
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <Text style={styles.signupText}>Already have an account?</Text>
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
                  Skip
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={[styles.button, styles.loginButton]}
              >
                <Text style={[styles.buttonText, { color: "#18B0F8" }]}>
                  Login
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
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
    width: width * 0.7, // Increase width (80% of screen width)
    height: height * 0.8, // Increase height (50% of screen height)
    resizeMode: "contain", // Ensure the image scales proportionally
    position: "absolute",
    right: "2%",
    bottom: Platform.OS === "ios" ? "-60%" : "-40%", // Adjust bottom position for iOS
    transform: [{ rotate: "-10deg" }], // Rotate the image
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
    // paddingHorizontal: "5%",
    paddingBottom: "2%",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#3A3A3A",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#3A3A3A",
    textAlign: "center",
    marginTop: "3%",
    paddingHorizontal: "5%", // Add padding to ensure proper centering
    width: "100%", // Set a width to keep text centered
    alignSelf: "center", // Ensure alignment
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

  buttonText: {
    color: "#fff",
    fontSize: width * 0.045,
    textAlign: "center",
    width: "100%",
  },

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
