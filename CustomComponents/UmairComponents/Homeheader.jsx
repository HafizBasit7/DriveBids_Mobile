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
import MsgIcon from "../../assets/UmairAssets/MsgSVG.svg"; // Ensure correct path
import { GlobalStyles } from "../../Styles/GlobalStyles";

const { width } = Dimensions.get("window");

const HomeHeader = () => {
  const scrollViewRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const images = [
    "https://picsum.photos/id/237/800/400", // Random car image
    "https://picsum.photos/id/250/800/400",
    "https://picsum.photos/id/175/800/400",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
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

    return () => clearInterval(interval);
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {/* Slider Section */}
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
        <TouchableOpacity style={styles.backIconContainer}>
          <BackIcon width={30} height={30} />
        </TouchableOpacity>

        {/* Right Arrow Button */}
        <TouchableOpacity style={styles.msgIconContainer}>
          <MsgIcon
            width={30}
            height={30}
            style={{ transform: [{ rotate: "180deg" }] }}
          />
        </TouchableOpacity>

        {/* Pagination Dots */}
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
      <View style={styles.yellowContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.labelText}>Buy Now price</Text>
          <Text style={styles.priceText}>AED 30,000</Text>
        </View>
        <View style={styles.verticalLine} />
        <View style={styles.rightContainer}>
          <Text style={styles.labelText}>Highest Bid</Text>
          <Text style={styles.priceText}>$30,000</Text>
          <Text style={styles.labelText2}>Ends in</Text>
          <Text style={styles.timerText}>73hr:23mn:11s</Text>
        </View>
      </View>

      {/* Modal for displaying larger image */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <Image source={{ uri: selectedImage }} style={styles.modalImage} />
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
    backgroundColor: "yellow",
    height: 100,
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
    left: "50%",
    transform: [{ translateX: -1 }],
    width: 2,
    height: "80%",
    backgroundColor: "black",
  },
  labelText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
  },
  labelText2: {
    fontSize: 16,
    color: "black",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  timerText: {
    fontSize: 12,
    color: "red",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    height: "100%",
  },
  modalImage: {
    width: width * 0.9,
    height: width,
    resizeMode: "contain",
  },
});

export default HomeHeader;
