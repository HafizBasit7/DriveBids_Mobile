import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import {useCar} from "../../../R1_Contexts/carContext";
import DialogBox from "../../../CustomComponents/DialogBox";

const CarDetails14 = () => {

  const navigation = useNavigation();
  const {carState, dispatch, draftSave} = useCar();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  function updateField(field, value) {
    dispatch({
      type: 'UPDATE_FIELD',
      section: 'carDetails',
      field,
      value,
    });
  }

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
        await draftSave('carDetails');
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={{ flex: 1 }}>
        <DialogBox
          visible={loading ? true : message ? true : false}
          message={message?.message}
          onOkPress={onOk}
          type={message?.type}
          loading={loading}
          title={message?.title || ''}
        />
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Step Progress Indicator */}
          <View style={styles.lineContainer}>
            <View style={styles.line} />
            <Text style={styles.lineText}>Step 14 of 14</Text>
            <View style={styles.line} />
          </View>

          {/* Section Title */}
          <View style={styles.lineContainer}>
            <View style={styles.line} />
            <Text style={styles.lineText2}>Ads Description</Text>
            <View style={styles.line} />
          </View>

          {/* Ad Title Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>
              Ad Title <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, { height: 50 }]}
              value={carState.carDetails.title}
              onChangeText={(value) => updateField('title', value)}
              placeholder="Enter Ad Title"
            />
          </View>

          {/* Ad Description Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>
              Ad Description <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              value={carState.carDetails.description}
              onChangeText={(value) => updateField('description', value)}
              placeholder="Enter Ad Description"
              multiline
            />
          </View>
        </ScrollView>

        {/* Buttons at the bottom */}
        <View style={styles.buttonContainer}>
          <CustomButton
            style={styles.button}
            title="Finish"
            onPress={handleSaveDraft}
          />
          <View style={{ height: 10 }} />
          {/* <CustomButton
            title="Back"
            style={styles.backButton}
            textStyle={{ color: "#007BFF" }}
            onPress={() => navigation.goBack()}
          /> */}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Ensures no overlap with buttons
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#000",
  },
  lineText: {
    marginHorizontal: 4,
    fontSize: 20,
    paddingHorizontal: 10,
    color: "#000",
    fontWeight: "700",
  },
  lineText2: {
    marginHorizontal: 4,
    fontSize: 16,
    paddingHorizontal: 10,
    color: "#000",
    fontWeight: "700",
  },
  inputWrapper: {
    marginBottom: 15,
    marginTop:"6%"
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  required: {
    color: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#F9F9F9",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "3%",
  },
  button: {
    width: "90%",
  },
  backButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#007BFF",
    width: "90%",
  },
});

export default CarDetails14;
