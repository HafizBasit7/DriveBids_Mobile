import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import SectionHeader from "../../CustomComponents/tahirComponents/SectionHeader";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import CustomButton from "../../CustomComponents/CustomButton";
import VehicleInfoCard from "../../CustomComponents/tahirComponents/VehicleInfoCard";

const CarImages = () => {
  return (
    <View style={styles.container}>
      <SectionHeader title={"Car Images"} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.head}>
        <VehicleInfoCard
          name="Exterior Images"
          steps={6}
          iconName="car-hatchback"
          completionStatus="Completed"
          onPress={() => alert("Car Details Clicked")}
        />
        <VehicleInfoCard
          name="Interior Images"
          steps={9}
          iconName="steering"
          completionStatus="Incomplete"
          onPress={() => alert("Car Features Clicked")}
        />
        <VehicleInfoCard
          name="Wheels"
          steps={3}
          iconName="ship-wheel"
          completionStatus="Incomplete"
          onPress={() => alert("Car Images Clicked")}
        />
        <VehicleInfoCard
          name="Tyres Threads"
          steps={2}
          iconName="tire"
          completionStatus="Incomplete"
          onPress={() => alert("Inspection Report Clicked")}
        />
      </ScrollView>

      <View
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <CustomButton
          style={{
            marginBottom: 10,
          }}
          title="Save"
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
    justifyContent: "flex-start",
    alignItems: "center",

    gap: 2,
  },
  head: {
    paddingHorizontal: 5,
    width: "100%",
  },
});

export default CarImages;
