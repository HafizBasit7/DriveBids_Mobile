import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useCar } from "../../../R1_Contexts/carContext";
import DialogBox from "../../../CustomComponents/DialogBox";

const PriceRange4 = () => {
  const navigation = useNavigation(); // Initialize navigation
  const { carState, dispatch, draftSave } = useCar();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
      await draftSave("carPricing");
      setMessage({ type: "success", message: "Car Saved", title: "Success" });
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
      navigation.popTo("VehicleInfo");
    }
  };

  function setDuration(value) {
    const getFutureDateUTC = (weeks) => {
      const currentDateUTC = new Date();
      const futureDateUTC = new Date(currentDateUTC);
      futureDateUTC.setUTCDate(futureDateUTC.getUTCDate() + weeks * 7);
      return futureDateUTC.toUTCString();
    };

    dispatch({
      type: "UPDATE_FIELD",
      section: "carPricing",
      field: "duration",
      value: getFutureDateUTC(value),
    });

    dispatch({
      type: "UPDATE_FIELD",
      field: "selectedWeek",
      value,
    });
  }

  const entities = [
    { id: "1", name: "1 week" },
    { id: "2", name: "2 weeks" },
    { id: "3", name: "3 weeks" },
    { id: "4", name: "4 weeks" },
  ];
const isDurationSelected = !!carState.selectedWeek;

  return (
    <View style={styles.container}>
      <DialogBox
        visible={loading ? true : message ? true : false}
        message={message?.message}
        onOkPress={onOk}
        type={message?.type}
        loading={loading}
        title={message?.title || ""}
      />

      {/* Step Progress Indicator */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText}>Step 4 of 4</Text>
        <View style={styles.line} />
      </View>

      {/* Section Title */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText2}>Auction Duration</Text>
        <View style={styles.line} />
      </View>

      {/* Entity Selection */}
      <View style={styles.entityContainer}>
        <FlatList
          data={entities}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.entityItem}
              onPress={() => setDuration(item.id)}
            >
              <View style={styles.radioButtonContainer}>
                <View
                  style={[
                    styles.radioButton,
                    carState.selectedWeek === item.id &&
                      styles.radioButtonSelected,
                  ]}
                >
                  {carState.selectedWeek === item.id && (
                    <View style={styles.radioDot} />
                  )}
                </View>
              </View>
              <Text style={styles.entityText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            style={styles.button}
            title="Save"
            onPress={handleSaveDraft}
              disabled={!isDurationSelected}

          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 20,
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
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
  },
  inputHeading: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 55,
    width: "80%",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  currencyText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  entityContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  entityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  radioButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#007BFF",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007BFF",
  },
  entityText: {
    fontSize: 16,
    color: "#000",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    alignSelf: "center",
    marginTop: "70%",
  },
  button: {
    marginBottom: 5,
  },
  backButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#007BFF",
  },
});

export default PriceRange4;
