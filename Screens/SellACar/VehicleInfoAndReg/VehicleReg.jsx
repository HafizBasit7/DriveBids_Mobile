import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import CustomButton from "../../../CustomComponents/CustomButton";
// import { Svg, Line } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";

const VehicleReg = () => {
  const navigation = useNavigation(); // Initialize navigation
  const {carState, dispatch} = useCar();

  function onChangeTextReg(value) {
    dispatch({
      type: 'UPDATE_FIELD',
      field: 'regNo',
      value,
    })
  }

  function nextPage() {
    if(!carState.regNo) {
      console.log('Enter reg no');
      return;
    } else {
      navigation.navigate("VehicleInfo")
    }
  }

  return (
    <View style={styles.container}>
      <SectionHeader title={"Vehicle Registration"} />
      <View style={styles.head}>
        <Text style={styles.label}>
          Enter your vehicle's Registration Number:
        </Text>
        <TextInput 
          style={styles.input} 
          placeholder="Registration Number" 
          value={carState.regNo}
          onChangeText={onChangeTextReg} 
        />
        <CustomButton
          title="Sell my car"
          onPress={nextPage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    backgroundColor: GlobalStyles.colors.ScreenBg,
  },
  head: {
    justifyContent: "flex-start",
    marginTop: 20,
    paddingHorizontal: 20,
    width: "100%",
    gap: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    marginBottom: 10,
  },
  input: {
    paddingHorizontal: 15,
    paddingTop: 18,
    paddingBottom: 18,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,

    fontFamily: "Inter-Regular",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 10,
  },
});

export default VehicleReg;
