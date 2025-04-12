import React, { useEffect, useRef, useState } from "react";
import { View, Text,  StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleWatchList } from "../../../API_Callings/R1_API/Watchlist";
import { calculateTimeLeft } from "../../../utils/countdown";
import { useAuth } from "../../../R1_Contexts/authContext";
import { Image } from "expo-image";

const HomeCarCard = ({
  ad,
  carsInWatchList,
  CardWidth = 185,
  imgHeight = 100,
  isFromMyBids = false,
  bid,
  notHome = false,
}) => {

  //Calculate if from bids
  let winning = false;
  if(isFromMyBids) {
    winning = bid.bidAmount === ad.highestBid;
  }
  const isCarSold = ad.status === 'sold';

  const {authState} = useAuth();
  const user = authState.user;

  const countdownInterval = useRef();
  const [timeLeft, setTimeLeft] = useState('0hr:0m:0s');

  const queryClient = useQueryClient();
  const toggleWatchListMutation = useMutation({
    mutationFn: toggleWatchList,
    onMutate: async (carId) => {
      //For Car ids in watchlist
      await queryClient.cancelQueries(["carsInWatchList"]);
      const previousWatchlist = queryClient.getQueryData(["carsInWatchList"]);

      queryClient.setQueryData(["carsInWatchList"], (oldData) => {
        if (!oldData) return { data: { carsInWatchList: [{ car: carId }] }, status: true, statusCode: 200 };
        const isAlreadyInWatchlist = oldData.data.carsInWatchList.some((item) => item.car === carId);
        return {
          ...oldData,
          data: {
            ...oldData.data,
            carsInWatchList: isAlreadyInWatchlist
              ? oldData.data.carsInWatchList.filter((item) => item.car !== carId)
              : [...oldData.data.carsInWatchList, { car: carId }],
          },
        };
      });

      return { previousWatchlist };
    },
    onError: (_error, _newMessage, context) => {
      if (context?.previousWatchlist) {
        queryClient.setQueryData(["carsInWatchList"], context.previousWatchlist);
      }
    },
    onSettled: () => {
      // queryClient.invalidateQueries(["carsInWatchList"]);
      // queryClient.invalidateQueries(["watchlist"]);
    },
  });

  const navigation = useNavigation();

  useEffect(() => {
    if(isCarSold) return;
    countdownInterval.current = setInterval(() => {
      setTimeLeft(calculateTimeLeft(ad.duration));
    }, 1000);

    return () => {
      if(!countdownInterval.current) return;
      clearInterval(countdownInterval.current);
    };
  }, [isCarSold]);


  const isCarInWatchList = (carsInWatchList?.data.carsInWatchList.findIndex(val => val.car === ad._id) !== -1);
  const onViewAd = () => {
    if(notHome) {
      navigation.navigate('Home', {screen: 'AdDetails', params: {carId: ad._id}})
      return;
    }
    navigation.navigate('AdDetails', {carId: ad._id})
  };

  return (
    <View style={[styles.card, { width: CardWidth }]}>
      <Image
        source={{ uri: ad.images.exterior[0].url }}
        style={[styles.image, { height: imgHeight }]}
        resizeMode="cover"
      />
      <Icon
        onPress={() => toggleWatchListMutation.mutate(ad._id)}
        name={isCarInWatchList ? "favorite" : "favorite-border"}
        type="material"
        color={isCarInWatchList ? "#E63946" : "rgba(244, 244, 244, 0.9)"}
        containerStyle={styles.favoriteIcon}
      />
      {(ad.user !== user._id && isFromMyBids) && (
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
            {winning ? 'Winning' : 'Losing'}
          </Text>
        </View>
      )}
      <View style={styles.details}>
        <Text style={styles.title}>{ad.make} {ad.variant}</Text>
        <View style={styles.infoRow}>
  <View style={styles.iconTextContainer}>
    <Icon name="calendar-today" type="material" size={14} color="black" />
    <Text style={styles.infoText} numberOfLines={1}>{ad.model}</Text>
  </View>

  <Text style={styles.separator}>|</Text>

  <View style={styles.iconTextContainer}>
    <Icon name="speed" type="material" size={14} color="black" />
    <Text style={styles.infoText}>{ad.engineSize} cc</Text>
  </View>

  <Text style={styles.separator}>|</Text>

  <View style={styles.iconTextContainer}>
    <Icon name="settings" type="material" size={14} color="black" />
    <Text style={styles.infoText}>{ad.transmission}</Text>
  </View>
</View>
        <Text style={styles.bidText}>
          Top Bid{" "}
          <Text style={styles.bidAmount}>
           
            AED {ad.highestBid}
          </Text>
        </Text>
        {isFromMyBids && (
          <Text style={styles.bidText}>
            My Bid{" "}
            <Text style={styles.bidAmount}>
  
              AED {bid.bidAmount}
            </Text>
          </Text>
        )}
        {isCarSold && (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                backgroundColor: "rgba(107, 100, 102, 0.2)",
                marginTop: 5,
                paddingHorizontal: 10,
                paddingVertical: 1,
                fontSize:12,
                borderRadius: 12,
                color: "black",
                minWidth: 50, 
      textAlign: 'center', 
                
              }}
            >
            Sold 
            </Text>
          </View>
        )}
        {!isCarSold && (<Text style={styles.timer}>{timeLeft}</Text>)}
      </View>
      <Button
            title="View Ad"
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            icon={{
              name: "campaign",
              type: "material",
              size: 15,
              color: "white",
            }}
            onPress={onViewAd}
            iconPosition="right"
          />
          {/* todo: button add or no */}
      {/* {isFromMyBids ? (
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
            onPress={() => {}}
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
            onPress={() => {}}
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
            onPress={onViewAd}
            iconPosition="right"
          />
        </>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    shadowColor:"#000",
    shadowOpacity: 0.5,
    shadowRadius: 9, 
    elevation: 2,
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 140, 
  },
  favoriteIcon: {
    position: "absolute",
    top: 8,
    right: 10,
    backgroundColor: "rgba(101, 101, 101, 0.8)",
    padding: 3,
    borderRadius: 10,
    width:30,
    height:30
    
  },
  details: {
    padding: 6,
    alignItems: "center", 
  },
  title: {
    fontSize: 15,
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
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "black",
    marginLeft: 3,
  },

  separator: {
    fontSize: 13,
    fontFamily: "Inter-SemiBold",
    color: "black",
    marginHorizontal: 6, 
  },

  bidText: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    color: "#000",
    marginTop: 7,
  },
  bidAmount: {
    color: "#2F61BF",
  },
  timer: {
    fontSize: 11,
    fontFamily: "Inter-SemiBold",
    color: "#B3261E",
    marginTop: 3,
  },
  button: {
    backgroundColor: "#2F61BF",
    
    marginVertical: 3,
    borderRadius: 10,
    width: "50%",
    
    alignSelf: "center",
  },
  buttonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 10,
  },
});

export default HomeCarCard;
