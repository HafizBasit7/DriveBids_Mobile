import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import { notificationsData } from "./DummyNotifications";

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState(notificationsData);

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        console.log("Notification Pressed Id: " + item.id);
      }}
      style={styles.notificationItem}
    >
      <Avatar rounded source={{ uri: item.avatar }} size={45} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SectionHeader title={"Notifications"} />
      {notifications.length > 5 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotificationItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon
            name={"notifications-off"}
            size={90}
            type="material"
            color={"white"}
            containerStyle={{
              backgroundColor: GlobalStyles.colors.ButtonColor,
              padding: 10,
              borderRadius: 100,
            }}
          />
          <View style={{ gap: 10, padding: 10, paddingHorizontal: 20 }}>
            <Text style={styles.emptyText}>
              There are no notifications yet!
            </Text>
            <Text style={styles.emptySubText}>
              Your notifications will appear on this page
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    justifyContent: "flex-start",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#333",
  },
  message: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#666",
  },
  time: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#999",
    marginTop: 3,
  },
  emptyContainer: {
    flex: 1,
    gap: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  emptyText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
    color: "#333",
  },
  emptySubText: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    color: "#777",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default NotificationScreen;
