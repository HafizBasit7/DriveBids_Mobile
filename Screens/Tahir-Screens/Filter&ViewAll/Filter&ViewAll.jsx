import React from 'react';
import { View, StyleSheet, FlatList, Text, ScrollView } from 'react-native';
import ViewAllCarCard from './ViewAllCarCard';
import Header from '../../../CustomComponents/Header';
import SectionHeader from '../../../CustomComponents/SectionHeader';
import { Icon } from 'react-native-elements';


const carData = [
  {
    id: '1',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/035/757/238/small_2x/ai-generated-sport-car-firewall-wallpaper-free-photo.jpg',
    model: 'Volkswagen Passat TAHIR SAEED BRAND NEW OK A',
    year: 1967,
    engineSize: 3400,
    transmission: 'Manual',
    fuelType: 'Petrol',
    mileage: 2000,
    color: 'Black',
    topBid: 25000,
    timeRemaining: '10h:20m:15s',
  },
  {
    id: '2',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/035/757/238/small_2x/ai-generated-sport-car-firewall-wallpaper-free-photo.jpg',
    model: 'BMW M3 Competition',
    year: 2022,
    engineSize: 3000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    mileage: 12000,
    color: 'White',
    topBid: 45000,
    timeRemaining: '8h:15m:10s',
  },
  {
    id: '3',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/035/757/238/small_2x/ai-generated-sport-car-firewall-wallpaper-free-photo.jpg',
    model: 'و البريمير و الافد',
    year: 2022,
    engineSize: 3000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    mileage: 12000,
    color: 'White',
    topBid: 45000,
    timeRemaining: '8h:15m:10s',
  },
  {
    id: '4',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/035/757/238/small_2x/ai-generated-sport-car-firewall-wallpaper-free-photo.jpg',
    model: 'BMW M3 Competition',
    year: 2022,
    engineSize: 3000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    mileage: 12000,
    color: 'White',
    topBid: 45000,
    timeRemaining: '8h:15m:10s',
  },

];
const FilterChips = () => {
  const chips = [
    { iconName: 'attach-money', label: '3000-10000', type: 'material' },
    { iconName: 'calendar', label: '2016-2025', type: 'material-community' },
    { iconName: 'speedometer', label: '3000-10000', type: 'material-community' },
    { iconName: 'location-on', label: 'New York, NY', type: 'material' },
    { iconName: 'file-document-outline', label: 'California', type: 'material-community' },
    { iconName: 'car', label: 'Ford', type: 'font-awesome-5' },
  ];

  return (
    <View style={styles.chipContainer}>
      {chips.map((chip, index) => (
        <View key={index} style={styles.chip}>
          <Icon
            name={chip.iconName}
            type={chip.type}
            size={18}
            color="#000"
            containerStyle={{ marginRight:4 }}
          />
          <Text style={styles.chipText}>{chip.label}</Text>
        </View>
      ))}
    </View>
  );
};

const Filters_ViewAll = () => {
  return (
    <>
      <Header showSearch={false}  />
      <View style={styles.container}>
       
        <FilterChips />
         <FlatList
          data={carData}
          keyExtractor={(item) => item.id.toString()} 
          renderItem={({ item }) => (
          
            <ViewAllCarCard
            image={item.image}
            model={item.model}
            year={item.year}
            engineSize={item.engineSize}
            transmission={item.transmission}
            fuelType={item.fuelType}
            mileage={item.mileage}
            color={item.color}
            topBid={item.topBid}
            timeRemaining={item.timeRemaining}
            onViewAdPress={() => console.log('View Ad Pressed for', item.model)}
          />

      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10, 
    backgroundColor: '#fff',
    paddingBottom:40 
   
  },
  separator: {
    height: 15, 
  },
  container: {
    flex: 1,
    
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    border:"1px solid #E1E3E5",
    backgroundColor:"#fff"
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    width: '33%', 
    marginBottom: 10,
  },
  chipText: {
    color: '#6F6F6F',
    fontSize: 12,
    fontWeight:700,
   
    fontFamily:"Inter-Regular"
  },
  
});

export default Filters_ViewAll;