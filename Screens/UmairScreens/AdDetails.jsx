import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";

const { width } = Dimensions.get("window"); // Get screen width
import MakeModel from "../../CustomComponents/UmairComponents/MakeModel";
import BidsButtons from "../../CustomComponents/UmairComponents/BidsButtons";
import InspectionReport from "../../CustomComponents/UmairComponents/InspectionReport";
import DamageReportCarousel from "../../CustomComponents/UmairComponents/DamageReportcard";
import BiddingHistory from "../../CustomComponents/UmairComponents/BiddingHistory";
import CarFeatures from "../../CustomComponents/UmairComponents/CarFetauresCard";
import SellersComment from "../../CustomComponents/UmairComponents/SellersComment";
import SimilarAds from "../../CustomComponents/UmairComponents/SimilarAds";
// import HomeHeader from "../../CustomComponents/UmairComponents/Homeheader";
import SellerProfileCard from "../../CustomComponents/UmairComponents/SellerProfileCard";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import SectionHeader from "../../CustomComponents/SectionHeader";
import HomeHeader from "../../CustomComponents/UmairComponents/Homeheader";
import { useQuery } from "@tanstack/react-query";
import { getCar } from "../../API_Callings/R1_API/Car";
import WrapperComponent from "../../CustomComponents/WrapperComponent";
import { useAuth } from "../../R1_Contexts/authContext";
import BiddingList from "../../CustomComponents/UmairComponents/BiddingList";

const AdDetails = ({route}) => {
  
  const {carId} = route.params;
  const {authState} = useAuth();

  const {data, isLoading} = useQuery({
    queryKey: ['car', carId],
    queryFn: () => getCar(carId),
  });


  if(isLoading) {
    return null;
  }

  const car = data.data.car;
  
  //Calculation
  const isMyBid = car.user._id === authState.user._id;

  return (
    <WrapperComponent>
      <HomeHeader car={car}/>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Step Progress Container (Lines should extend fully) */}
          <View style={styles.lineContainer}>
            <View style={styles.fullLine} />
            <Text style={styles.lineText}>Car Details</Text>
            <View style={styles.fullLine} />
          </View>

          {/* Second Line Container with Centered Box */}
          <View style={styles.boxedLineContainer}>
            <View style={styles.smallLine} />
            <View style={styles.centerBox}>
              <Text style={styles.centerText}>RESERVE {car.reserveMet ? '' : 'NOT'} MET</Text>
            </View>
            <View style={styles.smallLine} />
          </View>
          <MakeModel car={car}/>
          {!isMyBid && (<BidsButtons car={car}/>)}
          {!isMyBid && (
            <>
              <SectionHeader title={"Owner Details"} />
              <SellerProfileCard
                user={car.user._id}
                name={car.user.name}
                status={car.user.type === 'trader' ? 'Trader' : 'Private Seller'}
                profileImage={car.user.imgUrl || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'}
              />
            </>
          )}
          <InspectionReport car={car._id}/>
          <DamageReportCarousel car={car._id}/>
          {isMyBid && (<BiddingList car={car._id}/>)}
          {!isMyBid && (<BiddingHistory car={car._id}/>)}
          {/* todo: do */}
          <CarFeatures />
        <SellersComment car={car}/>
        {/* todo: do */}
        {/*           <SimilarAds /> */}
        </View>
      </ScrollView>
    </WrapperComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  /* First Line Container (Full Width) */
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30, // Space before the next section
    width: width, // Make it full width
  },
  fullLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#000",
    marginHorizontal: 0, // Ensure no gaps at the edges
  },
  lineText: {
    marginHorizontal: 8,
    fontSize: 20,
    paddingHorizontal: 10,
    color: "#000",
    fontWeight: "700",
  },
  /* Second Container with Centered Box */
  boxedLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%", // Keep a small margin from edges
  },
  smallLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#2a5db0",
  },
  centerBox: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10, // Rounded border
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Shadow for Android
    height: 50, // Increased height
    justifyContent: "center", // Ensure text stays centered vertically
  },
  centerText: {
    fontSize: 16,
    color: GlobalStyles.colors.ButtonColor, // Blue text
    fontWeight: "bold",
  },
});

export default AdDetails;
