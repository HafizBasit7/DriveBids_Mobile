import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { chatData } from "./DummyMessages";
import { GlobalStyles } from "../../../Styles/GlobalStyles";

const ActiveChatBox = () => {
  const [messages, setMessages] = useState(chatData);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim().length > 0) {
      setMessages([
        ...messages,
        { id: Date.now().toString(), text: newMessage, sender: "user" },
      ]);
      setNewMessage("");
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userMessage : styles.agentMessage,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.sender === "user" ? styles.userText : styles.agentText,
        ]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=10" }}
          style={styles.avatar}
        />
        <Text style={styles.username}>Bryan</Text>
        <Ionicons
          name="ellipsis-vertical"
          size={24}
          color="white"
          style={styles.optionsIcon}
        />
      </View>

      {/* Messages List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        style={styles.chatList}
        inverted
      />

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.plusButton}>
          <Ionicons
            name="add-outline"
            size={24}
            color={GlobalStyles.colors.ButtonColor}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Message"
          placeholderTextColor="#999"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.Default,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: "black",
    marginLeft: 10,
    flex: 1,
  },
  optionsIcon: {
    paddingHorizontal: 10,
    color: "black",
  },
  chatList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  messageContainer: {
    maxWidth: "75%",
    borderRadius: 12,
    padding: 10,
    marginVertical: 5,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: GlobalStyles.colors.ButtonColor,
  },
  agentMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderWidth: 0.6,
    borderColor: "#E6E6E6",
  },
  messageText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#333",
  },
  userText: {
    color: "white",
  },
  agentText: {
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
  },
  plusButton: {
    marginRight: 10,
    color: GlobalStyles.colors.ButtonColor,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    paddingVertical: 8,
    color: "#333",
  },
  sendButton: {
    backgroundColor: GlobalStyles.colors.ButtonColor,
    padding: 10,
    borderRadius: 50,
  },
});

export default ActiveChatBox;
