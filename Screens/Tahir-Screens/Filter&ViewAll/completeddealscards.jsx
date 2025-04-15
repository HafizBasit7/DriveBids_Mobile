import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { GlobalStyles } from '../../../Styles/GlobalStyles';
import {formatAmount} from "../../../utils/R1_utils";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleWatchList } from '../../../API_Callings/R1_API/Watchlist';
import { calculateTimeLeft } from '../../../utils/countdown';
import { useNavigation } from '@react-navigation/native';
import { Image } from "expo-image";
import { useAuth } from '../../../R1_Contexts/authContext';

const { width } = Dimensions.get('window');

const CompletedDealsCard = ({ 
  ad,
  item,
  carsInWatchList,
}) => {

  const navigation = useNavigation();
  const {authState} = useAuth();
  const user = authState.user;
 

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
  const isCarInWatchList = (carsInWatchList?.data.carsInWatchList.findIndex(val => val.car === ad._id) !== -1);


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
          contentFit="cover" 
        />
      </View>
      
      <View style={styles.infoContainer}>
  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
    <Text style={styles.modelText} numberOfLines={1} ellipsizeMode="tail">
      {ad.title}
    </Text>
    
      <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 0,marginBottom:3,borderWidth: 1,
    borderColor: "#000", // Black color
    borderRadius:5 }}>
        <Text
          style={{
            backgroundColor: item.bid ? "#fff" : "#fff",
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderRadius: 6,
            color: item.bid ? "#000" : "#000",
            fontSize: 10,
            width:60,
          }}
        >
           {item.bid? "Win Bid": "Bought"} </Text>
      </View>
  
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
        <View style={{ display:"flex", flexDirection:"row", justifyContent:"space-between",marginBottom:5}}>
            <View>
                <Text style={styles.topBidText}>My Bid</Text>
                <Text style={styles.priceText}>AED {formatAmount(1)}</Text>
                </View>
              <View style={{alignItems: 'flex-end'}}> 
                <Text style={styles.topBidText}>{item.seller === user._id ? 'Bought By' : 'Sold By'}</Text> 
                <Text style={styles.priceText}>{item.user.name}</Text>
                </View>
        </View>
        
        <View style={styles.bottomRow}>
          <View style={styles.bidTimeContainer}>
            
           <TouchableOpacity 
            style={styles.viewAdButton}
            onPress={handleViewAd}
          >
            <Text style={styles.viewAdButtonText}>chat now </Text>
            <Icon 
              name="chat" 
              type="material" 
              size={14} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
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
    height: 180, // Fixed height based on screen width
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
    padding: 15,
    paddingHorizontal: 10,
    width: '65%',
    justifyContent: 'space-between',

  },
  modelText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 0,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    gap:6,
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
    fontSize: 12,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:1
    
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

export default CompletedDealsCard;