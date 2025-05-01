import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../../../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "react-native-elements"; // Importing CheckBox
import { useCar } from "../../../R1_Contexts/carContext";
import DialogBox from "../../../CustomComponents/DialogBox";

const InteriorFeature1 = () => {
  const navigation = useNavigation(); // Initialize navigation
  const {carState, dispatch, draftSave} = useCar();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const options = [
    { id: 1, label: "Leather Seats" },
    { id: 2, label: "Power Steering" },
    { id: 3, label: "Power Windows" },
    { id: 4, label: "Climate Control" },
    { id: 5, label: "Heated Seats" },
    { id: 6, label: "Push Start Button" },
    { id: 7, label: "Touchscreen Infotainment" },
    { id: 8, label: "Rear AC Vents" },
    { id: 9, label: "Cruise Control" },
    { id: 10, label: "Wireless Charging" },
    { id: 11, label: "Sunroof" },
    {id: 12,   label:"Ambient Interior Lighting"},
    {id: 13,   label:"Power Adjustable Seats"},
    {id: 14,   label:"    Rear Seat Armrest with Cupholders"},


    
    
  ];

  const toggleSelection = (value) => {
    if(carState.features?.interior?.includes(value)) {
      dispatch({
        type: 'REMOVE_FEATURE',
        section: 'interior',
        value,
      });
      return;
    };

    dispatch({
      type: 'UPDATE_FEATURE',
      section: 'interior',
      value,
    });
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
        await draftSave('features');
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
      <DialogBox
        visible={loading ? true : message ? true : false}
        message={message?.message}
        onOkPress={onOk}
        type={message?.type}
        loading={loading}
        title={message?.title || ''}
      />
      {/* Step Progress Indicator */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText}>Step 2 of 2</Text>
        <View style={styles.line} />
      </View>

      {/* Section Title */}
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText2}>Interior & Convenience Features</Text>
        <View style={styles.line} />
      </View>

      {/* Clickable List with Checkboxes */}
      <FlatList
      style={{paddingTop: 20}}
  data={options}
  numColumns={2}
  
  columnWrapperStyle={{ justifyContent: 'space-between',  }}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity
    key={item.id}
      onPress={() => toggleSelection(item.label)}
      style={{
        width: '48%',
        marginBottom: 8,
       
        justifyContent: 'flex-start',
        borderRadius: 6,
        padding: 8,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <CheckBox
          checked={carState.features?.interior?.includes(item.label)}
          onPress={() => toggleSelection(item.label)}
          checkedColor="#007BFF"
          containerStyle={{ padding: 0, margin: 0 }}
        />
        <Text style={{ marginLeft: 2, fontSize: 14 ,   marginLeft: 4,
    fontSize: 14,
    flexShrink: 1,
    flexWrap: 'wrap',}}>{item.label} </Text>
      </View>
    </TouchableOpacity>
  )}
/>


      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          title="Save"
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 5,
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
 
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 1,
   
   
  },
  entityText: {
    fontSize: 16,
    color: "#000",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
    marginBottom:"3%"
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

export default InteriorFeature1;
