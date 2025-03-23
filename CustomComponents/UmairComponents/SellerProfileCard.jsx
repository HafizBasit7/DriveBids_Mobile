import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import SectionHeader from "../SectionHeader";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const SellerProfileCard = ({
  name = "ADAM WILLIAMS",
  user,
  status = "Private Seller",
  ShowChatOptions = false,
  profileImage = "https://randomuser.me/api/portraits/men/32.jpg",
}) => {

  const navigation = useNavigation();

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
        {ShowChatOptions ? (
          <View style={{ gap: 10 }}>
            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={onViewAllPress}
            >
              <Icon
                name="visibility"
                type="material"
                size={20}
                color={GlobalStyles.colors.ButtonColor}
              />
              <Text style={styles.viewAllText}>View All Cars</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={onViewAllPress}
            >
              <Icon
                name="chat"
                type="material"
                size={20}
                color={GlobalStyles.colors.ButtonColor}
              />
              <Text style={styles.viewAllText}>Chat Now</Text>
            </TouchableOpacity>
          </View>
        ) : (
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
  },
  viewAllText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: GlobalStyles.colors.ButtonColor,
    marginLeft: 5,
  },
});

export default SellerProfileCard;
