import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Svg, Circle } from "react-native-svg";
import { MaterialIcons } from "@expo/vector-icons";
import {uploadImage} from "../../../utils/upload";

import CustomButton from "../../../CustomComponents/CustomButton";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import SectionHeader from "../../../CustomComponents/SectionHeader";
// import DamageReportModal from "../../../CustomComponents/DamageReportModal";
import DamageReportModal from "../../../CustomComponents/DamageReportModal"
import { useCar } from "../../../R1_Contexts/carContext";
import DialogBox from "../../../CustomComponents/DialogBox";
import { useNavigation } from "@react-navigation/native";

const damageOptions = [
  { label: "Scratches", icon: "gesture", color: "#2D8CFF" },
  { label: "Dents/Cracks", icon: "build", color: "#FEE226" },
  { label: "Rust", icon: "coronavirus", color: "#D35400" },
];

const carSides = [
  require("../../../assets/tahirAssets/CarFront.png"),
  require("../../../assets/tahirAssets/CarRight.png"),
  require("../../../assets/tahirAssets/CarLeft.png"),
  require("../../../assets/tahirAssets/CarBack.png"),
];

const DamageInspection = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [carFacing, setCarFacing] = useState(0);

  const navigation = useNavigation();
  
  //Loading
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  //Draft State
  const {carState, dispatch, draftSave} = useCar();
  const location = useRef({locationX: 0, locationY: 0});
  

  const handleCarPress = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    location.current = {locationX, locationY};
    setModalVisible(true);
  };

  const handleSaveDamage = async (damageReport) => {
    //Hide modal
    setModalVisible(false);

    let imgUrl = false;
    //Upload image
    try {
      setLoading(true);
      imgUrl = await uploadImage(damageReport.imageUrl);
    }
    catch(e) {
      setMessage({type: 'error', message: 'Error uploading image', title: 'Error'});
    } finally {
      setLoading(false);
    }

    if(!imgUrl) return;

    //Save new damage report
    dispatch({
      type: 'INSERT_DAMAGE',
      value: {
        imageIndex: carFacing,
        x: location.current.locationX,
        y: location.current.locationY,
        imageUrl: imgUrl,
        damageType: damageReport.damageType,
        description: damageReport.description,
      },
    });
  };

  const dismissModal = () => {
    setModalVisible(false);
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
        await draftSave('carDamageReport');
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
      setMessage(null); navigation.popTo("VehicleInfo");
    }
  };

  return (
    <View style={styles.container}>
      {/* Loading Dialog */}
      <DialogBox
        visible={loading ? true : message ? true : false}
        message={message?.message}
        onOkPress={onOk}
        type={message?.type}
        loading={loading}
        title={message?.title || ''}
      />

      <SectionHeader title={`Step ${carFacing + 1} of 4`} />
      <Text style={styles.instruction}>
        Click on the part of car where damage exists
      </Text>

      {/* Damage Info */}
      <View style={styles.damageSelector}>
        {damageOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.damageOption,
              // selectedDamage?.label === option.label && {
              //   backgroundColor: "#E8F0FF",
              //   fontWeight: "700",
              // },
            ]}
            // onPress={() => handleSelectDamage(option)}
          >
            <View
              style={[
                {
                  borderColor: "#DADADA",
                  borderWidth: 2,
                  borderRadius: 8,
                  padding: 2,
                },
                // selectedDamage?.label === option.label && {
                //   borderColor: GlobalStyles.colors.ButtonColor,
                //   borderWidth: 2,
                // },
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
                // selectedDamage?.label === option.label && { fontWeight: "700" },
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
        <TouchableOpacity style={styles.carContainer} >
          <Svg width={250} height={200} viewBox="0 0 250 200">
            <Image source={carSides[carFacing]} style={styles.carImage} onPress={handleCarPress} />
              {carState.carDamageReport?.damageReport.map((marker, index) => {
                if(marker.imageIndex === carFacing) {
                  const option = damageOptions.find(val => val.label === marker.damageType);
                  return (
                    <MaterialIcons
                      key={index}
                      name={option.icon}
                      size={20}
                      color={option.color}
                      style={{
                        position: "absolute",
                        left: marker.x - 20 / 2, // Center the icon at x
                        top: marker.y - 20 / 2,  // Center the icon at y
                      }}
                    />
                    
                  );
                }
              })}
          </Svg>
        </TouchableOpacity>

        {/* Instruction */}
        <Text style={[styles.instruction, { fontSize: 15, marginTop: 7 }]}>
          {carFacing === 0
            ? "[ Front Side ]"
            : carFacing === 1
            ? "[ Right Side ]"
            : carFacing === 2
            ? "[ Left Side ]"
            : "[ Back Side ]"}
        </Text>

        {/* Button */}
        <View style={[styles.buttonContainer, {marginBottom: carFacing > 0 ? 95 : 80}]}>
          {carFacing < 3 ? (
            <CustomButton
              title="Next"
              onPress={() => setCarFacing(carFacing + 1)}
            />
          ) : (
            <CustomButton
              title="Finish"
              onPress={handleSaveDraft}
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
    marginBottom: 5,
  },
  damageSelector: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",  },
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
    width: 200,
    height: 200,
    resizeMode: "contain",
  
    marginHorizontal:"auto"
  
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
   
    marginTop:"43%"
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
