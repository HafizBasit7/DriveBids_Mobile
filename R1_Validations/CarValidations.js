import zod from "zod";

//Common
const inspectionReportEnum = [
  "OK",
  "Not Tested",
  "Requires Some Attention",
  "Requires Immediate Attention",
  "Not Applicable",
];

const attachmentValidation = zod.object({
  type: zod.enum(["image", "video"]),
  url: zod.string(),
});

const locationValidation = zod.object(
  {
    name: zod.string({ message: "Location name is not correct" }),
    coordinates: zod.array(zod.number()).length(2, "Location is not correct"),
  },
  { message: "Location is not valid or given" }
);

//Car pricing
export const carPricingValidation = zod.object({
  staringBidPrice: zod.number({
    required_error: "starting bid price is missing",
  }),
  reserveBidPrice: zod.number({
    required_error: "reserve bid price is missing",
  }),
  buyNowPrice: zod.number({ required_error: "buy now is missing" }),
  duration: zod.string({ required_error: "duration is missing" }),
  // traderDiscount: zod.number({required_error: 'trader discount is missing'}),
});

//Inspection
export const carInspectionReportValidation = zod.object({
  dynamicOperations: zod.object({
    breakEfficiency: zod.enum(inspectionReportEnum),
    handBrakeTest: zod.enum(inspectionReportEnum),
    staticGearSelection: zod.enum(inspectionReportEnum),
    reverseClutchSlip: zod.enum(inspectionReportEnum),
    steeringNoise: zod.enum(inspectionReportEnum),
    suspensionRideHeight: zod.enum(inspectionReportEnum),
    airconPower: zod.enum(inspectionReportEnum),
    satNavPower: zod.enum(inspectionReportEnum),
    icePower: zod.enum(inspectionReportEnum),
    centralLocking: zod.enum(inspectionReportEnum),
    convertibleSunroofElectrics: zod.enum(inspectionReportEnum),
    horn: zod.enum(inspectionReportEnum),
  }),
  essentialChecks: zod.object({
    headLight: zod.enum(inspectionReportEnum),
    sideLight: zod.enum(inspectionReportEnum),
    brakeLight: zod.enum(inspectionReportEnum),
    fogLight: zod.enum(inspectionReportEnum),
    indicators: zod.enum(inspectionReportEnum),
    electricWindows: zod.enum(inspectionReportEnum),
    electricMirrors: zod.enum(inspectionReportEnum),
    wipers: zod.enum(inspectionReportEnum),
  }),
  interiorChecks: zod.object({
    engineManagementLight: zod.enum(inspectionReportEnum),
    breakWearIndicatorLight: zod.enum(inspectionReportEnum),
    absWarningLight: zod.enum(inspectionReportEnum),
    oilWarningLight: zod.enum(inspectionReportEnum),
    airbagWarningLight: zod.enum(inspectionReportEnum),
    glowPlugLight: zod.enum(inspectionReportEnum),
  }),
});

//Car details
export const carDetailsValidation = zod.object({
  title: zod.string({ required_error: "title is missing" }),
  description: zod.string({ required_error: "description is missing" }),
  make: zod.string({ required_error: "make is missing" }),
  model: zod.number({ required_error: "model is missing" }),
  variant: zod.string({ required_error: "variant is missing" }),
  location: locationValidation,
  mileage: zod.number({ required_error: " mileage is missing" }),
  fuel: zod.enum(["Petrol", "Diesel", "HI-Octane", "Electric", "Hybrid"]),
  color: zod.string({ required_error: "color is missing" }),
  engineSize: zod.number({ required_error: "engine size is missing" }),
  transmission: zod.enum(["Manual", "CVT", "DCT", "AMT", "AGS", "EV"]),
  noOfOwners: zod.number({ required_error: "no of owners missing" }),
  horsePower: zod.number({ required_error: "horse power missing" }),
  accidentHistory: zod.string({
    required_error: "accident history is missing",
  }),
  condition: zod.enum(["Poor", "Fair", "Good", "Excellent"]), //13
});

//car images
export const exteriorImageValidation = zod
  .array(attachmentValidation, {
    required_error: "exterior images are missing",
  })
  .length(6);
export const interiorImageValidation = zod
  .array(attachmentValidation, {
    required_error: "interior images are missing",
  })
  .length(5);
export const wheelsImageValidation = zod
  .array(attachmentValidation, { required_error: "wheels images are missing" })
  .length(4);
export const tyreTreadsValidation = zod
  .array(attachmentValidation, {
    required_error: "tyre treads images are missing",
  })
  .length(4);
export const carVideoValidation = zod
  .array(attachmentValidation, {
    required_error: "car video is missing",
  })
  .max(1);

export const imagesValidation = zod.object({
  exterior: exteriorImageValidation,
  interior: interiorImageValidation,
  wheels: wheelsImageValidation,
  tyreTreads: tyreTreadsValidation,
  carVideo: carVideoValidation,
});

//Damage report
const damageReportEnum = ["Scratches", "Dents/Cracks", "Rust"];
export const carDamageReportValidation = zod
  .object({
    damageReport: zod
      .array(
        zod.object({
          imageIndex: zod.number(),
          x: zod.number(),
          y: zod.number(),
          damageType: zod.enum(damageReportEnum),
          imageUrl: zod.string(),
          description: zod.string(),
        })
      )
      .min(1, "min one item for damage report"),
  })
  .optional();

//Car features
export const carFeaturesValidation = zod
  .object({
    exterior: zod.array(zod.string()).min(1),
    interior: zod.array(zod.string()).min(1),
  })
  .optional();
