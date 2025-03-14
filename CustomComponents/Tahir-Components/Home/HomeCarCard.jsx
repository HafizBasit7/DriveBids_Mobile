import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Button } from "react-native-elements";
import { GlobalStyles } from "../../../Styles/GlobalStyles";

const HomeCarCard = ({
  image,
  name,
  year,
  engine,
  transmission,
  topBid,
  timeLeft,
  favorite,
  CardWidth = 250,
  imgHeight = 140,
  winning,
  yourBid,
  onViewPress,
  isFromMyBids = false,
  onIncreaseBid,
  onCancelBid,
}) => {
  return (
    <View style={[styles.card, { width: CardWidth }]}>
      <Image
        source={{ uri: image }}
        style={[styles.image, { height: imgHeight }]}
        resizeMode="cover"
      />
      <Icon
        name={favorite ? "favorite" : "favorite-border"}
        type="material"
        color={favorite ? "#E63946" : "rgba(244, 244, 244, 0.9)"}
        containerStyle={styles.favoriteIcon}
      />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            backgroundColor: winning
              ? "rgba(0,139,39,0.2)"
              : "rgba(204,0,43,0.2)",
            marginTop: 5,
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderRadius: 12,
            color: winning ? "#008B27" : "#B3261E",
          }}
        >
          {winning ? "Winning" : "Losing"}
        </Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.infoRow}>
          <Icon name="calendar-today" type="material" size={16} color="black" />
          <Text style={styles.infoText}>{year}</Text>
          <Text style={styles.separator}>|</Text>

          <Icon name="speed" type="material" size={16} color="black" />
          <Text style={styles.infoText}>{engine} cc</Text>
          <Text style={styles.separator}>|</Text>
          <Icon name="settings" type="material" size={16} color="black" />
          <Text style={styles.infoText}>{transmission}</Text>
        </View>
        <Text style={styles.bidText}>
          {isFromMyBids ? "Your Bid" : "Top Bid"}{" "}
          <Text style={styles.bidAmount}>
            $ {isFromMyBids ? yourBid : topBid}
          </Text>
        </Text>
        <Text style={styles.timer}>{timeLeft}</Text>
      </View>
      {isFromMyBids ? (
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
            marginBottom: 10,
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity
            style={{
              borderColor: "#B3261E",
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 10,
              width: "48%",
            }}
            onPress={onCancelBid}
          >
            <Text
              style={[
                styles.buttonText,
                { color: "#B3261E", textAlign: "center" },
              ]}
            >
              Cancel Bid
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onIncreaseBid}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 10,
              width: "48%",
              backgroundColor: GlobalStyles.colors.ButtonColor,
            }}
          >
            <Text
              style={[
                styles.buttonText,
                { color: "white", textAlign: "center" },
              ]}
            >
              Increase Bid
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Button
            title="View Ad"
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            icon={{
              name: "campaign",
              type: "material",
              size: 18,
              color: "white",
            }}
            onPress={onViewPress}
            iconPosition="right"
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: 250,
    elevation: 3,
    marginVertical: 5,
  },
  image: {
    width: "100%",
    height: 140, // Reduced height
  },
  favoriteIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(101, 101, 101, 0.8)",
    padding: 6,
    borderRadius: 15,
  },
  details: {
    padding: 5,
    alignItems: "center", // Center align content
  },
  title: {
    fontSize: 17,
    fontFamily: "Inter-SemiBold",
    color: "#333",
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 5,
  },

  infoText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "black",
    marginLeft: 3,
  },

  separator: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    color: "black",
    marginHorizontal: 6, // Space around separator
  },

  bidText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#000",
    marginTop: 5,
  },
  bidAmount: {
    color: "#2F61BF",
  },
  timer: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    color: "#B3261E",
    marginTop: 3,
  },
  button: {
    backgroundColor: "#2F61BF",
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 25,
    width: "50%",
    alignSelf: "center",
  },
  buttonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
});

export default HomeCarCard;
