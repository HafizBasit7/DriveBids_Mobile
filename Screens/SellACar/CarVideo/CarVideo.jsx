import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  StatusBar,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";
import { uploadVideo } from "../../../utils/uploadVideo";
import DialogBox from "../../../CustomComponents/DialogBox";
import { Icon } from "react-native-elements";
import { Video } from "expo-av";

const CarVideo = () => {
  const navigation = useNavigation();
  const { carState, dispatch, draftSave } = useCar();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [videoModalVisible, setVideoModalVisible] = useState(false);

  const handleGallery = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
        videoMaxDuration: 60,
      });

      if (!result.canceled) {
        setVideoModalVisible(false);
        setLoading(true);
        try {
          const videoUrl = await uploadVideo(result.assets[0]);
          dispatch({
            type: "UPDATE_IMAGE",
            section: "carVideo",
            index: 0,
            value: { type: "video", url: videoUrl },
          });
        } catch (e) {
          setMessage({
            type: "error",
            message: e.message || "Error uploading video",
            title: "Error",
          });
        } finally {
          setLoading(false);
        }
      }
    } catch (error) {
      setMessage({
        type: "error",
        message: "Error selecting video",
        title: "Error",
      });
    }
  };

  const handleCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
        videoMaxDuration: 60,
      });

      if (!result.canceled) {
        setVideoModalVisible(false);
        setLoading(true);
        try {
          const videoUrl = await uploadVideo(result.assets[0]);
          dispatch({
            type: "UPDATE_IMAGE",
            section: "carVideo",
            index: 0,
            value: { type: "video", url: videoUrl },
          });
        } catch (e) {
          setMessage({
            type: "error",
            message: e.message || "Error uploading video",
            title: "Error",
          });
        } finally {
          setLoading(false);
        }
      }
    } catch (error) {
      setMessage({
        type: "error",
        message: "Error recording video",
        title: "Error",
      });
    }
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
      await draftSave("images", "carVideo");
      setMessage({ type: "success", message: "Car Video Saved", title: "Success" });
    } catch (e) {
      setMessage({
        type: "error",
        message: e.message || e.msg,
        title: "Error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onOk = () => {
    if (message?.type === "error") {
      setMessage(null);
    } else {
      setMessage(null);
      navigation.popTo("CarImages");
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={videoModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <StatusBar
              barStyle="dark-content"
              backgroundColor="rgba(0,0,0,0.7)"
              translucent
            />

            <Text style={styles.modalTitle}>Select or Record a Video</Text>
            <TouchableOpacity style={styles.modalItem} onPress={handleCamera}>
              <Icon name="videocam" type="material" size={24} color="#3b82f6" />
              <Text style={styles.modalText}>Record Video</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={handleGallery}>
              <Icon name="video-library" type="material" size={24} color="#3b82f6" />
              <Text style={styles.modalText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setVideoModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <DialogBox
        visible={loading ? true : message ? true : false}
        message={message?.message}
        onOkPress={onOk}
        type={message?.type}
        loading={loading}
        title={message?.title || ""}
      />

      <SectionHeader title={"Car Video"} />
      <View style={{ gap: 20, justifySelf: "center" }}>
        <Text style={styles.text}>
          Upload a video of your car 
        </Text>

        <TouchableOpacity
          onPress={() => setVideoModalVisible(true)}
          style={styles.videoContainer}
        >
          {carState.images.carVideo?.[0]?.url ? (
            <>
              <Video
                source={{ uri: carState.images.carVideo[0].url }}
                style={styles.video}
                useNativeControls
                contentFit="cover"
                isLooping
              />
              <View style={styles.penIconContainer}>
                <MaterialIcons
                  name="edit"
                  size={20}
                  color={"rgba(230, 230, 230, 0.9)"}
                />
              </View>
            </>
          ) : (
            <View style={styles.placeholder}>
              <MaterialIcons name="videocam" size={40} color="#6F6F6F" />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          style={{ marginBottom: 10 }}
          title="Save"
          onPress={handleSaveDraft}
          disabled={!carState.images.carVideo?.[0]?.url}
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
    textAlign: "center",
    fontSize: 16,
  },
  videoContainer: {
    maxHeight: 300,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    minWidth:350,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  video: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholder: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
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
    marginBottom: "8%",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    maxHeight: "60%",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    marginBottom: 15,
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    marginLeft: 10,
  },
  modalCloseButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "#2F61BF",
    borderRadius: 8,
    alignItems: "center",
  },
  modalCloseText: {
    color: "#fff",
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
});

export default CarVideo; 