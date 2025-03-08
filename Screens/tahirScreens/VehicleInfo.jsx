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
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

// import { Svg, Line } from "react-native-svg";

const VehicleInfo = () => {
  return (
    <View style={styles.container}>
      <SectionHeader title={"Vehicle Information"} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.head}>
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
          onPress={() => alert("Car Images Clicked")}
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
          title="Post Ad"
        />
        <CustomButton
          title=" Save Draft"
          style={{
            backgroundColor: "transparent",
            borderColor: GlobalStyles.colors.ButtonColor,
            borderWidth: 1,
            marginBottom: 2,
          }}
          textStyle={{
            color: GlobalStyles.colors.ButtonColor,
            fontFamily: "Inter-SemiBold",
          }}
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

export default VehicleInfo;
