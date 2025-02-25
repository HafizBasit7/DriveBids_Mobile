import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import BackIcon from "../assets/SVG/TahirSvgs/arrow-left.svg"; // Import your SVG

const { width, height } = Dimensions.get("window");

const SignupScreen = () => {
  const [role, setRole] = useState("individual"); // Default to Individual

  return (
    <View style={styles.container}>
      {/* Back Icon (Top Left) */}
      <View style={styles.backIconContainer}>
        <BackIcon width={40} height={40} />
      </View>

      {/* Top Background Image */}
      <Image
        source={require("../assets/signup1.png")}
        style={styles.bgImageTop}
      />

      {/* Conditional Rendering for Image 2 & 3 based on role */}
      {role === "individual" ? (
        <>
          <Image
            source={require("../assets/signup3.png")}
            style={styles.bgImageBottom}
          />
          <Text style={styles.text1}>Text 1</Text>
          <Image
            source={require("../assets/signup2.png")}
            style={styles.bgImageMiddle}
          />
          <Text style={styles.text2}>Text 2</Text>
        </>
      ) : (
        <>
          <Image
            source={require("../assets/signup2.png")}
            style={styles.bgImageBottom}
          />
          <Text style={styles.text2}>Text 2</Text>
          <Image
            source={require("../assets/signup3.png")}
            style={styles.bgImageMiddle}
          />
          <Text style={styles.text1}>Text 1</Text>
        </>
      )}

      {/* Role Toggle Buttons (For Testing) */}
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            role === "individual" && styles.activeRole,
          ]}
          onPress={() => setRole("individual")}
        >
          <Text style={styles.roleText}>Individual</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleButton, role === "trader" && styles.activeRole]}
          onPress={() => setRole("trader")}
        >
          <Text style={styles.roleText}>Trader</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Back Icon */
  backIconContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10, // Ensure it's above other elements
  },

  /* Background Images */
  bgImageTop: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: height * 0.4,
  },
  bgImageMiddle: {
    position: "absolute",
    bottom: -100,
    width: "100%",
    height: "80%",
  },
  bgImageBottom: {
    position: "absolute",
    bottom: -100,
    width: "100%",
    height: "80%",
  },

  /* Text 1 (Top Left of Image 3) */
  text1: {
    position: "absolute",
    bottom: height * 0.3,
    
    left: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff",
  },

  /* Text 2 (Top Right of Image 2) */
  text2: {
    position: "absolute",
    bottom: height * 0.5,
    right: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },

  /* Role Toggle Buttons */
  roleContainer: {
    position: "absolute",
    bottom: 100,
    flexDirection: "row",
    gap: 10,
  },
  roleButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  activeRole: {
    backgroundColor: "#18B0F8",
  },
  roleText: {
    color: "#333",
  },
});

export default SignupScreen;
