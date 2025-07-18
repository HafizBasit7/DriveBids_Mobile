import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";
const SellCar = () => {

  const {resetDraftState} = useCar();

  const navigation = useNavigation(); // Initialize navigation
  return (
    <View style={styles.container}>
      <SectionHeader title={"Sell Your Car"} />
      <TouchableOpacity
        style={styles.buttonPrimary}
        onPress={() => {navigation.navigate("VehicleReg"); resetDraftState();}}
      >
        <FontAwesome5 name="car" size={24} color="white" />
        <Text style={styles.buttonText}>Create New Listing</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigation.navigate("Draft")}
      >
        <FontAwesome5 name="edit" size={24} color="black" />
        <Text style={styles.buttonTextSecondary}>Drafts</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: GlobalStyles.colors.ScreenBg,
  },
  titleHead: {
    width: "90%",
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  headInner: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  buttonPrimary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2F61BF",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    marginTop: 20,
    height: 70,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    marginLeft: 10,
    textAlign: "center",
  },
  buttonSecondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#E1E3E5",
    borderWidth: 1.5,
    padding: 15,
    borderRadius: 10,
    width: "90%",
    marginTop: 15,
    height: 70,
  },
  buttonTextSecondary: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
});

export default SellCar;
