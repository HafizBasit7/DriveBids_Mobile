import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";

/**
 * Enhanced OTP Modal Component
 *
 * @param {Object} props
 * @param {boolean} props.visible - Controls modal visibility
 * @param {Function} props.onClose - Function to close the modal
 * @param {Function} props.onSubmit - Function called when OTP is submitted
 * @param {number} props.otpLength - Length of OTP code (default: 6)
 * @param {number} props.resendDelay - Seconds until resend option is available (default: 30)
 * @param {Function} props.onResendOtp - Function to request new OTP code
 */
const OTPModal = ({
  visible,
  onClose,
  onSubmit,
  otpLength = 4,
  resendDelay = 60,
  onResendOtp,
}) => {
  // State variables
  const [otp, setOtp] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(resendDelay);
  const [canResend, setCanResend] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // OTP validation
  useEffect(() => {
    // Validate OTP (numeric and correct length)
    const isValidOtp = /^\d+$/.test(otp) && otp.length === otpLength;
    setIsValid(isValidOtp);
  }, [otp, otpLength]);

  // Timer for resend button
  useEffect(() => {
    let interval;

    if (visible && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [visible, timer]);

  // Entrance animation
  useEffect(() => {
    if (visible) {
      setOtp("");
      setIsValid(false);
      setCanResend(false);
      setTimer(resendDelay);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, scaleAnim, resendDelay]);

  // Handle OTP submission
  const handleSubmit = async () => {
    if (!isValid) return;

    setIsLoading(true);
    try {
      await onSubmit(parseInt(otp));
    } catch (error) {
      console.error("OTP submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend OTP
  const handleResend = () => {
    if (!canResend) return;

    onResendOtp && onResendOtp();
    setCanResend(false);
    setTimer(resendDelay);
  };

  return (
    <Modal
      visible={visible}
      animationType="none" // We're using our own animations
      transparent={true}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(0,0,0,0.7)"
        translucent
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
            <Animated.View
              style={[
                styles.modalContent,
                {
                  transform: [{ scale: scaleAnim }],
                  opacity: fadeAnim,
                },
              ]}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Verification Code</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={onClose}
                  hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.modalSubtitle}>
                Enter the 6-digit code sent to your email.
              </Text>

              <TextInput
                style={[styles.input, isValid && styles.inputValid]}
                placeholder={`${otpLength}-digit code`}
                placeholderTextColor="#999"
                keyboardType="number-pad"
                value={otp}
                onChangeText={setOtp}
                maxLength={otpLength}
                autoFocus={true}
                selectTextOnFocus={true}
              />

              <View style={styles.otpHelper}>
                <Text style={styles.helperText}>
                  {otp.length}/{otpLength} digits
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  !isValid && styles.submitButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={!isValid || isLoading}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.submitButtonText}>Verify</Text>
                )}
              </TouchableOpacity>

              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Didn't receive the code? </Text>
                {canResend ? (
                  <TouchableOpacity onPress={handleResend}>
                    <Text style={styles.resendActionText}>Resend</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.timerText}>Wait {timer}s</Text>
                )}
              </View>
            </Animated.View>
          </Animated.View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    // backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#888",
    fontWeight: "600",
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    textAlign: "center",
    letterSpacing: 2,
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  inputValid: {
    borderColor: "#4CAF50",
    backgroundColor: "#f0fff0",
  },
  otpHelper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: 8,
    marginBottom: 24,
  },
  helperText: {
    fontSize: 12,
    color: "#888",
  },
  submitButton: {
    backgroundColor: "#2F61BF",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    width: "100%",
    alignItems: "center",
    shadowColor: "#2F61BF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: "#a0b4d7",
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  resendText: {
    color: "#666",
    fontSize: 14,
  },
  resendActionText: {
    color: "#2F61BF",
    fontWeight: "bold",
    fontSize: 14,
  },
  timerText: {
    color: "#888",
    fontSize: 14,
  },
});

export default OTPModal;
