import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Switch,
} from "react-native";
import { Icon } from "react-native-elements";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import CustomButton from "../../../CustomComponents/CustomButton";
import { GlobalStyles } from "../../../Styles/GlobalStyles";

export default function NotificationSettingsScreen() {
  // Common settings
  const [generalNotification, setGeneralNotification] = useState(true);
  const [sound, setSound] = useState(false);
  const [vibrate, setVibrate] = useState(true);

  // System & services update settings
  const [appUpdates, setAppUpdates] = useState(false);
  const [promotion, setPromotion] = useState(true);
  const [discountAvailable, setDiscountAvailable] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(false);

  // Others settings
  const [newServiceAvailable, setNewServiceAvailable] = useState(false);
  const [newTipsAvailable, setNewTipsAvailable] = useState(true);

  const renderSwitch = (value, onValueChange) => (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: "#e4e4e4", true: GlobalStyles.colors.ButtonColor }}
      thumbColor={"#ffffff"}
      ios_backgroundColor="#e4e4e4"
      style={styles.switch}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <SectionHeader title={"Notifications Setting"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {/* Common Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Common</Text>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>General Notification</Text>
            {renderSwitch(generalNotification, setGeneralNotification)}
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Sound</Text>
            {renderSwitch(sound, setSound)}
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Vibrate</Text>
            {renderSwitch(vibrate, setVibrate)}
          </View>
        </View>
        <View style={styles.divider} />
        {/* System & Services Update Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System & services update</Text>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>App updates</Text>
            {renderSwitch(appUpdates, setAppUpdates)}
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Promotion</Text>
            {renderSwitch(promotion, setPromotion)}
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Discount Avaiable</Text>
            {renderSwitch(discountAvailable, setDiscountAvailable)}
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Payment Request</Text>
            {renderSwitch(paymentRequest, setPaymentRequest)}
          </View>
        </View>
        <View style={styles.divider} />
        {/* Others Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Others</Text>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>New Service Available</Text>
            {renderSwitch(newServiceAvailable, setNewServiceAvailable)}
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>New Tips Available</Text>
            {renderSwitch(newTipsAvailable, setNewTipsAvailable)}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            style={{ marginBottom: 10 }}
            title="Save Changes"
            onPress={() => console.log("Save Settings")}
          />
          <CustomButton
            title="Back"
            style={styles.nextButton}
            textStyle={styles.nextButtonText}
            onPress={() => console.log("Go bAck from Notification Setting")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
    marginBottom: 5,
    color: "#000",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  settingText: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    color: "#333",
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginTop: 10,
  },
  buttonContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    alignSelf: "center",
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
