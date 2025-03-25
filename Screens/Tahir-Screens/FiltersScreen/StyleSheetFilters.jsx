import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../../Styles/GlobalStyles";

export const FilterStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff"
  },
  header: {
    fontFamily: "Inter-SemiBold",
    fontSize: 22,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  scrollContainer: {
    flex: 1,

    height: "100%",
    paddingHorizontal: 10,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    paddingBottom: 15,
  },
  sectionTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    marginBottom: 10,
  },
  rangeInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    width: "45%",
    height: 50,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 10,
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontFamily: "Inter-Regular",
  },
  searchResults: {
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 15,
    maxHeight: 150,
  },
  searchResultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  searchResultText: {
    fontFamily: "Inter-Regular",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontFamily: "Inter-Regular",
    marginRight: 5,
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
    marginBottom: 5,
    width: "45%",
  },
  checkboxText: {
    fontFamily: "Inter-Regular",
    fontWeight: "normal",
  },
  floatingButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
    position: "absolute",
    bottom: "-5%",
    left: 0,
    right: 0,
    zIndex: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom:80
  },
  button: {
    width: "48%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#dddddd",
  },
  applyButton: {
    backgroundColor: GlobalStyles.colors.ButtonColor,
  },
  clearButtonText: {
    fontFamily: "Inter-SemiBold",
    color: "#333333",
  },
  applyButtonText: {
    fontFamily: "Inter-SemiBold",
    color: "#ffffff",
  },
  bottomPadding: {
    height: 0, // Space for floating buttons
  },
});
