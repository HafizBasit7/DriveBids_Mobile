import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";

const VehicleReg = () => {
  const navigation = useNavigation();
  const { carState, dispatch } = useCar();

  function onChangeTextReg(value) {
    dispatch({
      type: 'UPDATE_FIELD',
      field: 'regNo',
      value,
    });
  }

  function nextPage() {
    if (!carState.regNo) {
      console.log('Enter reg no');
      return;
    } else {
      navigation.navigate("VehicleInfo");
    }
  }

  return (
    <View style={styles.container}>
      <SectionHeader title={"Vehicle Registration"} />
      <View style={styles.head}>
        <Text style={styles.label}>
          Enter your vehicle's Registration Number:
        </Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={carState.regNo}
            onChangeText={onChangeTextReg}
          />
          {carState.regNo === '' && (
            <Text style={styles.placeholder}> A12345</Text>
          )}
        </View>

        <CustomButton
          title="Sell my car"
          onPress={nextPage}
          disabled={carState.regNo.trim() === ''}
          backgroundColor={carState.regNo.trim() === '' ? '#ccc' : GlobalStyles.colors.primary}
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
  inputWrapper: {
    position: 'relative',
    width: "100%",
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
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 18,
    color: "#000",
  },
  placeholder: {
    position: 'absolute',
    left: 15,
    top: 18,
    fontSize: 18,
    fontFamily: "Inter-Light",
    fontWeight: "500",
    color: "#999",
  },
});

export default VehicleReg;
