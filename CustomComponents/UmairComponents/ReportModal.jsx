import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";

const ReportModal = ({ visible, onClose, damage }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [expanded, setExpanded] = useState(false);

  // const description =
  //   "There is a 6-inch scratch on the front passenger-side door, penetrating the clear coat and exposing the paint layer. While not deep enough to reach the primer, it is visible and may worsen over time.";
  const damageImages = [{ uri: damage.imageUrl }];

  // Function to limit words and add "See More" / "See Less"
  const maxChars = 120; // Adjust to fit approx 3 lines
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
              {/* Damage Description */}
              <View style={styles.header}>
                <Text style={styles.headerText}>Damage Description</Text>
              </View>

              <View style={styles.descriptionBox}>
                <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                  <Text style={styles.descriptionText}>
                    {truncatedText}
                    {!expanded && (
                      <Text style={styles.seeMoreText}> See More</Text>
                    )}
                    {expanded && (
                      <Text style={styles.seeLessText}> See Less</Text>
                    )}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Photos Section */}
              <View style={styles.header}>
                <Text style={styles.headerText}>Photos</Text>
              </View>

              {/* Damage Images */}
              <View style={styles.imageContainer}>
                {damageImages.map((image, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedImage(image)}
                  >
                    <Image source={image} style={styles.damageImage} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>

      {/* Full-Screen Image Modal */}
      {selectedImage && (
        <Modal visible={true} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setSelectedImage(null)}>
            <View style={styles.imageModalBackground}>
              <View style={styles.modalOverlay} />
              <Image source={selectedImage} style={styles.fullImage} />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Black overlay
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  header: {
    backgroundColor: "#2A5DB0",
    padding: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  descriptionBox: {
    backgroundColor: "#F2F2F2",
    padding: 12,
    borderRadius: 4,
    marginBottom: 10,
    maxWidth: "90%",
    minHeight: 50, // Ensures 3 lines minimum
  },
  descriptionText: {
    fontSize: 14,
    textAlign: "left",
    color: "#000",
    fontWeight: "400",
    lineHeight: 20, // Adjust based on font
  },

  seeMoreText: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 10,
  },
  seeLessText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 10,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  damageImage: {
    width: 130,
    height: 100,
    margin: 5,
    borderRadius: 10,
    resizeMode: "cover",
  },
  imageModalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});

export default ReportModal;
