import { KeyboardAvoidingView, Platform,View, SafeAreaView, StyleSheet, StatusBar } from "react-native";

export default function WrapperComponent({children}) {
    return (
        <View style={styles.safeArea}>
             <StatusBar barStyle="light-content" backgroundColor="transparent"  translucent/>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "padding"}
                style={{ flex: 1 }}
            >
                {children}
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
});