import React, { useRef, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
  Modal,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import BackIcon from "../../assets/SVG/TahirSvgs/arrow-left.svg"; // Ensure correct path
// import MsgIcon from "../../assets/UmairAssets/MsgSVG.svg"; // Ensure correct path
import { GlobalStyles } from "../../Styles/GlobalStyles";
import { calculateTimeLeft } from "../../utils/countdown";
import { useNavigation } from "@react-navigation/native";
import { formatAmount } from "../../utils/R1_utils";
import WrapperComponent from "../WrapperComponent";

const { width } = Dimensions.get("window");

const HomeHeader = ({ car,scrollY }) => {
  const scrollViewRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);


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


    const openModal = (image) => {
      setSelectedImage(image);
      setModalVisible(true);
      setIsPaused(true); // 🔹 Stop slider when modal opens
    };
    
    const closeModal = () => {
      setModalVisible(false);
      setIsPaused(false); // 🔹 Resume slider when modal closes
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
  return (
    <View>
    {modalVisible ? (
        <StatusBar
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.8)"
          translucent
        />
      ) : (
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      )}
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
            <TouchableOpacity key={index} onPress={() => openModal(image)}>
              <Image source={{ uri: image }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Left Arrow Button */}

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
        
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
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
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 170,
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
  modalImage: { width: width * 1, height: width, resizeMode: "contain" },
  
  leftButton: { position: "absolute", left: 20, zIndex: 10 },
  rightButton: { position: "absolute", right: 20, zIndex: 10 },
  navText: { fontSize: 40, color: "yellow" },
});

export default HomeHeader;
