import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ReportModal from "./ReportModal";
import { useQuery } from "@tanstack/react-query";
import { getCarDamageReport } from "../../API_Callings/R1_API/Car";
import { MaterialIcons } from "@expo/vector-icons";

const carSides = [
  require("../../assets/tahirAssets/CarFront.png"),
  require("../../assets/tahirAssets/CarRight.png"),
  require("../../assets/tahirAssets/CarLeft.png"),
  require("../../assets/tahirAssets/CarBack.png"),
];

const damageOptions = [
  { label: "Scratches", icon: "gesture", color: "#2D8CFF" },
  { label: "Dents/Cracks", icon: "build", color: "#FEE226" },
  { label: "Rust", icon: "coronavirus", color: "#D35400" },
];

const descriptions = ["Front View", "Right View", "Left View", "Back View"];

const DamageReportCarousel = ({ car }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [damage, setDamage] = useState(null);
  const [noDamageModalVisible, setNoDamageModalVisible] = useState(false);
  const imagePixels = useRef();

  const { data, isLoading } = useQuery({
    queryKey: ["damageReport", car],
    queryFn: () => getCarDamageReport(car),
    enabled: isExpanded,
    refetchOnMount: false,
  });

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carSides.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + carSides.length) % carSides.length
    );
  };

  const damageReport = data?.data?.damageReport?.damageReport;

  const toggleDamage = (damage) => {
    setDamage(damage);
  };

  const handleViewClick = () => {
    // Check if there are any damage markers for the current view
    const hasDamageForCurrentView = damageReport?.some(
      (marker) => marker.imageIndex === currentIndex
    );

    if (!hasDamageForCurrentView) {
      setNoDamageModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <View style={styles.fullLine} />
        <Text style={styles.lineText}>Damage Report</Text>
        <View style={styles.fullLine} />
      </View>

      {isExpanded && (
        <View style={styles.borderedContainer}>
          <View style={styles.damageLabelContainer}>
            <Text style={styles.damageLabel}>Damage Label</Text>
          </View>

          <Text style={styles.instructionText}>
            Click the label to reveal the damage report
          </Text>

          <TouchableOpacity onPress={handleViewClick}>
            <Text style={styles.viewText}>{descriptions[currentIndex]}</Text>
          </TouchableOpacity>

          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={handlePrev}>
              <Icon name="chevron-left" size={24} color="#2A5DB0" />
            </TouchableOpacity>

            <View style={{ position: "relative" }}>
              <Image
                source={carSides[currentIndex]}
                style={styles.carImage}
                onLayout={(e) => {
                  const { width, height } = e.nativeEvent.layout;
                  imagePixels.current = { width, height };
                }}
              />
              {damageReport &&
                damageReport.map((marker, index) => {
                  if (marker.imageIndex === currentIndex) {
                    const option = damageOptions.find(
                      (val) => val.label === marker.damageType
                    );
                    return (
                      <MaterialIcons
                        onPress={() => toggleDamage(marker)}
                        key={index}
                        name={option.icon}
                        size={24}
                        color={option.color}
                        style={{
                          position: "absolute",
                          left: marker.x * imagePixels.current.width - 10,
                          top: marker.y * imagePixels.current.height - 10,
                        }}
                      />
                    );
                  }
                })}
            </View>

            <TouchableOpacity onPress={handleNext}>
              <Icon name="chevron-right" size={24} color="#2A5DB0" />
            </TouchableOpacity>
          </View>

          <View style={styles.dotsContainer}>
            {carSides.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, currentIndex === index && styles.activeDot]}
              />
            ))}
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Icon
          name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color="#2A5DB0"
          style={styles.icon}
        />
        <Text style={styles.dropdownText}>
          {isExpanded ? "Hide Report" : "View Detailed Report"}
        </Text>
      </TouchableOpacity>

      {/* No Damage Reported Modal */}
      <Modal
        visible={noDamageModalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>No Damage Reported</Text>
            <Text style={styles.modalText}>
              No damage has been reported for the{" "}
              {descriptions[currentIndex].toLowerCase()}.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setNoDamageModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {damage && (
        <ReportModal
          visible={true}
          damage={damage}
          onClose={() => setDamage(null)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  fullLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  lineText: {
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  damageLabelContainer: {
    backgroundColor: "#2A5DB0",
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  borderedContainer: {
    borderWidth: 2,
    borderColor: "#2A5DB0",
    borderStyle: "dashed",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  damageLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  instructionText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  viewText: {
    fontSize: 14,
    color: "#2A5DB0",
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  carImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  dotsContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#2A5DB0",
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  icon: {
    marginRight: 5,
  },
  dropdownText: {
    fontSize: 12,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "#2A5DB0",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2A5DB0",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#2A5DB0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default DamageReportCarousel;
