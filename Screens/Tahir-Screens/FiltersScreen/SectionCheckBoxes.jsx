import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox, Icon } from "react-native-elements";

const SectionCheckBoxes = ({ Type, toogleType, styles, title }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {Object.keys(Type).map((type) => (
          <CheckBox
            key={type}
            title={type}
            checked={Type[type]}
            onPress={() => toogleType(type)}
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkboxText}
            checkedIcon={
              <Icon
                name="check-box"
                type="material"
                size={24}
                color="#0066cc"
              />
            }
            uncheckedIcon={
              <Icon
                name="check-box-outline-blank"
                type="material"
                size={24}
                color="#aaaaaa"
              />
            }
          />
        ))}
      </View>
    </View>
  );
};

export default SectionCheckBoxes;
