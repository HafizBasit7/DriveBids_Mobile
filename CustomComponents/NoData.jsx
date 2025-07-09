import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Nodata = ({ ismessage, isSimilar }) => {
  return (
    <View style={styles.container}>
      {isSimilar ? (
        <Text style={[styles.text, styles.similarText]}>No Ads Found</Text>
      ) : ismessage ? (
        <>
          <MaterialCommunityIcons name="chat-remove-outline" size={55} color="#777" />
          <Text style={styles.text}>No Message Yet</Text>
        </>
      ) : (
        <>
          <MaterialCommunityIcons name="database-remove" size={55} color="#777" />
          <Text style={styles.text}>No Data Found</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#777",
    textAlign: "center",
    marginTop: 10,
  },
  similarText: {
    fontSize: 13, // Decreased size when isSimilar is true

    height:50,
    marginTop:30
    
  },
});

export default Nodata;
