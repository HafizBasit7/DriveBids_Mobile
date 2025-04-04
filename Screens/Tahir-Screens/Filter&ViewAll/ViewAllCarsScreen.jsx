import React from 'react';
import { View, StyleSheet, FlatList, Text, ScrollView } from 'react-native';
import ViewAllCarCard from './ViewAllCarCard';
import Header from '../../../CustomComponents/Header';
import { getCarsIdInWatchList } from '../../../API_Callings/R1_API/Watchlist';
import { useQuery } from '@tanstack/react-query';
import { listCars, listCarsByBidCount } from '../../../API_Callings/R1_API/Car';



const ViewAllCarsScreen = ({route}) => {
    const {type} = route.params;

    const {data: carsInWatchList, isLoading: watchlistLoading} = useQuery({
        queryKey: ['carsInWatchList'],
        queryFn: getCarsIdInWatchList,
    });   

    //Cars
    const {data, isLoading} = useQuery({
        queryKey: ['cars'],
        queryFn: () => listCars(1, 10, 'recent'),
        enabled: type === 'recent',
    });
    const {data: endingCarList, isLoading: endingCarListLoading} = useQuery({
        queryKey: ['carsEnding'],
        queryFn: () => listCars(1, 10, 'ending'),
        enabled: type === 'ending'
    });
    const {data: carsByBidCount, isLoading: carsByBidCountLoading} = useQuery({
        queryKey: ['carsByBidCount'],
        queryFn: () => listCarsByBidCount(1, 10),
        enabled: type === 'spotlight',
    });

    if(isLoading || endingCarListLoading || carsByBidCountLoading) {
        return null;
    }

    return (
        <>
        <Header showSearch={false}  />
        <View style={styles.container}>
            <FlatList
                data={type === 'recent' ? data.data.cars : type === 'spotlight' ? carsByBidCount.data.cars : endingCarList.data.cars}
                keyExtractor={(item) => item._id} 
                renderItem={({ item }) => (
            
                <ViewAllCarCard
                    ad={type === 'spotlight' ? item.car : item}
                    carsInWatchList={carsInWatchList}
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
    flex:1,
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

export default ViewAllCarsScreen;