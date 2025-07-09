import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import CustomButton from "../../../CustomComponents/CustomButton";
import VehicleInfoCard from "../../../CustomComponents/VehicleInfoCard";
import { useNavigation } from "@react-navigation/native";
import {useCar} from "../../../R1_Contexts/carContext";
import DialogBox from "../../../CustomComponents/DialogBox";
import { carDamageReportValidation, carDetailsValidation, carFeaturesValidation, carInspectionReportValidation, carPricingValidation, imagesValidation } from "../../../R1_Validations/CarValidations";
import { useQueryClient } from "@tanstack/react-query";

const VehicleInfo = () => {

  const {carState, carPostAd, dispatch} = useCar();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const carPricingCompletion = carPricingValidation.safeParse(carState.carPricing);
  const carInspectionReportCompletion = carInspectionReportValidation.safeParse(carState.carInspectionReport);
  const carDetailsCompletion = carDetailsValidation.safeParse(carState.carDetails);
  const imageCompletion = imagesValidation.safeParse(carState.images);
  const carDamageReportComplection = carDamageReportValidation.safeParse(carState.carDamageReport);
  const carFeaturesCompletion = carFeaturesValidation.safeParse(carState.features);

  const postAdAllow = (carPricingCompletion.success && carInspectionReportCompletion.success && carDetailsCompletion.success && imageCompletion.success
    && carDamageReportComplection.success && carFeaturesCompletion.success
  );

  const queryClient = useQueryClient();

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
        await carPostAd();
        setMessage({type: 'success', message: 'Car ad posted!', title: 'Success'});
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
      setMessage(null); navigation.popTo("SellCar");
    }
  };

  const navigation = useNavigation("");
  const totalSections = 6;
  const completedSections = [
    carPricingCompletion.success,
    carInspectionReportCompletion.success,
    carDetailsCompletion.success,
    imageCompletion.success,
    carDamageReportComplection.success,
    carFeaturesCompletion.success
  ].filter(Boolean).length;
  
  const completionPercentage = Math.round((completedSections / totalSections) * 100);

  const handleDamageNavigate = () => {
    if(carState?.carDamageReport === null || carState?.carDamageReport?.damageReport?.length === 0) {
      dispatch({type: 'SET_DRAFT', payload: {...carState, carDamageReport: undefined}});
    }
    navigation.navigate("DamageInspection");
  };
  
  return (
    <View style={styles.container}>

      {/* loading dialog */}
      <DialogBox
        visible={loading ? true : message ? true : false}
        message={message?.message}
        onOkPress={onOk}
        type={message?.type}
        loading={loading}
        title={message?.title || ''}
      />

      <SectionHeader title={"Vehicle Information"} />
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${completionPercentage}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          You're {completionPercentage}% done — keep going!
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent} 
      >
        <VehicleInfoCard
          name="Car Details"
          steps={14}
          iconName="file-document"
          completionStatus={carDetailsCompletion.success ? "Completed" : "Incomplete"}
          onPress={() => navigation.navigate("CarDetails1")}
        />
        <VehicleInfoCard
          name="Car Features"
          steps={2}
          iconName="account"
          completionStatus={carFeaturesCompletion.success ? "Completed" : "Incomplete"}
          onPress={() => navigation.navigate("ExteriorFeature1")}
        />
        <VehicleInfoCard
          name="Car Images & Video"
          steps={5}
          iconName="car"
          completionStatus={imageCompletion.success ? "Completed" : "Incomplete"}
          onPress={() => navigation.navigate("CarImages")}
        />
        <VehicleInfoCard
          name="Inspection Report"
          steps={3}
          iconName="shield-check"
          completionStatus={carInspectionReportCompletion.success ? "Completed": "Incomplete"}
          onPress={() => navigation.navigate("InspectionReport1")}
        />
        <VehicleInfoCard
          name="Damage Report"
          steps={4}
          iconName="car-wrench"
          completionStatus={carDamageReportComplection.success ? "Completed" : "Incomplete"}
          onPress={handleDamageNavigate}
        />
        <VehicleInfoCard
          name="Car Pricing"
          steps={4}
          iconName="tag"
          completionStatus={carPricingCompletion.success ? "Completed" : "Incomplete"}
          
          onPress={() => navigation.navigate("PriceRange1")}
        />
      </ScrollView>

      {/* Buttons placed outside the ScrollView */}
      <View style={styles.buttonContainer}>
        {postAdAllow && <CustomButton title="Post Ad" style={styles.postAdButton} onPress={handleSaveDraft}/>}
        {/* <CustomButton
          title="Save Draft"
          style={styles.saveDraftButton}
          textStyle={styles.saveDraftText}
          onPress={() => navigation.navigate("Draft")}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: "1%",
    backgroundColor: GlobalStyles.colors.ScreenBg,
  },
  scrollContent: {
    flexGrow: 1, // Ensures scrollable content does not overlap
    paddingBottom: 20, // Adds some space before buttons
  },
  buttonContainer: {
    width: "100%",
    // paddingVertical: 0,
    backgroundColor: GlobalStyles.colors.ScreenBg,
  },
  postAdButton: {
    marginBottom: "8%",
  },
  saveDraftButton: {
    backgroundColor: "transparent",
    borderColor: GlobalStyles.colors.ButtonColor,
    borderWidth: 1,
  },
  saveDraftText: {
    color: GlobalStyles.colors.ButtonColor,
    fontFamily: "Inter-SemiBold",
  },
  progressContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#ccc",
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: GlobalStyles.colors.ButtonColor,
    borderRadius: 4,
  },
  progressText: {
    marginTop: 8,
    fontSize: 14,
    color: GlobalStyles.colors.TextColor,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});

export default VehicleInfo;
