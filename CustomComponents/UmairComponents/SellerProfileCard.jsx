import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import SectionHeader from "../SectionHeader";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { getChatId } from "../../API_Callings/R1_API/Chat";

const SellerProfileCard = ({
  name = "ADAM WILLIAMS",
  user,
  car,
  status = "Private Seller",
  ShowChatOptions = true,
  profileImage = "https://randomuser.me/api/portraits/men/32.jpg",
}) => {

  const navigation = useNavigation();

  const chatNowMutation = useMutation({
    mutationFn: getChatId,
  });

  const handleChatNow = async () => {
    try {
      const result = await chatNowMutation.mutateAsync({userId: car.user._id, carId: car._id});
      console.log(result);
      navigation.navigate('Messages');
      navigation.navigate('Messages' , {screen: 'ActiveChatBox', params: {chatId: result.data.chatId}})
    }
    catch(e) {
      console.log(e);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.status}>{status}</Text>
          </View>
        </View>
        {ShowChatOptions && (
          <View>
            <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate("OwnerProfile", {userId: user})}>
              <Text style={styles.viewAllText}>All Listings</Text>
              <Icon
                name="chevron-right"
                type="material"
                size={20}
                color={GlobalStyles.colors.ButtonColor}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewAllButton} onPress={handleChatNow}>
              <Text style={styles.viewAllText}>{chatNowMutation.isPending ? 'Please wait...' : 'Chat Now'}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    width: "100%",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  textContainer: {
    justifyContent: "center",
  },
  name: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: "#212121",
    marginBottom: 2,
  },
  status: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#757575",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: '1',
  },
  viewAllText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: GlobalStyles.colors.ButtonColor,
    marginLeft: 5,
  },
});

export default SellerProfileCard;
