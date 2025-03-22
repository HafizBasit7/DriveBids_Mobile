import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { chatData } from "./DummyMessages";
import { GlobalStyles } from "../../../Styles/GlobalStyles";

const ActiveChatBox = () => {
  const [messages, setMessages] = useState(chatData);
  const [newMessage, setNewMessage] = useState("");
  const [keyboardStatus, setKeyboardStatus] = useState(0);
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(1);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(0);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const sendMessage = () => {
    if (newMessage.trim().length > 0) {
      setMessages([
        { id: Date.now().toString(), text: newMessage, sender: "user" },
        ...messages,
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
   
   
<>

<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={styles.header}>
      
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=10" }}
          style={styles.avatar}
        />
        <Text style={styles.username}>Bryans</Text>
        <Ionicons
          name="ellipsis-vertical"
          size={24}
          color="black"
          style={styles.optionsIcon}
        />
      </View>

    
      <View style={styles.itemDetailsContainer}>
        <Image
          source={{
            uri: "https://wpassets.graana.com/blog/wp-content/uploads/2023/01/bmw-i8-in-blue-colours-with-opened-doors.jpg",
          }}
          style={styles.itemImage}
          defaultSource={{
            uri: "https://wpassets.graana.com/blog/wp-content/uploads/2023/01/bmw-i8-in-blue-colours-with-opened-doors.jpg",
          }}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>Honda Civic Oriel</Text>
          <View
            style={{
              flexDirection: "row",

              alignItems: "center",
            }}
          >
            <Text style={styles.itemPrice}>Top Bid: </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Inter-SemiBold",
                color: "red",
                marginTop: 4,
              }}
            >
              AED 53,000
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#999" />
      </View>

      {/* Only the chat area and input are affected by KeyboardAvoidingView */}
      <KeyboardAvoidingView
        style={[
          styles.keyboardAvoidingArea,
          { flexGrow: keyboardStatus ? 0 : 1 },
        ]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        {/* Chat list */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          style={styles.chatList}
          contentContainerStyle={styles.chatListContent}
          inverted
        />

        {/* Input field */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.plusButton}>
            <Ionicons
              name="add-outline"
              size={24}
              color={GlobalStyles.colors.ButtonColor}
            />
          </TouchableOpacity>
          <TextInput
            multiline={true}
            style={[
              styles.input,
              {
                borderRadius: 12,
                borderColor: keyboardStatus
                  ? GlobalStyles.colors.ButtonColor
                  : "#E6E6E6",
                borderWidth: keyboardStatus ? 0.6 : 1,
                paddingHorizontal: 15,
                paddingVertical: 10,
              },
            ]}
            placeholder="Type a message"
            placeholderTextColor="#999"
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
     
      </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: GlobalStyles.colors.Default,
    paddingVertical: 15,
    paddingHorizontal: 20,
    zIndex: 10,
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
  itemDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
    zIndex: 9,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: "#333",
  },
  itemPrice: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    color: "#333",
    marginTop: 2,
  },
  keyboardAvoidingArea: {
    flex: 1,
  },
  chatList: {
    flex: 1,

    paddingHorizontal: 15,
  },
  chatListContent: {
    paddingVertical: 5,
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
    paddingVertical: 5,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
  },
  plusButton: {
    marginRight: 5,
    color: GlobalStyles.colors.ButtonColor,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    paddingVertical: 8,
    color: "#333",
    marginRight: 5,
  },
  sendButton: {
    backgroundColor: GlobalStyles.colors.ButtonColor,
    padding: 10,
    borderRadius: 50,
  },
});

export default ActiveChatBox;
