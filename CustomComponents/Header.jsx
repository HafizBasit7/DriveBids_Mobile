import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import SvgBack from "../assets/SVG/TahirSvgs/back.svg";
import SvgLocation from "../assets/SVG/TahirSvgs/Location.svg";
import SvgDown from "../assets/SVG/TahirSvgs/Down.svg";
import SvgFilter from "../assets/SVG/TahirSvgs/Filter.svg";
import SvgSearch from "../assets/SVG/TahirSvgs/Search.svg";
import { useAuth } from "../R1_Contexts/authContext";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";

const { height, width } = Dimensions.get("window");

// Animation Constants
const MAX_HEADER_HEIGHT = height * 0.22;
const MIN_HEADER_HEIGHT = height * 0.13;
const SCROLL_RANGE = 150;

const Header = ({ showSearch = true, scrollY, title = null }) => {
  // Interpolations for animation
  const headerHeight = scrollY?.interpolate({
    inputRange: [0, SCROLL_RANGE],
    outputRange: [MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT],
    extrapolate: "clamp",
  });

  const searchOpacity = scrollY?.interpolate({
    inputRange: [0, SCROLL_RANGE * 0.5],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const searchScale = scrollY?.interpolate({
    inputRange: [0, SCROLL_RANGE * 0.5],
    outputRange: [1, 0.9],
    extrapolate: "clamp",
  });

  // Search input state
  const [searchText, setSearchText] = useState("");
  const { authState } = useAuth();
  const navigation = useNavigation();

  const currentSelectedLocation =
    authState.selectedLocation?.name || authState.user.location?.name;

  const navigateToChangeLocation = () => {
    navigation.navigate("ChangeLocation");
  };

  return (
    <View style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />

        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <View style={styles.rowContainer}>
            {navigation.canGoBack() && (
              <TouchableOpacity
                style={styles.left}
                onPress={() => navigation.goBack()}
              >
                <SvgBack width={30} height={28} />
              </TouchableOpacity>
            )}

            {!navigation.canGoBack() && (
              <TouchableOpacity style={styles.left}></TouchableOpacity>
            )}

            {!title && (
              <TouchableOpacity
                style={styles.center}
                onPress={navigateToChangeLocation}
              >
                <SvgLocation width={15} height={18} />
                <Text style={[styles.text]} numberOfLines={1}>
                  {currentSelectedLocation || "Your City"}
                </Text>
                <SvgDown width={15} height={15} />
              </TouchableOpacity>
            )}

            {title && (
              <Text style={{ fontWeight: "800", fontSize: 18 }}>{title}</Text>
            )}

            <TouchableOpacity
              style={styles.right}
              onPress={() => navigation.navigate("Profile")}
            >
              <Image
                source={{
                  uri:
                    authState?.user?.imgUrl ||
                    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
                }}
                style={styles.profilePic}
              />
            </TouchableOpacity>
          </View>

          {showSearch && (
            <Animated.View
              style={[
                styles.searchContainer,
                { opacity: searchOpacity, transform: [{ scale: searchScale }] },
              ]}
            >
              <View style={styles.searchBox}>
                <SvgSearch width={18} height={18} style={styles.searchIcon} />
                <TextInput
                  onPress={() => {
                    navigation.navigate("FiltersScreen", { fromSearch: true });
                  }}
                  placeholder="Search for Honda Pilot 7-Passenger"
                  style={styles.searchInput}
                  placeholderTextColor="#888"
                  value={searchText}
                  onChangeText={setSearchText}
                />
              </View>

              <TouchableOpacity
                style={styles.filterIcon}
                onPress={() => navigation.navigate("FiltersScreen")}
              >
                <SvgFilter width={25} height={25} />
              </TouchableOpacity>
            </Animated.View>
          )}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#FEE226",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  header: {
    width: width,
    backgroundColor: "#FEE226",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 6,
  },
  rowContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "5%",
    marginTop: "10%",
  },
  left: {
    width: "20%",
    alignItems: "flex-start",
  },
  center: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
  },
  right: {
    width: "20%",
    alignItems: "flex-end",
  },
  text: {
    marginHorizontal: 6,
    fontSize: 16,
    fontWeight: "bold",
  },
  profilePic: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: "gray",
    marginRight: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
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
  searchIcon: {
    marginLeft: 10,
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: "#000000",
    textAlignVertical: "center",
  },
  filterIcon: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
  },
});

export default Header;
