import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';
import { GlobalStyles } from '../../../Styles/GlobalStyles';
import {formatAmount} from "../../../utils/R1_utils";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleWatchList } from '../../../API_Callings/R1_API/Watchlist';
import { useNavigation } from '@react-navigation/native';
import { Image } from "expo-image";
import { useAuth } from '../../../R1_Contexts/authContext';
import { getChatId } from '../../../API_Callings/R1_API/Chat';


const CompletedDealsCard = ({ 
  ad,
  item,
}) => {

  const [showOwnerProfile, setShowOwnerProfile] = useState(false);

  const navigation = useNavigation();
  const {authState} = useAuth();
  const user = authState.user;

  const chatNowMutation = useMutation({
    mutationFn: getChatId,
  });
 

  const queryClient = useQueryClient();


  const handleViewAd = () => {
      navigation.navigate('Home', {screen: 'AdDetails', params: {carId: ad._id}});
  };

  const handleChatNow = async  () => {
    try {
      const result = await chatNowMutation.mutateAsync({userId: item.user._id, carId: ad._id});
      navigation.navigate('Messages' , {screen: 'ActiveChatBox', params: {chatId: result.data.chatId}})
    }
    catch(e) {
      console.log(e);
    }
  };


  return (
    <View style={styles.container}>

      {/* Modal  */}
       <Modal visible={showOwnerProfile} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <StatusBar barStyle="dark-content" backgroundColor='rgba(0,0,0,0.7)' translucent />
            <View style={styles.modalContent}>
            <Text style={{textAlign:'center', textDecorationLine:'underline', fontWeight:'500', marginBottom: 20,}}>Owner Details</Text>
            <View style={{ display:"flex", flexDirection:"row", justifyContent:"space-between", marginBottom:5, flexWrap:'wrap'}}>
              <View >
                  <View style={{alignItems: 'flex-start', marginBottom: 10}}> 
                    <Text style={styles.topBidText}>{item.seller === user._id ? 'Bought By' : 'Sold By'}</Text> 
                    <Text style={styles.priceText}>{item.user.name}</Text>
                  </View>
                  <Text style={styles.topBidText}>Email: </Text>
                  <Text style={styles.priceText}>{item.user.email}</Text>
              </View>
              <View >
                <Text style={styles.topBidText}>Phone: </Text>
                <Text style={styles.priceText}>+{item.user.phoneNumber?.countryCode} {item.user.phoneNumber?.phoneNo}</Text>
              </View>
              </View>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowOwnerProfile(false)}
              >
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      <View style={styles.imageContainer}>        
        <Image 
          source={{ uri: ad.images.exterior[0].url }} 
          style={styles.carImage} 
          contentFit="cover" 
        />
      </View>
      
      <View style={styles.infoContainer}>
  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
  <Text style={styles.modelText} numberOfLines={1} ellipsizeMode="tail">
  {ad.title.length > 18 ? ad.title.substring(0, 18) + '..' : ad.title}
</Text>
    
      <View style={{ justifyContent: "center", alignItems: "center", marginLeft: 0,marginBottom:3,
     // Black color
    borderRadius:5 }}>
        <Text
          style={{
            backgroundColor: item.bid ? "#fff" : "#fff",
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderRadius: 6,
            color: item?.bid ? "#ffffff" : "#ffffff",
            fontSize: 10,
            backgroundColor:'green',
            width:60,
            textAlign:'center'
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
        
       
        <View>
                <Text style={styles.topBidText}>Winning Price:</Text>
                <Text style={styles.priceText}>AED {formatAmount(item.buyingAmount)}</Text>
                </View>
        <TouchableOpacity onPress={() => setShowOwnerProfile(true)}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{textAlign:'center', textDecorationLine:'underline', fontWeight:'500'}}>Owner Details</Text>
            <Icon 
                name="eye" 
                type="material-community" 
                size={16} 
                color="#000000" 
              />
          </View>
        </TouchableOpacity>
        
        <View style={styles.bottomRow}>
          <View style={styles.bidTimeContainer}>
          <TouchableOpacity 
            style={styles.viewAdButton}
            onPress={handleViewAd}
          > 
          <Text>
          <Icon 
          name="campaign" 
          type="material" 
          size={16} 
          color="#FFFFFF" 
        /></Text>
            <Text style={styles.viewAdButtonText}> View Ad</Text>
           
          </TouchableOpacity>
          
          </View>
          
          


          <TouchableOpacity 
            style={styles.viewAdButton}
            onPress={handleChatNow}
          >
            <Icon 
              name="chat" 
              type="material" 
              size={14} 
              color="#FFFFFF" 
            />
            <Text style={styles.viewAdButtonText}>{chatNowMutation.isPending ? 'Please wait...' : 'Chat Now'} </Text>
            
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
    height: '190', // Fixed height based on screen width
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
    paddingHorizontal: 7,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    gap: 5,
  },
  viewAdButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 15,
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginLeft: 10,
  },
  modalCloseButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: '#2F61BF',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});

export default CompletedDealsCard;