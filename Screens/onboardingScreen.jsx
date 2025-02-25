import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { onboardingData } from "../utils/onBoarding";
import { useNavigation } from "@react-navigation/native";

// Import SVGs
import Car1Svg from "../assets/SVG/TahirSvgs/car1.svg";
import HandSvg from "../assets/SVG/TahirSvgs/handsvg.svg";

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
        <Image
          source={require("../assets/mainlogo.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      {/* SVG in the Middle */}
      <View style={styles.svgContainer}>
        {currentIndex === 0 ? (
          // First Screen → Car1 SVG
<Car1Svg style={styles.carSvg} />        ) : currentIndex === 1 ? (
          // Second Screen → Board SVG (Two Times)
          <Image
          source={require("../assets/handsvg.png")}
          style={styles.handRight}
          resizeMode="contain"
        />        ) : currentIndex === 2 ? (
          // Second Screen → Board SVG (Two Times)
          <Image
          source={require("../assets/cardhand.png")}
          style={styles.cardhand}
          resizeMode="contain"
        />        ): (

          <Image
          source={require("../assets/car4.png")}
          style={styles.car4}
          resizeMode="contain"
        />        )}
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
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
              style={[styles.button, styles.signupButton]}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          )}

<View style={styles.dotsContainer}>
  {onboardingData.map((_, dotIndex) => (
    <TouchableOpacity key={dotIndex} onPress={() => setCurrentIndex(dotIndex)}>
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
              <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={[styles.button, styles.loginButton]}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },

  bgImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "10%", // Use percentage here for a relative top offset
  },

  /* Top Logo */
  logoContainer: {
    alignItems: "center",
    marginTop: "3%", // Adjust with percentage for relative positioning
    height:"20%"
  },
  logoImage: {
    width: "100%", // Use percentage for responsive width
    height: "100%", // Use percentage for responsive height
  },


  svgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", 
    height:"50%",
    width:"100%"
  },
  carSvg: {
    width: "50%", // Adjust the size dynamically
    height: "30%", // Adjust height accordingly
    alignSelf: "start", // Center it within the container
  },
  handRight: {
    width: "100%",
    height: "100%", // Percentage for responsive height
    position: "absolute",
    right: "-35%",
    bottom: "-10%", 
    transform: [{ rotate: "-25deg" }],
    alignSelf: "end", // Center it within the container

  },

  cardhand: {
    width: "100%", // Responsive width
    height: "100%", // Responsive height
    position: "absolute",
    right: "-20%",
    bottom: "-15%", // Percentage based top position
    transform: [{ rotate: "-80deg" }],
    alignSelf: "end", // Center it within the container

  },
  car4: {
    width: "100%", // Use percentage for responsive width
    height: "100%", // Use percentage for responsive height
    position: "absolute",
    right: "-28%",
    bottom: "-12%", // Adjust the bottom position
    transform: [{ rotate: "0deg" }],
    alignSelf: "end", 

  },

  bottomContent: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: "5%",
    paddingBottom: "3%",
  },

  title: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    color: "#3A3A3A",
    textAlign: "center",
  },
  description: {
    fontSize: width * 0.04,
    color: "#3A3A3A",
    textAlign: "center",
    marginTop: "3%", // Percentage margin for spacing
  },

  bottomContainer: { alignItems: "center", width: "100%", marginTop: "2%" },

  button: {
    paddingVertical: "3%",
    borderRadius: 15,
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "2%", // Use percentage for vertical spacing
  },
  nextButton: { backgroundColor: "#2F61BF" },
  loginButton: { borderWidth: 2, borderColor: "#00DBFF" },
  signupButton: { backgroundColor: "#2F61BF" },
  skipButton: { borderWidth: 2, borderColor: "#18B0F8" },

  buttonText: {
    color: "#fff",
    fontSize: width * 0.045,
    textAlign: "center",
    width: "100%",
  },

  dotsContainer: { flexDirection: "row", marginVertical: "5%" }, // Adjust spacing
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
