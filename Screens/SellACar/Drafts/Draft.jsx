import React, { useState } from "react";
import { View, FlatList, Alert } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import DraftCard from "../../../CustomComponents/DraftCard";
import { ActivityIndicator } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import { getDrafts, loadDraft } from "../../../API_Callings/R1_API/Car";
import DialogBox from "../../../CustomComponents/DialogBox";
import { useCar } from "../../../R1_Contexts/carContext";
import { useNavigation } from "@react-navigation/native";

const Draft = () => {

  const {data, isLoading} = useQuery({
    queryKey: ["drafts"],
    queryFn: getDrafts,
  });

  const {dispatch} = useCar();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const loadAndNavigateToDraft = async (draftId) => {
    setLoading(true);
    try {
      const draft = await loadDraft(draftId);
      dispatch({type: 'SET_DRAFT', payload: draft.data.draft});
      navigation.replace('VehicleReg')
    }
    catch(e) {
      setMessage({type: 'error', message: e.message || e.msg, title: 'Error'});
    } finally {
      setLoading(false);
    } 
  };

  // const carList = [
  //   {
  //     id: "1",
  //     regNumber: "J 12345",
  //     imageUrl:
  //       "https://img.lovepik.com/free-png/20210926/lovepik-a-car-png-image_401434180_wh1200.png", // Replace with actual image URL
  //     statusList: [
  //       { label: "Car Images", completed: true },
  //       { label: "Car Features", completed: true },
  //       { label: "Car Pricing", completed: false },
  //       { label: "Damage Report", completed: false },
  //       { label: "Car Detail", completed: false },
  //       { label: "Inspection Report", completed: false },
  //     ],
  //   },
  //   {
  //     id: "2",
  //     regNumber: "J 67890",
  //     imageUrl:
  //       "https://img.lovepik.com/free-png/20210926/lovepik-a-car-png-image_401434180_wh1200.png", // Replace with actual image URL
  //     statusList: [
  //       { label: "Car Images", completed: true },
  //       { label: "Car Features", completed: true },
  //       { label: "Car Pricing", completed: false },
  //       { label: "Damage Report", completed: false },
  //       { label: "Car Detail", completed: false },
  //       { label: "Inspection Report", completed: false },
  //     ],
  //   },
  //   {
  //     id: "3",
  //     regNumber: "J 54321",
  //     imageUrl:
  //       "https://img.lovepik.com/free-png/20210926/lovepik-a-car-png-image_401434180_wh1200.png", // Replace with actual image URL
  //     statusList: [
  //       { label: "Car Images", completed: true },
  //       { label: "Car Features", completed: true },
  //       { label: "Car Pricing", completed: false },
  //       { label: "Damage Report", completed: false },
  //       { label: "Car Detail", completed: false },
  //       { label: "Inspection Report", completed: false },
  //     ],
  //   },
  // ];

  return (
    <View style={{ paddingHorizontal: 20, flex: 1, backgroundColor: "#ffff" }}>
      <DialogBox
        visible={loading ? true : message ? true : false}
        message={message?.message}
        onOkPress={() => setMessage(null)}
        type={message?.type}
        loading={loading}
        title={message?.title || ''}
      />

      <SectionHeader title="Drafts" />
      {isLoading && (
        <ActivityIndicator />
      )}
      
      {!isLoading && (
        <FlatList
          data={data.data?.drafts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <DraftCard
              item={item}
              onCompleteRegistration={() => loadAndNavigateToDraft(item._id)}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 5 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Draft;
