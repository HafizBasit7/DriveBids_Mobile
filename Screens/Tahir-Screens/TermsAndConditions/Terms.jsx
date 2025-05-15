import React from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import CustomButton from "../../../CustomComponents/CustomButton";
import Header from "../../../CustomComponents/Header";

export default function Terms() {
  return (
    <>
      <Header showSearch={false} title={"Terms & Conditions"} />
      <View style={{ backgroundColor: "#fff" }}>
        {/* <SectionHeader title={"Terms & Conditions"} /> */}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <Text style={styles.headerText}>
          Welcome to DriveBidz! By accessing or using our services, you agree to
          comply with these Terms of Use and our Privacy Policy. Please read
          them carefully.
        </Text>

        <Text style={styles.titleText}>Terms and Conditions</Text>

        <Text style={styles.paragraphText}>
          To use this platform, you must be at least 18 years old and capable of
          forming a legally binding agreement. When creating an account, you
          agree to provide accurate, up-to-date information and to keep your
          login credentials secure. You are solely responsible for any activity
          conducted under your account.
        </Text>

        <Text style={styles.paragraphText}>
          When listing a vehicle for auction, you must ensure that all
          information provided is truthful, accurate, and complete. The vehicle
          must be legally owned by you, and any existing liens, damages, or
          issues must be clearly disclosed. We reserve the right to remove
          listings that appear fraudulent or misleading. Bidding on vehicles is
          a binding action. If you place the highest bid and meet any applicable
          reserve price, you are required to complete the purchase. Failing to
          follow through on a winning bid may result in suspension or
          termination of your account. Any form of bid manipulation, including
          shill bidding, is strictly prohibited. Buyers must complete payment
          within the specified time frame after the auction ends. All applicable
          taxes, title fees, and transfer costs are the responsibility of the
          buyer unless otherwise stated. We may provide secure payment channels,
          but we do not directly handle transactions or guarantee payment
          protection unless explicitly stated. We act solely as a platform
          provider and are not responsible for the quality, condition, or
          legitimacy of any vehicle listed. In the event of a dispute between
          buyer and seller, we may offer limited support to assist in
          resolution, but we are not obligated to mediate or assume liability.
          Any misuse of the platform, including fraudulent activity,
          unauthorized automation, or abuse of other users, may result in
          account suspension or permanent banning. We reserve the right to
          modify these terms at any time without prior notice. Continued use of
          the platform after changes implies acceptance of the updated terms.
        </Text>

        <View
          style={{
            width: "95%",
            marginBottom: 45,
            alignSelf: "center",
          }}
        >
          {/* <CustomButton
            title="Agree"
            style={styles.nextButton}
            textStyle={styles.nextButtonText}
            onPress={() => console.log("Aggreed Terms Conditions")}
          /> */}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    backgroundColor: "#fff",
  },
  headerText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    fontWeight: 600,
    textAlign: "left",
    color: GlobalStyles.colors.ButtonColor,
    marginBottom: 22,
    lineHeight: 22,
  },
  nextButton: {
    borderColor: GlobalStyles.colors.ButtonColor,
    borderWidth: 1,
    marginBottom: 20,
  },
  nextButtonText: {
    color: "white",
    fontFamily: "Inter-SemiBold",
  },
  titleText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 24,
    textAlign: "start",
    color: GlobalStyles.colors.ButtonColor,
    marginBottom: 20,
  },
  paragraphText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#666666",
    marginBottom: 16,
    lineHeight: 20,
    textAlign: "left",
  },
});
