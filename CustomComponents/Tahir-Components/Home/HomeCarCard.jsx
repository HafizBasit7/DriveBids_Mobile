import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Icon, Button } from "react-native-elements";

const HomeCarCard = ({
  image,
  name,
  year,
  engine,
  transmission,
  topBid,
  timeLeft,
  favorite,
}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      <Icon
        name={favorite ? "favorite" : "favorite-border"}
        type="material"
        color={favorite ? "#E63946" : "#555"}
        containerStyle={styles.favoriteIcon}
      />
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
          Top Bid: <Text style={styles.bidAmount}>${topBid}</Text>
        </Text>
        <Text style={styles.timer}>{timeLeft}</Text>
      </View>
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
        iconPosition="right"
      />
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
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 6,
    borderRadius: 50,
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
    color: "#d9534f",
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
