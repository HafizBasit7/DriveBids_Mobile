import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import CustomButton from "../../../CustomComponents/CustomButton";
import VehicleInfoCard from "../../../CustomComponents/VehicleInfoCard";
import { useNavigation } from "@react-navigation/native";
const VehicleInfo = () => {
  const navigation = useNavigation("");
  return (
    <View style={styles.container}>
      <SectionHeader title={"Vehicle Information"} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent} // Allows content to expand
      >
        <VehicleInfoCard
          name="Car Details"
          steps={9}
          iconName="file-document"
          completionStatus="Completed"
          onPress={() => alert("Car Details Clicked")}
        />
        <VehicleInfoCard
          name="Car Features"
          steps={3}
          iconName="account"
          completionStatus="Incomplete"
          onPress={() => alert("Car Features Clicked")}
        />
        <VehicleInfoCard
          name="Car Images"
          steps={4}
          iconName="car"
          completionStatus="Incomplete"
          onPress={() => navigation.navigate("CarImages")}
        />
        <VehicleInfoCard
          name="Inspection Report"
          steps={2}
          iconName="shield-check"
          completionStatus="Incomplete"
          onPress={() => alert("Inspection Report Clicked")}
        />
        <VehicleInfoCard
          name="Damage Report"
          steps={4}
          iconName="car-wrench"
          completionStatus="Incomplete"
          onPress={() => alert("Damage Report Clicked")}
        />
        <VehicleInfoCard
          name="Car Pricing"
          steps={4}
          iconName="tag"
          completionStatus="Incomplete"
          onPress={() => alert("Car Pricing Clicked")}
        />
      </ScrollView>

      {/* Buttons placed outside the ScrollView */}
      <View style={styles.buttonContainer}>
        <CustomButton title="Post Ad" style={styles.postAdButton} />
        <CustomButton
          title="Save Draft"
          style={styles.saveDraftButton}
          textStyle={styles.saveDraftText}
          onPress={() => navigation.navigate("Draft")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: GlobalStyles.colors.ScreenBg,
  },
  scrollContent: {
    flexGrow: 1, // Ensures scrollable content does not overlap
    paddingBottom: 20, // Adds some space before buttons
  },
  buttonContainer: {
    width: "100%",
    paddingVertical: 10,
    backgroundColor: GlobalStyles.colors.ScreenBg,
  },
  postAdButton: {
    marginBottom: 10,
  },
  saveDraftButton: {
    backgroundColor: "transparent",
    borderColor: GlobalStyles.colors.ButtonColor,
    borderWidth: 1,
  },
  saveDraftText: {
    color: GlobalStyles.colors.ButtonColor,
    fontFamily: "Inter-SemiBold",
  },
});

export default VehicleInfo;
