import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import SvgHamburger from "../assets/SVG/TahirSvgs/Hamburger.svg";
import SvgLocation from "../assets/SVG/TahirSvgs/Location.svg";
import SvgDown from "../assets/SVG/TahirSvgs/Down.svg";
import SvgFilter from "../assets/SVG/TahirSvgs/Filter.svg";
import SvgSearch from "../assets/SVG/TahirSvgs/Search.svg";

const Header = () => {
  // State for search input
  const [searchText, setSearchText] = useState("");

  // State for selected location
  const [location, setLocation] = useState("Birmingham");

  // State for profile image
  const [profileImage, setProfileImage] = useState(
    "https://your-profile-pic-url.com"
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.rowContainer}>
          {/* Left Section: Hamburger Icon */}
          <TouchableOpacity
            style={styles.left}
            onPress={() => console.log("Menu clicked")}
          >
            <SvgHamburger width={20} height={20} />
          </TouchableOpacity>

          {/* Center Section: Location Selector */}
          <TouchableOpacity
            style={styles.center}
            onPress={() => console.log("Change Location")}
          >
            <SvgLocation width={20} height={20} />
            <Text style={styles.text}>{location}</Text>
            <SvgDown width={15} height={15} />
          </TouchableOpacity>

          {/* Right Section: Profile Picture */}
          <TouchableOpacity
            style={styles.right}
            onPress={() => console.log("Profile Clicked")}
          >
            <Image source={{ uri: profileImage }} style={styles.profilePic} />
          </TouchableOpacity>
        </View>

        {/* Search and Filter Section */}
        <View style={styles.searchContainer}>
          {/* Left: Search Bar */}
          <View style={styles.searchBox}>
            <SvgSearch width={18} height={18} style={styles.searchIcon} />
            <TextInput
              placeholder="Search for Honda Pilot 7-Passenger"
              style={styles.searchInput}
              placeholderTextColor="#888"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {/* Right: Filter Icon */}
          <TouchableOpacity
            style={styles.filterIcon}
            onPress={() => console.log("Filter Clicked")}
          >
            <SvgFilter width={25} height={25} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#f3f4f6",
  },
  header: {
    width: width,
    height: height * 0.23,
    backgroundColor: "#FEE226",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 15,
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
  },
  right: {
    width: "20%",
    alignItems: "flex-end",
  },
  text: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "gray",
  },

  // Search and Filter Section
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
