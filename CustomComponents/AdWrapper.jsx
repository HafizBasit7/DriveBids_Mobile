import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { GlobalStyles } from '../Styles/GlobalStyles';

const AdWrapper = ({ children, style }) => {
  return (
   
     
      <View style={[styles.container, style]}>
        {children}
      </View>
  
  );
};

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 80, 
    backgroundColor:"red"
  },
});

export default AdWrapper;
