import React from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import SectionHeader from "../../../CustomComponents/SectionHeader";
import { GlobalStyles } from "../../../Styles/GlobalStyles";
import CustomButton from "../../../CustomComponents/CustomButton";
import Header from "../../../CustomComponents/Header";

export default function Terms() {
  return (
    <>
      <Header showSearch={false}/>
      <View style={{ backgroundColor: "#fff" }}>
  <SectionHeader title={"Terms & Conditions"} />
</View>
    
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        
        <Text style={styles.headerText}>
          Please read these terms of service, carefully before using our app
          operated by us.
        </Text>

        <Text style={styles.titleText}>Conditions of Uses</Text>

        <Text style={styles.paragraphText}>
          Neque earum quo ea est porro asperiores reprehenderit sint. Dolore
          doloremque vitae ipsum officia accusamus aspernatur rerum. Voluptas
          quas distinctio blanditiis. Consectetur dolor vero ut. Fugiat
          voluptate non et consequuntur placeat voluptas voluptatem aliquid id.
          Saepe fugit repellendus sit eos porro voluptas voluptate cupiditate
          in. Neque earum quo ea est porro asperiores reprehenderit sint.
        </Text>

        <Text style={styles.paragraphText}>
          Neque earum quo ea est porro asperiores reprehenderit sint. Dolore
          doloremque vitae ipsum officia accusamus aspernatur rerum. Voluptas
          quas distinctio blanditiis. Consectetur dolor vero ut. Fugiat
          voluptate non et consequuntur placeat voluptas voluptatem aliquid id.
          Saepe fugit repellendus sit eos porro voluptas voluptate cupiditate
          in. Neque earum quo ea est porro asperiores reprehenderit sint. Dolore
          doloremque vitae ipsum officia accusamus aspernatur rerum. Voluptas
          quas distinctio blanditiis. Consectetur dolor vero ut. Fugiat
          voluptate non et consequuntur placeat voluptas voluptatem aliquid id.
          Saepe fugit repellendus sit eos porro voluptas voluptate cupiditate
          in. Neque earum quo ea est porro asperiores reprehenderit sint. Dolore
          doloremque vitae ipsum officia accusamus aspernatur rerum. Voluptas
          quas distinctio blanditiis. Consectetur dolor vero ut. Fugiat
          voluptate non et consequuntur placeat voluptas voluptatem aliquid id.
          Saepe fugit repellendus sit eos porro voluptas voluptate cupiditate
          in. Neque earum quo ea est porro asperiores reprehenderit sint. Dolore
          doloremque vitae ipsum officia accusamus aspernatur rerum. Voluptas
          quas distinctio blanditiis. Consectetur dolor vero ut. Fugiat
          voluptate non et consequuntur placeat voluptas voluptatem aliquid id.
          Saepe fugit repellendus sit eos porro voluptas voluptate cupiditate
          in. Neque earum quo ea est porro asperiores reprehenderit sint. Dolore
          doloremque vitae ipsum officia accusamus aspernatur rerum. Voluptas
          quas distinctio blanditiis. Consectetur dolor vero ut. Fugiat
          voluptate non et consequuntur placeat voluptas voluptatem aliquid id.
          Saepe fugit repellendus sit eos porro voluptas voluptate cupiditate
          in.
        </Text>

        <View
          style={{
            width: "95%",
            marginBottom: 45,
            alignSelf: "center",
          }}
        >
          <CustomButton
            title="Agree"
            style={styles.nextButton}
            textStyle={styles.nextButtonText}
            onPress={() => console.log("Aggreed Terms Conditions")}
          />
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
    textAlign: "center",
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
