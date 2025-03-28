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
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { chatData } from "./DummyMessages";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import {useMutation, useQuery} from "@tanstack/react-query";
import { getChatCarHead, getChatMessages, sendMessage } from "../../../API_Callings/R1_API/Chat";
import { formatAmount } from "../../../utils/R1_utils";
import { useAuth } from "../../../R1_Contexts/authContext";
import {useChatSocket} from "../../../R1_Contexts/chatContext";

const ActiveChatBox = ({route}) => {
  const [newMessage, setNewMessage] = useState("");
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const navigation = useNavigation();
  const socket = useChatSocket();

  const {chatId} = route.params;
  useEffect(() => {
    if(socket) {
      socket.emit('join-room', {roomId: chatId});
    }
    return () => {
      try {socket?.emit('leave-room', {roomId: chatId});}
       catch(e) {
 
       }
    };
  }, [socket]);

  const {data: chatHeadData, isLoadingChatHead} = useQuery({
    queryKey: ['chatCarHead', chatId],
    queryFn: () => getChatCarHead(chatId)
  });
  const chatHeadDataReal = chatHeadData?.data.chatHead;

  const {data: messagesTmp, isLoading: messagesLoading} = useQuery({
    queryKey: ['messages', chatId],
    queryFn: () => getChatMessages(chatId, 1, 30),
  });

  const mutation = useMutation({
    mutationFn: () => sendMessage(chatId, newMessage),
  });

  const {authState} = useAuth();
  const user = authState.user;

  const messages = messagesTmp?.data.messages;

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    
    return () => {
      navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    };
  }, []);


  const sendMessageNew = async () => {
    await mutation.mutateAsync();
    setNewMessage('');
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === user._id ? styles.userMessage : styles.agentMessage,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.sender === user._id  ? styles.userText : styles.agentText,
        ]}
      >
        {item.message}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: chatHeadDataReal?.user.imgUrl || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{chatHeadDataReal?.user.name}</Text>
        <Ionicons
          name="ellipsis-vertical"
          size={24}
          color="black"
          style={styles.optionsIcon}
        />
      </View>

      {/* Item Details */}
      <View style={styles.itemDetailsContainer}>
        <Image
          source={{
            uri: chatHeadDataReal?.car.images.exterior[0].url,
          }}
          style={styles.itemImage}
          defaultSource={{
            uri: "https://wpassets.graana.com/blog/wp-content/uploads/2023/01/bmw-i8-in-blue-colours-with-opened-doors.jpg",
          }}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{chatHeadDataReal?.car.title}</Text>
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
                color: "green",
                marginTop: 3,
              }}
            >
              AED {chatHeadDataReal ? formatAmount(chatHeadDataReal?.car.highestBid) : 0}
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#999" />
      </View>

      {/* KeyboardAvoidingView for the chat and input */}
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={
          Platform.OS === "ios" ? "padding" : keyboardStatus ? "height" : null
        }
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        {/* Chat Messages */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item._id}
          renderItem={renderMessage}
          style={styles.chatList}
          contentContainerStyle={styles.chatListContent}
          inverted
          showsVerticalScrollIndicator={false}
        />

        {/* Input Container */}
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
          <TouchableOpacity style={styles.sendButton} onPress={sendMessageNew}>
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.Default,
    paddingTop: Platform.OS === "ios" ? 50 : 32, // Extra padding for iOS status bar
    paddingBottom: 7,
    paddingHorizontal: 5,
    paddingLeft: 22,
  },
  avatar: {
    width: 37,
    height: 37,
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
  keyboardView: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
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
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
  },
  plusButton: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    paddingVertical: 8,
    color: "#333",
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: GlobalStyles.colors.ButtonColor,
    padding: 10,
    borderRadius: 50,
  },
});

export default ActiveChatBox;