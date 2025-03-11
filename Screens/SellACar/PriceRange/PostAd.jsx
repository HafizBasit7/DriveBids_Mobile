import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AddPostSvg from "../../../assets/UmairAssets/AddPost.svg"; // Correct import
import CustomButton from "../../../CustomComponents/CustomButton";

const PostAd = () => {
  return (
    <View style={styles.container}>
      {/* SVG at the top */}
      <AddPostSvg width={120} height={120} style={styles.svgImage} />

      {/* Heading */}
      <Text style={styles.heading}>Ad Posted Successfully!</Text>

      {/* Centered text */}
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet consectetur. Ipsum dolor pretium elit dolor
        neque urna. Malesuada malesuada tristique tincidunt amet aenean vel
        quis.
      </Text>

      {/* Custom Button */}
      <CustomButton title="Goto My Ads" style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start", // Move content to the top
    paddingHorizontal: 20,
  },
  svgImage: {
    marginBottom: 20, // Space between SVG and heading
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#000",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 40,
  },
  button: {
    marginTop: "100%", // Space between description and button
  },
});

export default PostAd;
