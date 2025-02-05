import { baseurl } from "../BaseURL/baseurl";
import axios from "axios";

export const LoginAsUser = async (email, password) => {
  console.log(email,password)
  try {
    const response = await axios.post(`${baseurl}/auth/login/user`, {
      email,
      password,
    });
    if (response) {
      return { token: response.data.token };
    } else {
      console.log("Token not found in response");
    }
  } catch (error) {
    console.log(
      "LoginAsUser Error:",
      error.response ? error.response.data : error.message
    );
    return {
      error: error.response
        ? error.response.data
        :  error.message
    };
  }
};


// export const LoginAsProvider = async (email, password) => {
//   try {
//     const response = await axios.post(`${baseurl}/auth/login/provider`, {
//       email,
//       password,
//     });
//     if (response.data.token) {
//       return { token: response.data.token };
//     } else {
//       console.log("Token not found in response");
//     }
//   } catch (error) {
//     console.log(
//       "LoginAsProvider Error:",
//       error.response ? error.response.data : error.message
//     );
//     return {
//       error: error.response
//         ? error.response.data
//         : "An error occurred during login",
//     };
//   }
// };

export const VerifyAndSendOtp = async (email) => {
  try {
    const response = await axios.post(`${baseurl}/auth/send-otp`, { email });
    console.log("otp",response.data.otp)
    if (response.data.success) {
      return {
        success: true,
        message: response.data.message,
        otp: response.data.otp,
      };
    } else {
      return {
        success: false,
        message: "Failed to send OTP",
      };
    }
  } catch (error) {
    console.error("OTP Error:", error);
    return {
      success: false,
      message: "An error occurred while sending OTP",
    };
  }
};