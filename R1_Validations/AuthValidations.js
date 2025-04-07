import zod from "zod";

export const phoneNumberValidation = zod.object({
    countryCode: zod.number({required_error: 'country code is missing', message: 'select country code'}),
    phoneNo: zod.number({required_error: 'phone number is missing', message: 'enter phone no'}),
}, {message: 'invalid phone number'});

export const loginValidation = zod.object({
    email: zod.string({
        required_error: 'Email is required',
    }).email('Please provide a valid email address'),
    password: zod.string({
        required_error: 'password is required'
    }).regex(/^.{6,}$/, "password must have minimum 6 characters"),
});

export const signupValidation = zod.object({
    // type: zod.enum(["individual", "trader"], {required_error: 'user type is required', message: "invalid user type"}),
    name: zod.string({required_error: 'name is missing'}),
    city: zod.string({required_error: 'city is missing'}),
    country: zod.string({required_error: 'country is missing'}),
    phoneNumber: phoneNumberValidation,

});

export const traderSignupValidation = zod.object({
    businessAddress: zod.string({required_error: "business address is required"}),
});