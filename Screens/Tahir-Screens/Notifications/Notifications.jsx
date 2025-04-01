import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyNotifications } from "../../../API_Callings/R1_API/Auth";
import { ActivityIndicator } from "react-native-paper";
import { timeAgo } from "../../../utils/R1_utils";
import { useNavigation } from "@react-navigation/native";

const LIMIT = 10;

const NotificationScreen = () => {
  const navigation = useNavigation();

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: ({ pageParam = 1 }) => getMyNotifications(pageParam, LIMIT),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data?.notifications?.length === LIMIT
        ? allPages.length + 1
        : undefined;
    },
  });


  const notifications = data?.pages.flatMap((page) => page?.data?.notifications) || [];

  console.log("no",notifications);
  
  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        if (item.notificationType === "car") {
          navigation.navigate("Home", {
            screen: "AdDetails",
            params: { carId: item.metaData.car },
          });
        }
        // Optionally, mark as read when clicked
      }}
      style={[
        styles.notificationItem,
        !item.isRead && styles.unreadNotification, // Apply different styles for unread notifications
      ]}
    >
      <Avatar
        rounded
        source={{
          uri:
            item.user.imgUrl ||
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
        }}
        size={45}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.user.name}</Text>
        <Text style={[styles.message, !item.isRead && styles.unreadMessage]}>
          {item.body}
        </Text>
        <Text style={styles.time}>{timeAgo(item.createdAt)}</Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <SectionHeader title={"Notifications"} />
      
      {isLoading && <ActivityIndicator />}

      {!isLoading && notifications.length > 0 && (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item._id}
          renderItem={renderNotificationItem}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator size="small" /> : null
          }
        />
      )}

      {!isLoading && notifications.length === 0 && (
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
          <View style={styles.emptyContent}>
            <Text style={styles.emptyText}>There are no notifications yet!</Text>
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
    padding:10,
    paddingHorizontal:0,
    justifyContent: "flex-start",
    backgroundColor:"#fff",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
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
  emptyContent: {
    gap: 10,
    padding: 10,
    paddingHorizontal: 20,
    alignItems: "center",
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
  unreadNotification: {
    backgroundColor: "#E3F2FD", // Light blue background for unread notifications
  },
  unreadMessage: {
    fontWeight: "bold", // Bold text for unread messages
    color: "#000", // Darker text to highlight unread status
  },
  
});

export default NotificationScreen;
