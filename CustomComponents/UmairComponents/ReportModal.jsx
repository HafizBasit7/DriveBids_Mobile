import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";

const ReportModal = ({ visible, onClose, damage }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [expanded, setExpanded] = useState(false);

  // Keep the exact same data handling
  const damageImages = [{ uri: damage.imageUrl }];

  // Function to limit words and add "See More" / "See Less"
  const maxChars = 20; // Adjust to fit approx 3 lines
  const truncatedText = expanded
    ? damage.description
    : damage.description.length > maxChars
    ? damage.description.substring(0, maxChars).trim() + "..."
    : damage.description;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <View style={styles.modalOverlay} />

          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              {/* Header with close button */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Damage Details</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                style={styles.contentScrollView}
                showsVerticalScrollIndicator={false}
              >
                {/* Damage Description Section */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Description</Text>
                  <View style={styles.descriptionBox}>
                    <TouchableOpacity
                      onPress={() => setExpanded(!expanded)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.descriptionText}>
                        {truncatedText}
                      </Text>
                      {damage.description.length > maxChars && (
                        <Text style={styles.toggleText}>
                          {expanded ? "Show less" : "Show more"}
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Photos Section */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Original Images</Text>
                  <View style={styles.imageGallery}>
                    {damageImages.map((image, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedImage(image)}
                        style={styles.imageWrapper}
                        activeOpacity={0.8}
                      >
                        <Image source={image} style={styles.damageImage} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>

      {/* Full-Screen Image Modal */}
      {selectedImage && (
        <Modal visible={true} transparent animationType="fade">
          <View style={styles.imageModalBackground}>
            <View style={styles.modalOverlay} />
            <TouchableOpacity
              style={styles.fullscreenCloseBtn}
              onPress={() => setSelectedImage(null)}
            >
              <Text style={styles.fullscreenCloseBtnText}>✕</Text>
            </TouchableOpacity>
            <Image source={selectedImage} style={styles.fullImage} />
          </View>
        </Modal>
      )}
    </Modal>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContainer: {
    width: "90%",
    maxHeight: height * 0.8,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    backgroundColor: "#2A5DB0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  contentScrollView: {
    maxHeight: height * 0.7,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2A5DB0",
    marginBottom: 12,
  },
  descriptionBox: {
    backgroundColor: "#F8F9FA",

    padding: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  descriptionText: {
    fontSize: 15,
    color: "#333333",
    lineHeight: 22,
  },
  toggleText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#2A5DB0",
  },
  imageGallery: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginTop: 8,
  },
  imageWrapper: {
    marginRight: 12,
    marginBottom: 12,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  damageImage: {
    width: width * 0.2,
    height: width * 0.2,
    resizeMode: "cover",
  },
  imageModalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: width * 0.9,
    height: width * 0.9,
    resizeMode: "contain",
    borderRadius: 10,
  },
  fullscreenCloseBtn: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  fullscreenCloseBtnText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default ReportModal;
