import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { GlobalStyles } from '../../../Styles/GlobalStyles';

const { width } = Dimensions.get('window');

const ViewAllCarCard = ({ 
  image, 
  model, 
  year, 
  engineSize, 
  transmission, 
  fuelType, 
  mileage, 
  color, 
  topBid, 
  timeRemaining,
  onViewAdPress 
}) => {
  const [isFavorite, setIsFavorite] = useState(false); 

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
      <TouchableOpacity style={styles.favoriteIcon} onPress={toggleFavorite}>
          <Icon
            name={isFavorite ? 'heart' : 'heart-outline'} 
            type="material-community"
            color={isFavorite ? '#FF0000' : '#FFFFFF'} 
            size={18}
          />
        </TouchableOpacity>
        
        <Image 
          source={{ uri: image }} 
          style={styles.carImage} 
          resizeMode="cover" 
        />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.modelText} numberOfLines={1} ellipsizeMode="tail">
          {model}
        </Text>
        
        <View style={styles.detailsRow}>
          <View style={styles.iconTextContainer}>
            <Icon 
              name="calendar" 
              type="feather" 
              size={12} 
              color="#000000" 
            />
            <Text style={styles.detailText}>{year}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.iconTextContainer}>
            <Icon 
              name="engine" 
              type="material-community" 
              size={12} 
              color="#000000" 
            />
            <Text style={styles.detailText}>{engineSize} cc</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.iconTextContainer}>
            <Icon 
              name="car-shift-pattern" 
              type="material-community" 
              size={12} 
              color="#000000" 
            />
            <Text style={styles.detailText}>{transmission}</Text>
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
            <Text style={styles.detailText}>{fuelType}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.iconTextContainer}>
            <Icon 
              name="speedometer" 
              type="material-community" 
              size={12} 
              color="#000000" 
            />
            <Text style={styles.detailText}>{mileage} km</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.iconTextContainer}>
            <Icon 
              name="palette" 
              type="material-community" 
              size={12} 
              color="#000000" 
            />
            <Text style={styles.detailText}>{color}</Text>
          </View>
        </View>
        
        <View style={styles.bottomRow}>
          <View style={styles.bidTimeContainer}>
            <View>
              <Text style={styles.topBidText}>Top Bid</Text>
              <Text style={styles.priceText}>${topBid}</Text>
            </View>
            <View>
              <Text style={styles.timeText}>{timeRemaining}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.viewAdButton}
            onPress={onViewAdPress}
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
    top: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 5,
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