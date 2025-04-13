
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
  Modal,
  TouchableWithoutFeedback,
  StatusBar,
  FlatList,
  SafeAreaView,
} from "react-native";
import BackIcon from "../../assets/SVG/TahirSvgs/arrow-left.svg";
import { GlobalStyles } from "../../Styles/GlobalStyles";
import { calculateTimeLeft } from "../../utils/countdown";
import { useNavigation } from "@react-navigation/native";
import { formatAmount } from "../../utils/R1_utils";
import WrapperComponent from "../WrapperComponent";
import { useQuery } from "@tanstack/react-query";
import { getCar } from "../../API_Callings/R1_API/Car";
import { Image } from "expo-image";

const { width, height } = Dimensions.get("window");

const HomeHeader = ({ carId, scrollY }) => {
  const {data, isLoading} = useQuery({
    queryKey: ['car', carId],
    queryFn: () => getCar(carId),
    enabled: false,
  });
  const car = data.data.car;

  const scrollViewRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  // const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const thumbnailsRef = useRef(null);

  const countdownInterval = useRef();
  const [timeLeft, setTimeLeft] = useState("0hr:0m:0s");

  const navigation = useNavigation();

  const isCarSold = car.status === "sold";

  useEffect(() => {
    if (isCarSold) return;
    countdownInterval.current = setInterval(() => {
      setTimeLeft(calculateTimeLeft(car.duration));
    }, 1000);

    return () => {
      if (countdownInterval.current) {
        clearInterval(countdownInterval.current);
      }
    };
  }, []);

  const images = Object.values(car.images)
    .flat()
    .map((val) => val.url);

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let index = 0;
    let interval;

    if (!isPaused) {
      interval = setInterval(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: index * width,
            animated: true,
          });

          setCurrentIndex(index);
          index++;

          if (index >= images.length) {
            index = 0;
          }
        }
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isPaused]);

  const openModal = (imageIndex) => {
    setSelectedImageIndex(imageIndex);
    setModalVisible(true);
    setIsPaused(true); // Stop slider when modal opens
    
    // Slight delay to ensure FlatList is rendered before scrolling
    setTimeout(() => {
      if (thumbnailsRef.current) {
        thumbnailsRef.current.scrollToIndex({
          index: imageIndex,
          animated: true,
          viewPosition: 0.5
        });
      }
    }, 100);
  };

  const closeModal = () => {
    setModalVisible(false);
    setIsPaused(false); // Resume slider when modal closes
  };

  const selectImage = (index) => {
    setSelectedImageIndex(index);
    
    // Scroll thumbnails to keep selected thumbnail centered
    if (thumbnailsRef.current) {
      thumbnailsRef.current.scrollToIndex({
        index: index,
        animated: true,
        viewPosition: 0.5
      });
    }
  };
  const nextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const animatedContainerHeight = scrollY.interpolate({
    inputRange: [0, 150], 
    outputRange: [90, 65], 
    extrapolate: "clamp",
  });
  
  const animatedLabelFontSize = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [20, 14], 
    extrapolate: "clamp",
  });
  
  const animatedPriceFontSize = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [14, 10],
    extrapolate: "clamp",
  });
  
  const animatedTimerFontSize = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [13, 9], 
    extrapolate: "clamp",
  });
  const renderThumbnail = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => selectImage(index)}
      style={[
        styles.thumbnailContainer,
        selectedImageIndex === index && styles.selectedThumbnail,
      ]}
    >
      <Image source={{ uri: item }} style={styles.thumbnail} />
    </TouchableOpacity>
  );
  
  return (
    <View >
           

       
      
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        >
          {images.map((image, index) => (
            <TouchableOpacity key={index} onPress={() => openModal(index)}>
              <Image source={{ uri: image }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.backIconContainer}
          onPress={() => navigation.goBack()}
        >
          <BackIcon width={30} height={30} />
        </TouchableOpacity>

        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : null,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Yellow Container Below Slider */}
      <Animated.View style={[styles.yellowContainer, { height: animatedContainerHeight }]}>
    <View style={styles.leftContainer}>
      <Animated.Text
        style={[styles.labelText, { fontSize: animatedLabelFontSize }]}
      >
        Buy Now price
      </Animated.Text>
      <Animated.Text
        style={[styles.priceText, { fontSize: animatedPriceFontSize }]}
      >
        AED {formatAmount(car.buyNowPrice)}
      </Animated.Text>
    </View>
    <View style={styles.verticalLine} />
    <View style={styles.rightContainer}>
      <Animated.Text
        style={[styles.labelText, { fontSize: animatedLabelFontSize }]}
      >
        Highest Bid
      </Animated.Text>
      <Animated.Text
        style={[styles.priceText, { fontSize: animatedPriceFontSize }]}
      >
        AED {formatAmount(car.highestBid)}
      </Animated.Text>
      {!isCarSold && (
        <>
          <Text style={styles.labelText2}>Ends in</Text>
          <Animated.Text
            style={[styles.timerText, { fontSize: animatedTimerFontSize }]}
          >
            {timeLeft}
          </Animated.Text>
        </>
      )}
    </View>
  </Animated.View>

      {/* Modal for displaying larger image */}
   
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.8)"
          translucent
        />
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={closeModal}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.leftButton} onPress={prevImage}>
            <Text style={styles.navText}>❮</Text>
          </TouchableOpacity>
          
          <Image
            source={{ uri: images[selectedImageIndex] }}
            style={styles.modalImage}
          />
          
          <TouchableOpacity style={styles.rightButton} onPress={nextImage}>
            <Text style={styles.navText}>❯</Text>
          </TouchableOpacity>
          
          {/* Horizontal thumbnails carousel */}
          <View style={styles.thumbnailCarouselContainer}>
            <FlatList
              ref={thumbnailsRef}
              data={images}
              renderItem={renderThumbnail}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.thumbnailsContent}
              initialScrollIndex={selectedImageIndex}
              getItemLayout={(data, index) => ({
                length: 80,
                offset: 80 * index,
                index,
              })}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 170,
    backgroundColor: GlobalStyles.colors.HomeHeaderColour,
    position: "relative",
    
  },
  
  image: {
    width: width,
    height: 170,
    resizeMode: "cover",
  },
  backIconContainer: {
    position: "absolute",
    top: 45,
    left: 20,
    zIndex: 10,
  },
  msgIconContainer: {
    position: "absolute",
    top: 45,
    right: 20,
    zIndex: 10,
  },
  pagination: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#bbb",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 16,
    backgroundColor: "white",
  },
  yellowContainer: {
    backgroundColor: "#FEE226",
    height: 90,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  leftContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  verticalLine: {
    position: "absolute",
    left: "55%",
    transform: [{ translateX: -1 }],
    width: 2,
    height: "80%",
    backgroundColor: "black",
  },
  labelText: {
    fontSize: 20,
    fontWeight: "900",
    color: "black",
  },
  labelText2: {
    fontSize: 11,
    color: "black",
  },
  priceText: {
    fontSize: 14,
    fontWeight: "700",
    color: "black",
  },
  timerText: {
    fontSize: 13,
    color: "red",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalImage: { 
    width: width, 
    height: width, 
    resizeMode: "contain" 
  },
  leftButton: { 
    position: "absolute", 
    left: 20, 
    zIndex: 10 
  },
  rightButton: { 
    position: "absolute", 
    right: 20, 
    zIndex: 10 
  },
  navText: { 
    fontSize: 40, 
    color: "#FFD700" 
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFD700",
    fontSize: 20,
    fontWeight: "bold",
  },
  // Thumbnail styles
  thumbnailCarouselContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    height: 90,
  },
  thumbnailsContent: {
    paddingHorizontal: 10,
  },
  thumbnailContainer: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: "transparent",
    overflow: "hidden",
  },
  selectedThumbnail: {
    borderColor: "#FFD700",
    transform: [{ scale: 1.05 }],
    borderWidth:1
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default HomeHeader;
