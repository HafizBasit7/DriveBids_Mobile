import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Animated,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { GlobalStyles } from "../../Styles/GlobalStyles";

const { height } = Dimensions.get("window");

const BottomSheetModal = ({
  visible,
  onClose,
  data,
  loading,
  value,
  onChangeValue,
  searchText,
  setSearchText,
  title = "Select Item",
}) => {
  const animation = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const filteredData = searchText
    ? data?.filter((item) =>
        item?.make_display.toLowerCase().includes(searchText.toLowerCase())
      )
    : data;

  return (
    <Modal visible={visible} transparent animationType="none">
      <TouchableWithoutFeedback onPress={onClose}>
       
        <View style={styles.modalOverlay}>
        <StatusBar
                      barStyle="dark-content"
                      backgroundColor= "rgba(0,0,0,0.3)" 
                      translucent
                    />
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: animation }] }]}>
              <SafeAreaView style={styles.bottomSheetContent}>
                <View style={styles.bottomSheetHeader}>
                  <Text style={styles.bottomSheetTitle}>{title}</Text>
                  <TouchableOpacity onPress={onClose}>
                    <Text style={styles.closeButton}>✕</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.searchContainer}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    placeholderTextColor="#999"
                    value={searchText}
                    onChangeText={setSearchText}
                    autoFocus
                  />
                </View>

                {loading ? (
                  <ActivityIndicator
                    size="large"
                    color={GlobalStyles.colors.ButtonColor}
                    style={styles.loader}
                  />
                ) : (
                  <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.make_id}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => onChangeValue(item.make_display)}>
                        <Text
                          style={[
                            styles.entityText,
                            value === item.make_display && styles.selectedText,
                          ]}
                        >
                          {item.make_display}
                        </Text>
                        <View style={styles.separator} />
                      </TouchableOpacity>
                    )}
                  />
                )}
              </SafeAreaView>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BottomSheetModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    height: height * 0.7,
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 10,
  },
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  closeButton: {
    fontSize: 20,
    color: "#555",
  },
  searchContainer: {
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    color: "#000",
  },
  entityText: {
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  selectedText: {
    fontWeight: "bold",
    color: GlobalStyles.colors.ButtonColor,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
  },
  loader: {
    marginTop: 20,
  },
});
