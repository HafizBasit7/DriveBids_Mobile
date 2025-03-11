import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import CustomButton from "../../../CustomComponents/CustomButton";
import VehicleInfoCard from "../../../CustomComponents/VehicleInfoCard";
import { useNavigation } from "@react-navigation/native";
const CarImages = () => {
  const navigation = useNavigation(); // Initialize navigation
  return (
    <View style={styles.container}>
      <SectionHeader title={"Car Images"} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.head}>
        <VehicleInfoCard
          name="Exterior Images"
          steps={6}
          iconName="car-hatchback"
          completionStatus="Completed"
          onPress={() => navigation.navigate("Exterior1")}
        />
        <VehicleInfoCard
          name="Interior Images"
          steps={9}
          iconName="steering"
          completionStatus="Incomplete"
          onPress={() => navigation.navigate("Interior1")}
        />
        <VehicleInfoCard
          name="Wheels"
          steps={3}
          iconName="ship-wheel"
          completionStatus="Incomplete"
          onPress={() => navigation.navigate("Wheel1")}
        />
        <VehicleInfoCard
          name="Tyres Threads"
          steps={2}
          iconName="tire"
          completionStatus="Incomplete"
          onPress={() => navigation.navigate("Thread1")}
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
          onPress={() => navigation.navigate("VehicleInfo")}
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
