import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
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

  const {carState, carPostAd} = useCar();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const carPricingCompletion = carPricingValidation.safeParse(carState.carPricing);
  const carInspectionReportCompletion = carInspectionReportValidation.safeParse(carState.carInspectionReport);
  const carDetailsCompletion = carDetailsValidation.safeParse(carState.carDetails);
  const imageCompletion = imagesValidation.safeParse(carState.images);
  const carDamageReportComplection = carDamageReportValidation.safeParse(carState.carDamageReport || undefined);
  const carFeaturesCompletion = carFeaturesValidation.safeParse(carState.features);

  const postAdAllow = (carPricingCompletion.success && carInspectionReportCompletion.success && carDetailsCompletion.success && imageCompletion.success
    && carDamageReportComplection.success && carFeaturesCompletion.success
  );

  const queryClient = useQueryClient();

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
        await carPostAd();
        //OK: DONE
        queryClient.invalidateQueries('cars');
        queryClient.invalidateQueries('carsEnding');
        queryClient.invalidateQueries('carsByBidCount');
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent} // Allows content to expand
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
          name="Car Images"
          steps={4}
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
          onPress={() => navigation.navigate("DamageInspection")}
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
});

export default VehicleInfo;
