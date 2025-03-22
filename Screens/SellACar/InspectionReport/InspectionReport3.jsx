import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import CustomButton from "../../../CustomComponents/CustomButton";
import { Svg, Line } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";
import DialogBox from "../../../CustomComponents/DialogBox";
const options = [
  { label: "OK", color: "#2ECC71", icon: "check-circle" },
  { label: "Not Tested", color: "#D32F2F", icon: "cancel" },
  { label: "Requires Some Attention", color: "#F39C12", icon: "error" },
  { label: "Requires Immediate Attention", color: "#C0392B", icon: "report" },
];

const tests = [
  {name: "Engine Management Light", target: "engineManagementLight"},
  {name: "Brake Wear Indicator Light", target: "breakWearIndicatorLight"},
  {name: "Abs Warning Light", target: "absWarningLight"},
  {name: "Oil Warning Light", target: "oilWarningLight"},
  {name: "Airbag warning light", target: "airbagWarningLight"},
  {name: "Glow plug light", target: "glowPlugLight"},
];


const InspectionReport3 = () => {
  const navigation = useNavigation();
  
  const {carState, dispatch, draftSave} = useCar();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
        await draftSave('carInspectionReport');
        setMessage({type: 'success', message: 'Car Saved', title: 'Success'});
    }
    catch(e) {
        setMessage({type: 'error', message: e.message || e.msg, title: 'Error'});
    } finally {
      setLoading(false);
    }
  };

  const onOk = () => {
    if(message?.type === 'error') {
      setMessage(null);
    } else {
      setMessage(null); navigation.popTo("VehicleInfo");
    }
  };
  
  function handleSelectTest (field, value) {
    dispatch({
      type: "UPDATE_FIELD",
      section: 'carInspectionReport',
      subSection: 'interiorChecks',
      field: field,
      value,
    });
  };

  return (
    <View style={styles.container}>
      <DialogBox
        visible={loading ? true : message ? true : false}
        message={message?.message}
        onOkPress={onOk}
        type={message?.type}
        loading={loading}
        title={message?.title || ''}
      />

      <View style={{ width: "100%" }}>
        <SectionHeader title={"Step 3 of 3"} marginCustom={5} />
        <SectionHeader
          sx={{ fontSize: 18, fontWeight: "500", fontFamily: "Inter-SemiBold" }}
          title={"Inspection Report"}
          marginCustom={0}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: "#DADADA",
            borderRadius: 12,
            paddingVertical: 10,
            paddingHorizontal: 5,
          }}
        >
          <View style={styles.dynamicButton}>
            <Text style={styles.dynamicButtonText}>Interior Checks</Text>
          </View>
          {tests.map((test, index) => (
            <View key={index} style={styles.testSection}>
              <Text style={styles.testTitle}>{test.name}</Text>
              {options.map((option, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.option,
                    (carState.carInspectionReport?.interiorChecks ?? {})[test.target] === option.label && {
                      backgroundColor: "#F5F5F5",
                      fontWeight: "700",
                    },
                  ]}
                  onPress={() => handleSelectTest(test.target, option.label)}
                >
                  <View
                    style={[
                      {
                        borderColor: "#DADADA",
                        borderWidth: 2,
                        borderRadius: 8,
                      },
                      (carState.carInspectionReport?.interiorChecks ?? {})[test.target] === option.label && {
                        borderColor: GlobalStyles.colors.ButtonColor,
                        borderWidth: 1,
                      },
                    ]}
                  >
                    <MaterialIcons
                      name={option.icon}
                      size={18}
                      color={
                        (carState.carInspectionReport?.interiorChecks ?? {})[test.target] === option.label
                          ? option.color
                          : "#B0B0B0"
                      }
                    />
                  </View>
                  <Text
                    style={[
                      styles.optionText,
                      (carState.carInspectionReport?.interiorChecks ?? {})[test.target]=== option.label && {
                        fontWeight: "700",
                      },
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
              <Svg height="1" width="100%" style={{ marginTop: 10 }}>
                <Line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="#DADADA"
                  strokeWidth="2"
                />
              </Svg>
            </View>
          ))}
        </View>
      </ScrollView>

      <CustomButton
        title="Save"
        onPress={handleSaveDraft}
      />
      <CustomButton
        onPress={() => navigation.goBack()}
        title="Back"
        style={styles.nextButton}
        textStyle={styles.nextButtonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: GlobalStyles.colors.ScreenBg,
    justifyContent: "space-between",
    alignItems: "center",
  },
  scrollView: {
    width: "100%",
    marginVertical: 10,
  },
  dynamicButton: {
    backgroundColor: GlobalStyles.colors.ButtonColor,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: "center",
  },
  dynamicButtonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
  },
  testSection: {
    borderRadius: 10,
    padding: 10,
  },
  testTitle: {
    fontSize: 14,

    marginBottom: 2,
    fontFamily: "Inter-SemiBold",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginVertical: 1,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 12,
    fontFamily: "Inter-Regular",
  },
  nextButton: {
    backgroundColor: "transparent",
    borderColor: GlobalStyles.colors.ButtonColor,
    borderWidth: 1,
    marginBottom: 2,
  },
  nextButtonText: {
    color: GlobalStyles.colors.ButtonColor,
    fontFamily: "Inter-SemiBold",
  },
});

export default InspectionReport3;
