import React, { useEffect, useState } from "react";
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
import {useInfiniteQuery, useQuery, useQueryClient} from "@tanstack/react-query";
import { getChats } from "../../../API_Callings/R1_API/Chat";
import { ActivityIndicator } from "react-native-paper";
import {timeAgo} from "../../../utils/R1_utils";
import { useAuth } from "../../../R1_Contexts/authContext";
import { useSocket } from "../../../R1_Contexts/socketContext";

const LIMIT = 10;

const ChatHeads = () => {
  const [activeTab, setActiveTab] = useState("Buying");
  const type = activeTab === 'Buying' ? 'buying' : 'selling';
  const navigation = useNavigation();
  const {authState} = useAuth();
  const {chatSocket: socket} = useSocket();
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['chats', type],
    queryFn: ({pageParam = 1}) => getChats(pageParam, LIMIT, type),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data?.chats?.length === LIMIT
        ? allPages.length + 1
        : undefined;
    },
  });

  useEffect(() => {
    if(socket) {
      socket.emit('join-room', {roomId: authState.user._id});
      socket.on('new-message-chat', handleNewMessageUpdate);
      socket.on('new-chat', handleNewChat);
    }

    return () => {
      if(socket) {
        socket?.emit('leave-room', {roomId: authState.user._id});
        socket?.off('new-message-chat');
        socket?.off('new-chat');
      }
    };
  }, [socket]);

  const chats = data?.pages.flatMap((page) => page?.data?.chats) || [];

  const handleNewChat = (chat) => {
    chat.updatedAt = new Date();
    queryClient.setQueryData(['chats', chat.type], (oldData) => {
      const newData = {...oldData};
      const newPagesData = [
        {
          ...newData.pages[0],
          data: {
            chats: [
              chat,
              ...newData.pages[0].data.chats,
            ]
          }
        },
        ...newData.pages.slice(1),
      ]
      newData.pages = newPagesData;
      return newData;
    });
  };

  const handleNewMessageUpdate = (message) => {
    const cacheData = queryClient.getQueryData(['chats', message.type]);
    const oldPagesData = [...cacheData.pages];
    let chatToUpdate;
    let newPagesData = oldPagesData.map(page => {
    const newPageChats = [...page.data?.chats.filter(chat => {
        if(chat._id === message.chat) {
          chatToUpdate = chat;
          return false;
        }
        return true;
      })]
      return {...page, data: {chats: newPageChats}};
    });
    chatToUpdate.lastMessage = message.message;
    chatToUpdate.updatedAt = new Date();
    newPagesData = [
      {
        data: {
          chats: [
            chatToUpdate,
            ...newPagesData[0].data.chats
          ],
        }
      },
      ...newPagesData.slice(1)
    ];
    queryClient.setQueryData(['chats', message.type], {pageParams: cacheData.pageParams, pages: newPagesData});
  };

  const renderMessageItem = ({ item }) => {
    const isUnread = item.isRead; 
  
    return (
      <TouchableOpacity
        style={[styles.messageItem, isUnread && { backgroundColor: "#f0f8ff" }]} 
        onPress={() => {
          navigation.navigate('ActiveChatBox', { chatId: item._id });
        }}
      >
        <Avatar
          rounded
          source={{
            uri: item.user.imgUrl || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
          }}
          size={50}
        />
        <View style={styles.textContainer}>
          <View style={styles.header}>
            <Text style={styles.name}>{item.user.name}</Text>
            <Text style={styles.time}>{timeAgo(item.updatedAt)}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-start", gap: 5 }}>
            <Text style={styles.message}>{item.car.title}</Text>
            <Text>{" | "}</Text>
            <Text style={styles.message}>{item.car.model}</Text>
          </View>
          <Text style={[styles.message, isUnread && { fontWeight: "bold", color: "#000" }]}>
            {item.lastMessage || 'Start a Conversation...'}
          </Text>
        </View>
        {/* {isUnread && <View style={styles.unreadBadge} />} */}
      </TouchableOpacity>
    );
  };
  
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
      {isLoading && (
        <ActivityIndicator style={{margin: '10'}}/>
      )}

      {!isLoading && (
        <FlatList
          data={chats}
          keyExtractor={(item) => item._id}
          renderItem={renderMessageItem}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff"
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingHorizontal:15,
    marginTop:5
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
  // unreadBadge: {
  //   width: 10,
  //   height: 10,
  //   borderRadius: 5,
  //   backgroundColor: "red", // Red dot for unread indicator
  //   position: "absolute",
  //   right: 15,
  //   top: 20,
  // },
  
});

export default ChatHeads;
