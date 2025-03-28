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
  
  const reservePrice = car.reserveBidPrice;
const highestBid = car.highestBid;
const percentageMet = Math.min((highestBid / reservePrice) * 100, 100);


const progressWidth = car.reserveMet ? '100%' : `${percentageMet}%`;
 
  
  
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
          <View style={styles.lineContainer}>
            <View style={styles.fullLine} />
            <Text style={styles.lineText}>Car Details</Text>
            <View style={styles.fullLine} />
          </View>

  
<View style={styles.boxedLineContainer}>
  {/* Left Line - Fills left to right */}
  <View style={styles.smallLine}>
    <View style={[styles.progressFill, { width: progressWidth }]} />
  </View>

  {/* Center Box */}
  <View style={styles.centerBox}>
  <Text
    style={[
      styles.centerText,
      car.reserveMet && { color: '#3BBF2F' } 
    ]}
  >
    RESERVE {car.reserveMet ? '' : 'NOT'} MET
  </Text>
  </View>

  {/* Right Line - Fills right to left */}
  <View style={styles.smallLine}>
    <View style={[styles.progressFill, styles.rightProgress, { width: progressWidth }]} />
  </View>
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
          <CarFeatures features={car.features}/>
        <SellersComment car={car}/>
          <SimilarAds make={car.make}/>
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
    marginBottom: 25, // Space before the next section
    width: width, // Make it full width
    marginTop:15
  },
  fullLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#000",
    marginHorizontal: 0, // Ensure no gaps at the edges
  },
  lineText: {
    marginHorizontal: 8,
    fontSize: 25,
    paddingHorizontal: 10,
    color: "#000",
    fontWeight: "700",
  },
  /* Second Container with Centered Box */
  boxedLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  smallLine: {
    flex: 1,
    height: 3,
    backgroundColor: "#ccc", // Base gray line
    borderRadius: 5,
    overflow: 'hidden',
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: '#3BBF2F',
  },
  
  // This reverses the fill direction for the right side
  rightProgress: {
    alignSelf: 'flex-end',
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
    elevation: 2,
    height: 50,
    justifyContent: "center",
  },
  
  centerText: {
    fontSize: 15,
    color: "#2a5db0",
    fontWeight: "800",
  },
  
  
});

export default AdDetails;
