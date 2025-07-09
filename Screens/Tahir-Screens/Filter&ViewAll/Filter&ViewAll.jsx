import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Text, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import ViewAllCarCard from './ViewAllCarCard';
import Header from '../../../CustomComponents/Header';
import SectionHeader from '../../../CustomComponents/SectionHeader';
import { Icon } from 'react-native-elements';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { searchCars } from '../../../API_Callings/R1_API/Car';
import { getCarsIdInWatchList } from '../../../API_Callings/R1_API/Watchlist';
import { ActivityIndicator } from 'react-native-paper';
import { useAuth } from '../../../R1_Contexts/authContext';
import SvgFilter from "../../../assets/SVG/TahirSvgs/Filter.svg";
import SvgSearch from "../../../assets/SVG/TahirSvgs/Search.svg";
import { useNavigation } from '@react-navigation/native';


const FilterChips = (filters) => {
  if(Object.keys(filters?.filters).length === 0) {
    return null;
  }

  const getChips = () => {
    const chipsList = [];

    // Price Range Chip
    if (filters?.filters.minPrice || filters?.filters.maxPrice) {
      chipsList.push({ 
        iconName: 'attach-money', 
        label: `${filters.filters.minPrice || 0} - ${filters.filters.maxPrice || 'Max'} AED`, 
        type: 'material' 
      });
    }

    // Model Year Chip (if applicable)
    if (filters?.filters.model) {
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
    if (filters?.filters.condition) {
      chipsList.push({ 
        iconName: 'file-document-outline', 
        label: filters?.filters?.condition, 
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

const SortFilter = ({ selectedSort, onSelectSort }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const sortOptions = [
    { label: 'Most Relevant', value: 'relevant' },
    { label: 'Newly Listed', value: 'recent' },
    { label: 'Highest Price', value: 'highPrice' },
    { label: 'Lowest Price', value: 'lowPrice' },
  ];

  return (
    <View style={styles.sortContainer}>
      <TouchableOpacity 
        style={styles.sortButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.sortButtonText}>
          Sort by: {sortOptions.find(option => option.value === selectedSort)?.label || 'Most Relevant'}
        </Text>
        <Icon
          name="chevron-down"
          type="material-community"
          size={20}
          color="#6F6F6F"
        />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.sortOption,
                  selectedSort === option.value && styles.selectedSortOption
                ]}
                onPress={() => {
                  onSelectSort(option.value);
                  setModalVisible(false);
                }}
              >
                <Text style={[
                  styles.sortOptionText,
                  selectedSort === option.value && styles.selectedSortOptionText
                ]}>
                  {option.label}
                </Text>
                {selectedSort === option.value && (
                  <Icon
                    name="check"
                    type="material"
                    size={20}
                    color="#2A5DB0"
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const LIMIT = 10;

const Filters_ViewAll = ({ route }) => {
  const { filters } = route.params;

  const queryClient = useQueryClient();

  const [title, setTitle] = useState();
  const {authState} = useAuth();
  const currentSelectedLocation = (authState.selectedLocation || authState.user.location) || {"coordinates": [73.1128313, 33.5255503]};

  const navigation = useNavigation();
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["search", {...filters, ...((title === '' || title === undefined || !title) ? {} : {title}), sort: selectedSort}],
    queryFn: ({ pageParam = 1 }) => searchCars({
      ...filters, 
      ...((title === '' || title === undefined || !title) ? {} : {title}),
      sort: selectedSort
    }, pageParam, LIMIT, currentSelectedLocation.coordinates[0], currentSelectedLocation.coordinates[1]),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data?.cars?.length === LIMIT ? allPages.length + 1 : undefined;
    },
    gcTime: 0,
  });

  useEffect(() => {
    const interval = setTimeout(() => {
      queryClient.invalidateQueries({queryKey: ['search']});
    }, 300);
    return () => {
      clearTimeout(interval);
    };
  }, [title]);

  const [selectedSort, setSelectedSort] = useState('relevant');

  useEffect(() => {
    queryClient.invalidateQueries({queryKey: ['search']});
  }, [selectedSort]);

  const { data: carsInWatchList } = useQuery({
    queryKey: ["carsInWatchList"],
    queryFn: getCarsIdInWatchList,
  });

  const filteredCars = data?.pages?.flatMap((page) => page.data.cars) || [];
  

  return (
    <>
      <Header showSearch={false} />
      <View style={styles.container}>

        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <SvgSearch width={18} height={18} style={styles.searchIcon} />
            <TextInput
              placeholder="Search for Honda Pilot 7-Passenger"
              style={styles.searchInput}
              placeholderTextColor="#888"
              value={title}
              onChangeText={setTitle}
            />
          </View>


          <TouchableOpacity
            style={styles.filterIcon}
            onPress={() => navigation.goBack()}
          >
            <SvgFilter width={25} height={25} />
          </TouchableOpacity>
        </View>
        
        <SortFilter 
          selectedSort={selectedSort}
          onSelectSort={setSelectedSort}
        />
        <FilterChips filters={filters} />
        {isLoading && <ActivityIndicator/>}
       {!isLoading && (
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
       )}
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
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginHorizontal: 10,
  },
  searchIcon: {
    marginLeft: 10,
    marginRight: 5,
  },
  filterIcon: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: "#000000",
    textAlignVertical: "center",
  },
  sortContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
  },
  sortButtonText: {
    fontSize: 14,
    color: '#6F6F6F',
    fontWeight: '600',
    fontFamily: 'Inter-Regular',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    width: '80%',
    maxWidth: 300,
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E3E5',
  },
  selectedSortOption: {
    backgroundColor: '#F8F9FA',
  },
  sortOptionText: {
    fontSize: 14,
    color: '#6F6F6F',
    fontFamily: 'Inter-Regular',
  },
  selectedSortOptionText: {
    color: '#2A5DB0',
    fontWeight: '600',
  },
});

export default Filters_ViewAll;