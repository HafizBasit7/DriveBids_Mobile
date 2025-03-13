import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons"; // Import Material Icons
import SectionHeader from "../../../CustomComponents/SectionHeader";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import CustomButton from "../../../CustomComponents/CustomButton";
import Interior from "../../../assets/tahirAssets/Interior5";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";
import { uploadImage } from "../../../utils/upload";
import DialogBox from "../../../CustomComponents/DialogBox";
const Interior5 = () => {
  
  const {carState, dispatch, draftSave} = useCar();
  const index = 4;

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const navigation = useNavigation();
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
          section: "interior",
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

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
        await draftSave('images', 'interior');
        setMessage({type: 'success', message: 'Car Saved', title: 'Success'});
    }
    catch(e) {
        setMessage({type: 'error', message: e.message || e.msg, title: 'Error'});
    } finally {
      setLoading(false);
    }
  };

  const onOk = () => {
    if(message?.type === 'error') {
      setMessage(null);
    } else {
      setMessage(null); navigation.popTo("CarImages");
    }
  };

  return (
    <View style={styles.container}>
      <DialogBox
        visible={loading ? true : message ? true : false}
        message={message?.message}
        onOkPress={onOk}
        type={message?.type}
        loading={loading}
        title={message?.title || ''}
      />

      <SectionHeader title={"Step 5 of 5"} />
      <View style={{ gap: 20, justifySelf: "center" }}>
        <Text style={styles.text}>
          Take a picture of the trunk as shown below
        </Text>
        <TouchableOpacity onPress={openGallery} style={styles.imageContainer}>
          {carState.images.interior[index]?.url  ? (
            <>
              <Image source={{ uri: carState.images.interior[index]?.url }} style={styles.image} />
              <View style={styles.penIconContainer}>
                <MaterialIcons
                  name="edit"
                  size={20}
                  color={"rgba(230, 230, 230, 0.9)"}
                />
              </View>
            </>
          ) : (
            <Interior />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          style={{ marginBottom: 10 }}
          title="Finish"
          onPress={handleSaveDraft}
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

export default Interior5;
