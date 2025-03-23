import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-elements";
import { messagesData } from "./DummyMessages";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import Header from "../../../CustomComponents/Header";
import { useNavigation } from "@react-navigation/native";

const ChatHeads = () => {
  const [activeTab, setActiveTab] = useState("Buying");
  const navigation = useNavigation();

  const renderMessageItem = ({ item }) => (
    <TouchableOpacity style={styles.messageItem} onPress={() => {navigation.navigate('ActiveChatBox')}}>
      <Avatar rounded source={{ uri: item.avatar }} size={50} />
      <View style={styles.textContainer}>
        <View style={styles.header}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: 5,
          }}
        >
          <Text
            style={{ fontFamily: "Inter-SemiBold", fontSize: 14, opacity: 0.8 }}
          >
            {"Honda Civic Oriel "}
          </Text>
          <Text
            style={{
              fontFamily: "Inter-SemiBold",
              fontSize: 12,
              marginTop: 2,
              opacity: 0.8,
            }}
          >
            {"|"}
          </Text>
          <Text
            style={{
              fontFamily: "Inter-SemiBold",
              fontSize: 12,
              marginTop: 2,
              opacity: 0.8,
            }}
          >
            {"1994"}
          </Text>
        </View>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header showSearch={false}/>
      <SectionHeader title={"Messages"} />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab("Buying")}
          style={activeTab === "Buying" ? styles.activeTab : styles.tab}
        >
          <Text
            style={
              activeTab === "Buying" ? styles.activeTabText : styles.tabText
            }
          >
            Buying
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("Selling")}
          style={activeTab === "Selling" ? styles.activeTab : styles.tab}
        >
          <Text
            style={
              activeTab === "Selling" ? styles.activeTabText : styles.tabText
            }
          >
            Selling
          </Text>
        </TouchableOpacity>
      </View>

      {/* Messages List */}
      <FlatList
        data={messagesData}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  activeTab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: GlobalStyles.colors.ButtonColor,
  },
  tabText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "black",
  },
  activeTabText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "black",
  },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: GlobalStyles.colors.ButtonColor,
  },
  time: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#999",
  },
  message: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },
});

export default ChatHeads;
