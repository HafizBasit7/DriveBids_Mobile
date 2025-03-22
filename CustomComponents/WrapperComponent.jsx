import { SafeAreaView, StyleSheet } from "react-native";

export default function WrapperComponent({children}) {
    return (
        <SafeAreaView style={styles.safeArea}>
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f3f4f6',
    },
});