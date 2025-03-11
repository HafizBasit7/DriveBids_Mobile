import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
} from "react-native";
import { Svg, Circle } from "react-native-svg";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../../../CustomComponents/CustomButton";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import DamageReportModal from "../../../CustomComponents/DamageReportModal";

const damageOptions = [
  { label: "Scratches", icon: "gesture", color: "#2D8CFF" },
  { label: "Dents/Cracks", icon: "build", color: "#FEE226" },
  { label: "Rust", icon: "coronavirus", color: "#D35400" },
];

const DamageInspection = () => {
  const carSides = [
    require("../../assets/tahirAssets/CarFront.png"),
    require("../../assets/tahirAssets/CarRight.png"),
    require("../../assets/tahirAssets/CarLeft.png"),
    require("../../assets/tahirAssets/CarBack.png"),
  ];
  const [selectedDamage, setSelectedDamage] = useState(damageOptions[0]);
  const [markers, setMarkers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [damageDescription, setDamageDescription] = useState("");
  const [image, setImage] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [carFacing, setCarFacing] = useState(0);
  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };
  const handleSelectDamage = (damage) => {
    setSelectedDamage(damage);
  };

  const handleCarPress = (event) => {
    if (!selectedDamage) return;
    const { locationX, locationY } = event.nativeEvent;
    const newMarker = {
      x: locationX,
      y: locationY,
      type: selectedDamage,
      description: "",
      image: null,
    };
    setSelectedMarker(newMarker);
    setModalVisible(true);
  };

  const handleSaveDamage = () => {
    setMarkers([...markers, selectedMarker]);
    setModalVisible(false);
    setDamageDescription("");
    setImage(null);
    setSelectedMarker(null);
  };
  const dismissModal = () => {
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <SectionHeader title={`Step ${carFacing + 1} of 4`} />
      <Text style={styles.instruction}>
        Please pick the damage label and place it on the front part of the car
        that is damaged
      </Text>

      <View style={styles.damageSelector}>
        {damageOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.damageOption,
              selectedDamage?.label === option.label && {
                backgroundColor: "#E8F0FF",
                fontWeight: "700",
              },
            ]}
            onPress={() => handleSelectDamage(option)}
          >
            <View
              style={[
                {
                  borderColor: "#DADADA",
                  borderWidth: 2,
                  borderRadius: 8,
                  padding: 2,
                },
                selectedDamage?.label === option.label && {
                  borderColor: GlobalStyles.colors.ButtonColor,
                  borderWidth: 2,
                },
              ]}
            >
              <MaterialIcons
                name={option.icon}
                size={20}
                color={option.color}
              />
            </View>
            <Text
              style={[
                styles.optionText,
                selectedDamage?.label === option.label && { fontWeight: "700" },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          padding: 20,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity style={styles.carContainer} onPress={handleCarPress}>
          <Svg width={250} height={200} viewBox="0 0 250 200">
            <Image source={carSides[carFacing]} style={styles.carImage} />
            {markers.map((marker, index) => (
              <Circle
                key={index}
                cx={marker.x}
                cy={marker.y}
                r={8}
                fill={marker.type.color}
              />
            ))}
          </Svg>
        </TouchableOpacity>
        <Text style={[styles.instruction, { fontSize: 15, marginTop: 7 }]}>
          {carFacing === 0
            ? "[ Front Side ]"
            : carFacing === 1
            ? "[ Right Side ]"
            : carFacing === 2
            ? "[ Left Side ]"
            : "[ Back Side ]"}
        </Text>

        <View style={styles.buttonContainer}>
          {carFacing < 3 ? (
            <CustomButton
              title="Next"
              onPress={() => setCarFacing(carFacing + 1)}
            />
          ) : (
            <CustomButton
              title="Finish"
              onPress={() => console.log("All Marks Completed!")}
            />
          )}
          {carFacing > 0 && (
            <CustomButton
              onPress={() => setCarFacing(carFacing - 1)}
              title="Back"
              style={styles.nextButton}
              textStyle={styles.nextButtonText}
            />
          )}
        </View>
      </View>
      <DamageReportModal
        damageDescription={damageDescription}
        openGallery={openGallery}
        setDamageDescription={setDamageDescription}
        selectedImage={selectedImage}
        styles={styles}
        modalVisible={modalVisible}
        handleSaveDamage={handleSaveDamage}
        dismissModal={dismissModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ffff",
  },

  instruction: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,

    textAlign: "center",
    marginBottom: 15,
  },
  damageSelector: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  damageOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderRadius: 8,
  },
  optionText: {
    marginLeft: 8,
    fontFamily: "Inter-Regular",
    fontSize: 14,
  },
  carContainer: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#7B7B7B",
    padding: 20,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  carImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  modalContainer: {
    maxHeight: "85%",

    justifySelf: "center",
    alignSelf: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    width: "90%",
    borderWidth: 2,
    borderColor: "#DADADA",
    justifyContent: "space-around",
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#DADADA",
    fontFamily: "Inter-Regular",
    height: "40%",
    textAlignVertical: "top",
    padding: 8,
    marginBottom: 10,
  },
  uploadText: {
    color: "#2D8CFF",
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  previewImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  imageContainer: {
    maxHeight: 300,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  penIconContainer: {
    position: "absolute",

    backgroundColor: "rgba(22, 23, 24, 0.8)",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
  },
  nextButton: {
    backgroundColor: "transparent",
    borderColor: GlobalStyles.colors.ButtonColor,
    borderWidth: 1,
    marginBottom: 2,
  },
  nextButtonText: {
    color: GlobalStyles.colors.ButtonColor,
    fontFamily: "Inter-SemiBold",
  },
});

export default DamageInspection;
