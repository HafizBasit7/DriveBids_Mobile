import zod from "zod";

export const phoneNumberValidation = zod.object(
  {
    countryCode: zod.number({
      required_error: "country code is missing",
      message: "select country code",
    }),
    phoneNo: zod.number({
      required_error: "phone number is missing",
      message: "enter phone no",
    }),
  },
  { message: "invalid phone number" }
);

const locationValidation = zod.object({
    name: zod.string({message: 'Location name is not correct'}),
    coordinates: zod.array(zod.number()).length(2, 'Location is not correct')    
}, {message: 'Location is not valid or given'});

export const loginValidation = zod.object({
  email: zod
    .string({
      required_error: "Email is required",
    })
    .email("Please provide a valid email address"),
  password: zod
    .string({
      required_error: "Please set your password.",
    })
    .regex(/^.{6,}$/, "Password must have minimum 6 characters"),
});

export const signupValidation = zod.object({
  // type: zod.enum(["individual", "trader"], {required_error: 'user type is required', message: "invalid user type"}),
  name: zod.string({ required_error: "Please enter your name." }),
  location: locationValidation,
  phoneNumber: phoneNumberValidation,
  token: zod.string({message: 'Email verification is required'}),
});

export const traderSignupValidation = zod.object({
  businessAddress: zod.string({
    required_error: "Please enter your complete business address.",
  }),
});
