import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
import MakeModel from "../../CustomComponents/UmairComponents/MakeModel";
import BidsButtons from "../../CustomComponents/UmairComponents/BidsButtons";
import InspectionReport from "../../CustomComponents/UmairComponents/InspectionReport";
import DamageReportCarousel from "../../CustomComponents/UmairComponents/DamageReportcard";
import BiddingHistory from "../../CustomComponents/UmairComponents/BiddingHistory";
import CarFeatures from "../../CustomComponents/UmairComponents/CarFetauresCard";
import SellersComment from "../../CustomComponents/UmairComponents/SellersComment";
import SimilarAds from "../../CustomComponents/UmairComponents/SimilarAds";
import SellerProfileCard from "../../CustomComponents/UmairComponents/SellerProfileCard";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import SectionHeader from "../../CustomComponents/SectionHeader";
import HomeHeader from "../../CustomComponents/UmairComponents/Homeheader";
import { useQuery } from "@tanstack/react-query";
import { getCar } from "../../API_Callings/R1_API/Car";
import WrapperComponent from "../../CustomComponents/WrapperComponent";
import { useAuth } from "../../R1_Contexts/authContext";
import BiddingList from "../../CustomComponents/UmairComponents/BiddingList";
import { useSocket } from "../../R1_Contexts/socketContext";
import { ActivityIndicator } from "react-native-paper";
import CarLoader from "../../CustomComponents/CarLoader";

const AdDetails = ({ route }) => {
  const { carId } = route.params;
  const { authState } = useAuth();
  const [showReserveTooltip, setShowReserveTooltip] = useState(false);
  const { bidSocket: socket } = useSocket();
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (socket) {
      socket.emit("join-room", { roomId: carId });
    }
    return () => {
      if (socket) {
        socket.emit("leave-room", { roomId: carId });
      }
    };
  }, [socket, carId]);

  const { data, isLoading } = useQuery({
    queryKey: ["car", carId],
    queryFn: () => getCar(carId),
  });

  if (isLoading) {
    return <CarLoader />;
  }

  const car = data.data.car;
  const reservePrice = car.reserveBidPrice;
  const highestBid = car.highestBid;
  const percentageMet = Math.min((highestBid / reservePrice) * 100, 100);
  const progressWidth = car.reserveMet ? "100%" : `${percentageMet}%`;
  const isMyBid = car.user._id === authState.user._id;

  return (
    <WrapperComponent>
      <HomeHeader
        style={{ backgroundColor: "#fff" }}
        carId={carId}
        scrollY={scrollY}
      />
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <TouchableWithoutFeedback onPress={() => setShowReserveTooltip(false)}>
          <View style={styles.container}>
            <View style={styles.lineContainer}>
              <View style={styles.fullLine} />
              <Text style={styles.lineText}>{car.title}</Text>

              <View style={styles.fullLine} />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,

                // marginHorizontal: 10,
                marginBottom: 10,
              }}
            >
              <FontAwesome5 name="map-marker-alt" size={15} color="#2F61BF" />
              <Text
                style={{ fontSize: 13, fontWeight: "bold", color: "#2F61BF" }}
              >
                {car.location.name}
              </Text>
            </View>
            <View style={styles.reserveSection}>
              <View style={styles.boxedLineContainer}>
                <View style={styles.smallLine}>
                  <View
                    style={[
                      ...(car.status === "sold" ? [] : [styles.progressFill]),
                      { width: car.status === "sold" ? "100%" : progressWidth },
                    ]}
                  />
                </View>

                <View
                  style={[
                    styles.centerBox,
                    {
                      backgroundColor: car.status === "sold" ? "#D70040" : null,
                    },
                  ]}
                >
                  {car.status !== "sold" ? (
                    <View style={styles.reserveTextContainer}>
                      <Text
                        style={[
                          styles.centerText,
                          car.reserveMet && { color: "#3BBF2F" },
                        ]}
                      >
                        RESERVE {car.reserveMet ? "" : "NOT"} MET
                      </Text>
                      <TouchableOpacity
                        onPress={(e) => {
                          e.stopPropagation();
                          setShowReserveTooltip(!showReserveTooltip);
                        }}
                        style={styles.inlineTooltipIcon}
                      >
                        <MaterialIcons
                          name="info-outline"
                          size={18}
                          color={car.reserveMet ? "#3BBF2F" : "#2a5db0"}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <Text style={[styles.centerText, { color: "#fff" }]}>
                      CAR SOLD
                    </Text>
                  )}
                </View>

                <View style={styles.smallLine}>
                  <View
                    style={[
                      ...(car.status === "sold" ? [] : [styles.progressFill]),
                      styles.rightProgress,
                      { width: car.status === "sold" ? "100%" : progressWidth },
                    ]}
                  />
                </View>
              </View>
            </View>

            {showReserveTooltip && (
              <View
                style={[
                  styles.tooltipContainer,
                  car.reserveMet ? styles.greenTooltip : styles.blueTooltip,
                ]}
              >
                <Text style={styles.tooltipText}>
                  {car.reserveMet
                    ? "The minimum price set by the seller, which must be met for the vehicle to be sold."
                    : "The minimum price set by the seller, which must be met for the vehicle to be sold."}
                </Text>
              </View>
            )}

            <MakeModel car={car} />
            {!isMyBid && car.status !== "sold" && <BidsButtons car={car} />}
            {!isMyBid && (
              <>
                <SectionHeader title={"Owner Details"} />
                <SellerProfileCard
                  user={car.user._id}
                  name={car.user.name}
                  car={car}
                  status={
                    car.user.type === "trader" ? "Trader" : "Private Seller"
                  }
                  profileImage={
                    car.user.imgUrl ||
                    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                  }
                />
              </>
            )}
            <InspectionReport car={car._id} />
            <DamageReportCarousel car={car._id} />
            {isMyBid && (
              <BiddingList car={car._id} isSold={car.status === "sold"} />
            )}
            {!isMyBid && <BiddingHistory car={car._id} />}
            <CarFeatures features={car.features} />
            <SellersComment car={car} isAccident={true} />
            <SellersComment car={car} isAccident={false} />

            <SimilarAds make={car.make} carId={car._id} />
          </View>
        </TouchableWithoutFeedback>
      </Animated.ScrollView>
    </WrapperComponent>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    width: width,
    marginTop: 5,
  },
  fullLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#000",
    marginHorizontal: 0,
  },
  lineText: {
    marginHorizontal: 8,
    fontSize: 25,
    paddingHorizontal: 10,
    color: "#000",
    fontWeight: "700",
  },
  boxedLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  smallLine: {
    flex: 1,
    height: 3,
    backgroundColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3BBF2F",
  },
  rightProgress: {
    alignSelf: "flex-end",
  },
  centerBox: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 50,
    justifyContent: "center",
  },
  centerText: {
    fontSize: 15,
    color: "#2a5db0",
    fontWeight: "800",
  },
  reserveSection: {
    alignItems: "center",
    marginBottom: 0,
    width: "100%",
  },
  reserveTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inlineTooltipIcon: {
    marginLeft: 8,
  },
  tooltipContainer: {
    position: "absolute",
    top: 110,
    left: width * 0.05,
    padding: 12,
    borderRadius: 8,
    width: width * 0.9,
    zIndex: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  greenTooltip: {
    backgroundColor: "#3BBF2F",
    opacity: 0.8,
  },
  blueTooltip: {
    backgroundColor: "#2a5db0",
    opacity: 0.8,
  },
  tooltipText: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
  },
});

export default AdDetails;
