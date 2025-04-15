import React from 'react';
import { View, StyleSheet, FlatList, Text, ScrollView } from 'react-native';
import ViewAllCarCard from './ViewAllCarCard';
import Header from '../../../CustomComponents/Header';
import SectionHeader from '../../../CustomComponents/SectionHeader';
import { Icon } from 'react-native-elements';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { searchCars } from '../../../API_Callings/R1_API/Car';
import { getCarsIdInWatchList } from '../../../API_Callings/R1_API/Watchlist';
import { ActivityIndicator } from 'react-native-paper';
import { useAuth } from '../../../R1_Contexts/authContext';


const FilterChips = (filters) => {
  if(Object.keys(filters.filters).length === 0) {
    return null;
  }

  const getChips = () => {
    const chipsList = [];

    // Price Range Chip
    if (filters.filters.minPrice || filters.filters.maxPrice) {
      chipsList.push({ 
        iconName: 'attach-money', 
        label: `${filters.filters.minPrice || 0} - ${filters.filters.maxPrice || 'Max'} AED`, 
        type: 'material' 
      });
    }

    // Model Year Chip (if applicable)
    if (filters.filters.model) {
      chipsList.push({ 
        iconName: 'calendar', 
        label: filters.filters.model, 
        type: 'material-community' 
      });
    }

    // Mileage Range Chip
    if (filters.filters.minMileage || filters.filters.maxMileage) {
      chipsList.push({ 
        iconName: 'speedometer', 
        label: `${filters.filters.minMileage || 0} - ${filters.filters.maxMileage || 'Max'} KM`, 
        type: 'material-community' 
      });
    }

    // City Chip
    if (filters.filters.city) {
      chipsList.push({ 
        iconName: 'location-on', 
        label: filters.filters.city, 
        type: 'material' 
      });
    }

    // Condition Chip
    if (filters.filters.condition) {
      chipsList.push({ 
        iconName: 'file-document-outline', 
        label: filters.filters.condition, 
        type: 'material-community' 
      });
    }

    // Make Chip
    if (filters.filters.make) {
      chipsList.push({ 
        iconName: 'car', 
        label: filters.filters.make, 
        type: 'font-awesome-5' 
      });
    }

    // Additional chips can be added for other filters like transmission, fuel, etc.
    // For example:
    if (filters.filters.transmission) {
      chipsList.push({ 
        iconName: 'swap-vertical', 
        label: filters.filters.transmission, 
        type: 'material-community' 
      });
    }

    if (filters.filters.fuel) {
      chipsList.push({ 
        iconName: 'gas-pump', 
        label: filters.filters.fuel, 
        type: 'font-awesome-5' 
      });
    }

    return chipsList;
  };

  const chips = getChips();

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

const LIMIT = 10;

const Filters_ViewAll = ({ route }) => {
  const { filters } = route.params;
  const {authState} = useAuth();
  const currentSelectedLocation = (authState.selectedLocation || authState.user.location) || {"coordinates": [73.1128313, 33.5255503]};

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["search", filters],
    queryFn: ({ pageParam = 1 }) => searchCars(filters, pageParam, LIMIT, currentSelectedLocation.coordinates[0], currentSelectedLocation.coordinates[1]),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data?.cars?.length === LIMIT ? allPages.length + 1 : undefined;
    },
  });

  const { data: carsInWatchList } = useQuery({
    queryKey: ["carsInWatchList"],
    queryFn: getCarsIdInWatchList,
  });

  if (isLoading) return null;

  const filteredCars = data?.pages?.flatMap((page) => page.data.cars) || [];

  return (
    <>
      <Header showSearch={false} />
      <View style={styles.container}>

        
        <FilterChips filters={filters} />
        <FlatList
          data={filteredCars}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <ViewAllCarCard ad={item} carsInWatchList={carsInWatchList} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5} // Adjust to trigger pagination sooner/later
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator size="small" color="#2A5DB0" style={styles.loadingIndicator} />
            ) : null
          }
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
    backgroundColor: '#fff',

    
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
    width: 'auto', 
    marginBottom: 10,
    
    
  },
  chipText:{
    color: '#6F6F6F',
    fontSize: 12,
    fontWeight:700,
   
    fontFamily:"Inter-Regular"
  },
  
});

export default Filters_ViewAll;