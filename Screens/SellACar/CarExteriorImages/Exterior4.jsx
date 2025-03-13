import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons"; // Import Material Icons
import SectionHeader from "../../../CustomComponents/SectionHeader";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import CustomButton from "../../../CustomComponents/CustomButton";
import Exterior from "../../../assets/tahirAssets/exterior4";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import { useCar } from "../../../R1_Contexts/carContext";
import DialogBox from "../../../CustomComponents/DialogBox";
import { uploadImage } from "../../../utils/upload";

const Exterior4 = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation(); // Initialize navigation

  const {carState, dispatch} = useCar();
  const index = 3;

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

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
      setLoading(true);
      try {
        const imgUrl = await uploadImage(result.assets[0]);
        dispatch({
          type: 'UPDATE_IMAGE',
          section: "exterior",
          index: index,
          value: {type: 'image', url: imgUrl}
        });
      }
      catch(e) {
        setMessage({type: 'error', message: 'Error uploading image', title: 'Error'})
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <DialogBox
        visible={loading ? true : message ? true : false}
        message={message?.message}
        onOkPress={() => setMessage(null)}
        type={message?.type}
        loading={loading}
        title={message?.title || ''}
      />
      <SectionHeader title={"Step 4 of 6"} />
      <View style={{ gap: 20, justifySelf: "center" }}>
        <Text style={styles.text}>
          Take a picture of your car from the right back as shown below
        </Text>
        <TouchableOpacity onPress={openGallery} style={styles.imageContainer}>
          {carState.images.exterior[index]?.url ? (
            <>
              <Image source={{ uri: carState.images.exterior[index]?.url }} style={styles.image} />
              <View style={styles.penIconContainer}>
                <MaterialIcons
                  name="edit"
                  size={20}
                  color={"rgba(230, 230, 230, 0.9)"}
                />
              </View>
            </>
          ) : (
            <Exterior />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          style={{ marginBottom: 10 }}
          title="Next"
          onPress={() => navigation.navigate("Exterior5")}
        />
        <CustomButton
          title="Back"
          style={styles.nextButton}
          textStyle={styles.nextButtonText}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: GlobalStyles.colors.ScreenBg,
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: "Inter-SemiBold",
    textAlign: "center",
    fontSize: 16,
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
    height: "100%",
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

export default Exterior4;
