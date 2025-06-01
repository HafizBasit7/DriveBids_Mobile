import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  memo,
  useMemo,
} from "react";
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
  Platform,
  ActivityIndicator,
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
import { Video } from "expo-av";

const { width, height } = Dimensions.get("window");

// Memoized Media Item Component
const MediaItem = memo(
  ({
    item,
    index,
    onPress,
    isVideoLoading,
    setIsVideoLoading,
    videoRef,
    setIsVideoPlaying,
  }) => {
    if (item.type === "video") {
      return (
        <TouchableOpacity onPress={() => onPress(index)}>
          <Video
            ref={videoRef}
            source={{ uri: item.url }}
            style={styles.image}
            resizeMode="cover"
            shouldPlay={index === 0}
            isLooping={true}
            useNativeControls={false}
            onPlaybackStatusUpdate={(status) => {
              if (status.isBuffering) {
                setIsVideoLoading(true);
              } else if (status.isLoaded) {
                setIsVideoLoading(false);
              }

              if (status.isPlaying) {
                setIsVideoPlaying(true);
              } else {
                setIsVideoPlaying(false);
              }
            }}
          />
          {isVideoLoading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="yellow" />
            </View>
          )}
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={() => onPress(index)}>
        <Image source={{ uri: item.url }} style={styles.image} />
      </TouchableOpacity>
    );
  }
);

// Memoized Thumbnail Component
const ThumbnailItem = memo(({ item, index, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.thumbnailItem, isActive && styles.thumbnailItemActive]}
      onPress={() => onPress(index)}
    >
      {item.type === "video" ? (
        <View>
          <Video
            source={{ uri: item.url }}
            style={styles.thumbnailVideo}
            resizeMode="cover"
            shouldPlay={false}
            useNativeControls={false}
          />
          <View style={styles.thumbnailVideoOverlay}>
            <Text style={styles.playIcon}>▶</Text>
          </View>
        </View>
      ) : (
        <Image source={{ uri: item.url }} style={styles.thumbnailImage} />
      )}
    </TouchableOpacity>
  );
});

const HomeHeader = ({ carId, scrollY }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["car", carId],
    queryFn: () => getCar(carId),
    enabled: false,
  });
  const car = data.data.car;

  const scrollViewRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const thumbnailsRef = useRef(null);
  const videoRef = useRef(null);

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

  // Memoize mediaItems array
  const mediaItems = useMemo(
    () => [
      ...(car.images.carVideo
        ? car.images.carVideo.map((val) => ({ type: "video", url: val.url }))
        : []),
      ...Object.values(car.images)
        .flat()
        .map((val) => ({ type: "image", url: val.url })),
    ],
    [car.images]
  );

  const [isPaused, setIsPaused] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    let index = 0;
    let interval;

    if (!isPaused) {
      interval = setInterval(() => {
        // If we're at the video and it's playing, don't auto-scroll
        if (index === 0 && mediaItems[0]?.type === "video" && isVideoPlaying) {
          return;
        }

        scrollViewRef.current.scrollTo({
          x: index * width,
          animated: true,
        });

        setCurrentIndex(index);
        index++;

        if (index >= mediaItems.length) {
          index = 0;
        }
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isPaused, isVideoPlaying]);

  // Memoize callback functions
  const openModal = useCallback((mediaIndex) => {
    setSelectedImageIndex(mediaIndex);
    setModalVisible(true);
    setIsPaused(true);

    setTimeout(() => {
      if (thumbnailsRef.current) {
        thumbnailsRef.current.scrollToIndex({
          index: mediaIndex,
          animated: true,
          viewPosition: 0.5,
        });
      }
    }, 100);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setIsPaused(false);
  }, []);

  const selectMedia = useCallback((index) => {
    setSelectedImageIndex(index);
    if (thumbnailsRef.current) {
      thumbnailsRef.current.scrollToIndex({
        index: index,
        animated: true,
        viewPosition: 0.5,
      });
    }
  }, []);

  const nextMedia = useCallback(() => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
  }, [mediaItems.length]);

  const prevMedia = useCallback(() => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex - 1 + mediaItems.length) % mediaItems.length
    );
  }, [mediaItems.length]);

  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isModalVideoLoading, setIsModalVideoLoading] = useState(true);

  // Memoize render functions
  const renderMediaItem = useCallback(
    ({ item, index }) => (
      <MediaItem
        item={item}
        index={index}
        onPress={openModal}
        isVideoLoading={isVideoLoading}
        setIsVideoLoading={setIsVideoLoading}
        videoRef={videoRef}
        setIsVideoPlaying={setIsVideoPlaying}
        setIsModalVideoLoading={setIsModalVideoLoading}
        isModalVideoLoading={isModalVideoLoading}
      />
    ),
    [isVideoLoading, openModal]
  );

  const renderThumbnail = useCallback(
    ({ item, index }) => (
      <ThumbnailItem
        item={item}
        index={index}
        isActive={index === selectedImageIndex}
        onPress={selectMedia}
      />
    ),
    [selectedImageIndex, selectMedia]
  );

  const renderModalContent = useCallback(() => {
    const currentItem = mediaItems[selectedImageIndex];
    if (currentItem.type === "video") {
      return (
        <>
          <Video
            source={{ uri: currentItem?.url }}
            style={styles.modalImage}
            resizeMode="contain"
            useNativeControls={true}
            onPlaybackStatusUpdate={(status) => {
              if (status.isBuffering) {
                setIsModalVideoLoading(true);
              } else if (status.isLoaded) {
                setIsModalVideoLoading(false);
              }
            }}
            shouldPlay={true}
            isLooping={true}
          />
          {isModalVideoLoading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="yellow" />
            </View>
          )}
        </>
      );
    }
    return (
      <Image source={{ uri: currentItem.url }} style={styles.modalImage} />
    );
  }, [mediaItems, selectedImageIndex]);

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

  const closeButtonText = {
    color: "#FFD700",
    fontSize: 20,
    fontWeight: "bold",
    ...(Platform.OS === "ios"
      ? {
          position: "absolute",
          top: 40,
          right: 20,
        }
      : {
          position: "absolute",
          top: -10,
          right: 15,
        }),
  };

  return (
    <View>
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
          {mediaItems.map((item, index) => renderMediaItem({ item, index }))}
        </ScrollView>

        <TouchableOpacity
          style={styles.backIconContainer}
          onPress={() => navigation.goBack()}
        >
          <BackIcon width={30} height={30} />
        </TouchableOpacity>

        <View style={styles.pagination}>
          {mediaItems.map((_, index) => (
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

      <Animated.View
        style={[styles.yellowContainer, { height: animatedContainerHeight }]}
      >
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

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="rgba(0, 0, 0, 0.9)"
            translucent
          />

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <View style={styles.closeButtonContainer}>
              <Text style={styles.closeButtonText}>✕</Text>
            </View>
          </TouchableOpacity>

          {/* Navigation Buttons */}
          <TouchableOpacity style={styles.leftButton} onPress={prevMedia}>
            <View style={styles.navButtonContainer}>
              <Text style={styles.navText}>❮</Text>
            </View>
          </TouchableOpacity>

          {/* Main Content */}
          <View style={styles.mainContentContainer}>
            {renderModalContent()}
          </View>

          <TouchableOpacity style={styles.rightButton} onPress={nextMedia}>
            <View style={styles.navButtonContainer}>
              <Text style={styles.navText}>❯</Text>
            </View>
          </TouchableOpacity>

          {/* Thumbnail Carousel */}
          <View style={styles.thumbnailCarouselContainer}>
            <FlatList
              ref={thumbnailsRef}
              data={mediaItems}
              renderItem={renderThumbnail}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.thumbnailsContent}
              initialScrollIndex={selectedImageIndex}
              getItemLayout={(data, index) => ({
                length: 85,
                offset: 85 * index,
                index,
              })}
              maxToRenderPerBatch={5}
              windowSize={5}
              removeClippedSubviews={true}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // semi-transparent overlay
  },
  container: {
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
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: width,
    height: width,
    resizeMode: "cover",
  },
  // Close Button
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1000,
  },
  closeButtonContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "300",
    lineHeight: 20,
  },
  // Navigation Buttons
  leftButton: {
    position: "absolute",
    left: 20,
    top: "50%",
    transform: [{ translateY: -25 }],
    zIndex: 1000,
  },
  rightButton: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: [{ translateY: -25 }],
    zIndex: 1000,
  },
  navButtonContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  navText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "300",
  },
  // Main Content
  mainContentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 80,
    paddingVertical: 100,
  },
  // Thumbnail Carousel
  thumbnailCarouselContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    height: 80,
    paddingHorizontal: 20,
  },
  thumbnailsContent: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  // Thumbnail Item
  thumbnailItem: {
    width: 70,
    height: 70,
    marginHorizontal: 7.5,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
  thumbnailItemActive: {
    borderColor: "#ffffff",
    borderWidth: 3,
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  thumbnailVideo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  thumbnailVideoOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  playIcon: {
    color: "#ffffff",
    fontSize: 16,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  // Main Media Display
  mediaContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  mainImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 12,
  },
  mainVideo: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  // Legacy thumbnail styles (keeping for backward compatibility)
  thumbnailContainer: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginHorizontal: 3,
    borderWidth: 2,
    borderColor: "transparent",
    overflow: "hidden",
  },
  selectedThumbnail: {
    transform: [{ scale: 1.05 }],
  },
  thumbnail: {
    borderColor: "#FFD700",
    padding: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderWidth: 0.4,
    borderRadius: 10,
  },
  videoThumbnail: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
});

export default memo(HomeHeader);
