import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Linking 
} from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import Header from "../../../CustomComponents/Header";

const { width } = Dimensions.get("window");

export default function Terms() {
  const sections = [
    {
      title: "Account Requirements",
      icon: "👤",
      content: [
        "You must be at least 18 years old and capable of forming a legally binding agreement.",
        "Provide accurate, up-to-date information when creating your account.",
        "Keep your login credentials secure and confidential.",
        "You are solely responsible for any activity conducted under your account.",
      ],
    },
    {
      title: "Vehicle Listings",
      icon: "🚗",
      content: [
        "All information provided must be truthful, accurate, and complete.",
        "Vehicle must be legally owned by you with proper documentation.",
        "Clearly disclose any existing liens, damages, or mechanical issues.",
        "We reserve the right to remove fraudulent or misleading listings.",
      ],
    },
    {
      title: "Bidding Rules",
      icon: "💰",
      content: [
        "Bidding on vehicles is a legally binding action.",
        "Winning bidders must complete the purchase if reserve price is met.",
        "Failure to follow through may result in account suspension.",
        "Bid manipulation and shill bidding are strictly prohibited.",
      ],
    },
    {
      title: "Payment & Transfer",
      icon: "💳",
      content: [
        "Payment must be completed within the specified time frame.",
        "All taxes, title fees, and transfer costs are buyer's responsibility.",
        "We may provide secure payment channels but don't guarantee protection.",
        "Transaction completion is between buyer and seller.",
      ],
    },
    {
      title: "Platform Liability",
      icon: "⚖️",
      content: [
        "We act solely as a platform provider and marketplace facilitator.",
        "Not responsible for vehicle quality, condition, or legitimacy.",
        "Limited dispute resolution support may be provided.",
        "We are not obligated to mediate conflicts or assume liability.",
      ],
    },
    {
      title: "Prohibited Activities",
      icon: "🚫",
      content: [
        "Fraudulent activity and misrepresentation are strictly forbidden.",
        "Unauthorized automation or bot usage is prohibited.",
        "Abuse or harassment of other users will not be tolerated.",
        "Violations may result in account suspension or permanent ban.",
      ],
    },
  ];

  const SectionCard = ({ section, index }) => (
    <View style={styles.sectionCard} key={index}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionIcon}>{section.icon}</Text>
        <Text style={styles.sectionTitle}>{section.title}</Text>
      </View>

      <View style={styles.sectionContent}>
        {section.content.map((item, itemIndex) => (
          <View key={itemIndex} style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header showSearch={false} title={"Terms & Conditions"} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View
          style={{
            backgroundColor: GlobalStyles.colors.Default,
            margin: 10,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text style={styles.headerSubtitle}>
            Welcome to DriveBidz! By accessing or using our services, you agree
            to comply with these Terms of Use and our Privacy Policy. Please
            read them carefully before proceeding.
          </Text>
        </View>

        {/* Last Updated Chip */}
        <View style={styles.chipContainer}>
          <View style={styles.chip}>
            <Text style={styles.chipText}>Last Updated: May 2025</Text>
          </View>
        </View>

        {/* Terms Sections */}
        <View style={styles.sectionsContainer}>
          {sections.map((section, index) => (
            <SectionCard key={index} section={section} index={index} />
          ))}
        </View>

        {/* Important Notice */}
        <View style={styles.warningCard}>
          <View style={styles.warningHeader}>
            <Text style={styles.warningIcon}>⚠️</Text>
            <Text style={styles.warningTitle}>Important Notice</Text>
          </View>
          <Text style={styles.warningText}>
            We reserve the right to modify these terms at any time without prior
            notice. Continued use of the platform after changes implies
            acceptance of the updated terms. For questions regarding these
            terms, please contact our support team.
          </Text>
        </View>

        {/* Contact Section */}
        <View style={styles.contactSection}>
  <View style={styles.divider} />
  <Text style={styles.contactText}>
    Questions about these terms? Contact us at{' '}
    <Text
      style={styles.contactEmail}
      onPress={() => Linking.openURL('mailto:legal@drivebidz.com')}
    >
      legal@drivebidz.com
    </Text>
  </Text>
</View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    paddingBottom: 30,
  },
  headerGradient: {
    margin: 16,
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 28,
    color: "#fff",
    textAlign: "center",
    marginBottom: 12,
  },
  headerSubtitle: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "black",
    // textAlign: "left",
    textAlign: "center",
    lineHeight: 24,
    opacity: 0.95,
  },
  chipContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  chip: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chipText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#666",
  },
  sectionsContainer: {
    paddingHorizontal: 16,
  },
  sectionCard: {
    backgroundColor: "#fff",
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  sectionTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 20,
    color: GlobalStyles.colors.ButtonColor,
    flex: 1,
  },
  sectionContent: {
    paddingLeft: 40,
  },
  bulletPoint: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  bullet: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
    color: GlobalStyles.colors.ButtonColor,
    marginRight: 12,
    marginTop: 2,
    minWidth: 8,
  },
  bulletText: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
    flex: 1,
  },
  warningCard: {
    margin: 16,
    backgroundColor: "#fff3cd",
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: "#ffc107",
  },
  warningHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  warningIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  warningTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
    color: "#856404",
  },
  warningText: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    color: "#856404",
    lineHeight: 22,
  },
  contactSection: {
    margin: 16,
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    width: "100%",
    marginBottom: 16,
  },
  contactText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  contactEmail: {
    color: GlobalStyles.colors.ButtonColor,
    fontFamily: "Inter-Medium",
    textDecorationLine: "underline",
  },
  bottomSpacing: {
    height: 20,
  },
});
