import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Switch,
} from "react-native";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import CustomButton from "../../../CustomComponents/CustomButton";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import Header from "../../../CustomComponents/Header";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { getNotificationSettings, updateNotificationSettings } from "../../../API_Callings/R1_API/Auth";
import { ActivityIndicator } from "react-native-paper";

export default function NotificationSettingsScreen() {

  const queryClient = useQueryClient();

  const {data, isLoading} = useQuery({
    queryKey: ['notificationSettings'],
    queryFn: getNotificationSettings,
  });

  const updateMutation = useMutation({
    mutationFn: updateNotificationSettings,
    onMutate: async (payload) => {
      await queryClient.cancelQueries('notificationSettings');
      const previousNotificationSettings = queryClient.getQueryData(['notificationSettings']);

      const newData = {...previousNotificationSettings};
      newData.data.notificationSettings = {
        ...newData.data.notificationSettings,
        ...payload,
      };

      queryClient.setQueryData(["notificationSettings"], newData);

      return {previousNotificationSettings};
    },
    onError: async (_error, _newMessage, context) => {
      queryClient.setQueryData(["notificationSettings"], context.previousNotificationSettings);
    },
  });

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

  const saveSettings = async (key, value) => {
    updateMutation.mutate({[key]: value});
  };

  return (
    <View style={styles.container}>
      <Header showSearch={false} title={' Notification Settings'}/>
       <View style={{ backgroundColor: "#fff", paddingTop: 10,}}> 
         {/* <SectionHeader title={"Notifications Setting"} /> */}
         </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Common Section */}
        {isLoading && (<ActivityIndicator style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}/>)}
        {!isLoading && (
          <View style={styles.section}>
            {/* <Text style={styles.sectionTitle}>Common</Text> */}

            <View style={styles.settingItem}>
              <Text style={styles.settingText}>New Chat</Text>
              {renderSwitch(data.data.notificationSettings.newChat, () => saveSettings('newChat', !data.data.notificationSettings.newChat))}
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Car Sold (Buy Now)</Text>
              {renderSwitch(data.data.notificationSettings.carSold, () => saveSettings('carSold', !data.data.notificationSettings.carSold))}
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Bid Accepted</Text>
              {renderSwitch(data.data.notificationSettings.bidAccepted, () => saveSettings('bidAccepted', !data.data.notificationSettings.bidAccepted))}
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Bid Placed</Text>
              {renderSwitch(data.data.notificationSettings.bidPlaced, () => saveSettings('bidPlaced', !data.data.notificationSettings.bidPlaced))}
            </View>
          </View>
        )}

        
        {/* <View style={styles.divider} /> */}
        {/* System & Services Update Section */}
        {/* <View style={styles.section}>
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
        </View> */}
        {/* <View style={styles.divider} /> */}
        {/* Others Section */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Others</Text>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>New Service Available</Text>
            {renderSwitch(newServiceAvailable, setNewServiceAvailable)}
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>New Tips Available</Text>
            {renderSwitch(newTipsAvailable, setNewTipsAvailable)}
          </View>
        </View> */}
      </ScrollView>
      
      {/* <View style={styles.buttonContainer}> */}
          {/* <CustomButton
            style={{ marginBottom: 10 }}
            title="Save Changes"
            onPress={() => console.log("Save Settings")}
          /> */}
          {/* <CustomButton
            title="Back"
            style={styles.nextButton}
            textStyle={styles.nextButtonText}
            onPress={() => console.log("Go bAck from Notification Setting")}
          /> */}
        {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor:"#fff"
  },
  scrollView: {
    flex: 1,
     backgroundColor:"#fff"
  },
  section: {
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
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
    
    marginBottom: 10,
   borderTopColor:"#000",
   borderBottomColor:"#000",
   borderWidth:0.3,
   borderRadius:10,
   padding:8
   
    
  },
  settingText: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    color: "#333",
    fontWeight:700
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
    marginBottom:"8%"
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
