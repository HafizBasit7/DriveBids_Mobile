import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { GlobalStyles } from '../../../Styles/GlobalStyles';
import {formatAmount} from "../../../utils/R1_utils";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleWatchList } from '../../../API_Callings/R1_API/Watchlist';
import { calculateTimeLeft } from '../../../utils/countdown';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ViewAllCarCard = ({ 
  ad,
  carsInWatchList,
  notHome = false,
  isFromMyBids = false,
  bid,
  isFromCompletedDeals = false,
}) => {

  const navigation = useNavigation();

  const countdownInterval = useRef();
  const [timeLeft, setTimeLeft] = useState('0hr:0m:0s');

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
      queryClient.invalidateQueries(["watchlist"]);
    },
  });

  //Calcuations
  const isCarSold = ad.status === 'sold';
  const isCarInWatchList = (carsInWatchList?.data.carsInWatchList.findIndex(val => val.car === ad._id) !== -1);
  let winning = '';
  let winningBool = false;
  if(isFromMyBids) {
    winning = bid.status === 'lost' ? 'Bid Lost' : bid.bidAmount === ad.highestBid ? isCarSold ? 'Bid Won' : 'Winning' : isCarSold ? 'Bid Lost' : 'Losing';
    winningBool = bid.status === 'lost' ? false : bid.bidAmount === ad.highestBid ? isCarSold ? true : true : isCarSold ? false : false;

  }

  const handleViewAd = () => {
    if(notHome) {
      navigation.navigate('Home', {screen: 'AdDetails', params: {carId: ad._id}});
      return;
    }
    navigation.navigate('AdDetails', {carId: ad._id})
  };


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
      <TouchableOpacity style={styles.favoriteIcon} onPress={() => toggleWatchListMutation.mutate(ad._id)}>
          <Icon
            name={isCarInWatchList ? 'heart' : 'heart-outline'} 
            type="material-community"
            color={isCarInWatchList ? '#FF0000' : '#FFFFFF'} 
            size={18}
          />
        </TouchableOpacity>
        
        <Image 
          source={{ uri: ad.images.exterior[0].url }} 
          style={styles.carImage} 
          resizeMode="cover" 
        />
      </View>
      
      <View style={styles.infoContainer}>
  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
    <Text style={styles.modelText} numberOfLines={1} ellipsizeMode="tail">
      {ad.title}
    </Text>
    {isFromMyBids && (
      <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 0,marginBottom:3 }}>
        <Text
          style={{
            backgroundColor: winningBool ? "rgba(0,139,39,0.2)" : "rgba(224, 26, 69, 0.2)",
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderRadius: 6,
            color: winningBool ? "#008B27" : "#B3261E",
            fontSize: 10,
            width:60,
          }}
        >
           {winning} 
        </Text>
      </View>
    )}
  </View>


        
        <View style={styles.detailsRow}>
          <View style={styles.iconTextContainer}>
            <Icon 
              name="calendar" 
              type="feather" 
              size={12} 
              color="#000000" 
            />
            <Text style={styles.detailText}>{ad.model}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.iconTextContainer}>
            <Icon 
              name="engine" 
              type="material-community" 
              size={12} 
              color="#000000" 
            />
            <Text style={styles.detailText}>{ad.engineSize} cc</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.iconTextContainer}>
            <Icon 
              name="car-shift-pattern" 
              type="material-community" 
              size={12} 
              color="#000000" 
            />
            <Text style={styles.detailText}>{ad.transmission}</Text>
          </View>
        </View>
        
        <View style={styles.detailsRow}>
          <View style={styles.iconTextContainer}>
            <Icon 
              name="gas-pump" 
              type="font-awesome-5" 
              size={12} 
              color="#000000" 
            />
            <Text style={styles.detailText}>{ad.fuel}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.iconTextContainer}>
            <Icon 
              name="speedometer" 
              type="material-community" 
              size={12} 
              color="#000000" 
            />
            <Text style={styles.detailText}>{ad.mileage} km</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.iconTextContainer}>
            <Icon 
              name="palette" 
              type="material-community" 
              size={12} 
              color="#000000" 
            />
            <Text style={styles.detailText}>{ad.color}</Text>
          </View>
        </View>
        
        <View style={styles.bottomRow}>
          <View style={styles.bidTimeContainer}>
            {!isFromCompletedDeals && (
              <View>
                <Text style={styles.topBidText}>Top Bid</Text>
                <Text style={styles.priceText}>AED {formatAmount(ad.highestBid)}</Text>
              </View>
            )}
            {isFromMyBids && (
              <View>
                <Text style={styles.topBidText}>My Bid</Text>
                <Text style={styles.priceText}>AED {formatAmount(ad.highestBid)}</Text>
              </View>
            )}
            <View>
              {isCarSold ? <Text style={{color: 'green'}}>Sold</Text>: (<Text style={styles.timeText}>{timeLeft}</Text>)}
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.viewAdButton}
            onPress={handleViewAd}
          >
            <Text style={styles.viewAdButtonText}>View Ad</Text>
            <Icon 
              name="campaign" 
              type="material" 
              size={16} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    height: width * 0.4, // Fixed height based on screen width
    overflow: 'hidden',
  },
  imageContainer: {
    width: '35%',
    height: '100%',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 3,
  },
  carImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  infoContainer: {
    padding: 10,
    paddingHorizontal: 10,
    width: '65%',
    justifyContent: 'space-between',
  },
  modelText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginBottom: 5,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5,
    gap:6
  },
  divider: {
    height: 15,
    width: 1.3,
    borderRadius: 50,
    backgroundColor: "#000",
    marginHorizontal: 2,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  detailText: {
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
    fontSize: 11,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bidTimeContainer: {
    justifyContent: 'space-between',
  },
  topBidText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
  },
  priceText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
  },
  timeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#B3261E',
    marginTop: 5,
  },
  viewAdButton: {
    backgroundColor: GlobalStyles.colors.ButtonColor,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  viewAdButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
  },
});

export default ViewAllCarCard;