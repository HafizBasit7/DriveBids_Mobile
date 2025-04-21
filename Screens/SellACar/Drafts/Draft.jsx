import React, { useState } from "react";
import { View, FlatList, Alert } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import DraftCard from "../../../CustomComponents/DraftCard";
import { ActivityIndicator } from "react-native-paper";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getDrafts, loadDraft } from "../../../API_Callings/R1_API/Car";
import DialogBox from "../../../CustomComponents/DialogBox";
import { useCar } from "../../../R1_Contexts/carContext";
import { useNavigation } from "@react-navigation/native";
import Nodata from "../../../CustomComponents/NoData";

const LIMIT = 4;

const Draft = () => {

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["drafts"],
    queryFn: ({pageParam = 1}) => getDrafts(pageParam, LIMIT),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data?.drafts?.length === LIMIT
        ? allPages.length + 1
        : undefined;
    },
  });

  const drafts = data?.pages.flatMap((page) => page?.data?.drafts) || [];

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


  return (
    <View style={{ paddingHorizontal: 20, flex: 1, backgroundColor: "#ffff" }}>
    <DialogBox
      visible={loading || !!message}
      message={message?.message}
      onOkPress={() => setMessage(null)}
      type={message?.type}
      loading={loading}
      title={message?.title || ""}
    />
  
    <SectionHeader title="Drafts" />
  
    {isLoading ? (
      <View style={{marginVertical:"auto"}}><ActivityIndicator /></View>
    ) : data?.data?.drafts?.length === 0 ? (
      <Nodata />
    ) : (
      <FlatList
        data={drafts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <DraftCard
            item={item}
            onCompleteRegistration={() => loadAndNavigateToDraft(item._id)}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 5, gap: 10 }}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator size="small" /> : null
        }
      />
    )}
  </View>
  
  );
};

export default Draft;
