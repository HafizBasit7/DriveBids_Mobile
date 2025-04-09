import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const Loader = () => {
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.lottie}
        source={require('../assets/loaderannimation.json')}
        autoPlay
        loop
      />
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  lottie: {
    width: width * 0.5,  // adjust the width as needed
    height: 120, // adjust the height as needed
  },
});

export default Loader;
