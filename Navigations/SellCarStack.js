import { createStackNavigator } from "@react-navigation/stack";

// Car Details
import SellCar from "../Screens/SellACar/SellACarMain/SellCar";
import CarDetails1 from "../Screens/SellACar/CarDetails/CarDetails1";
import CarDetails2 from "../Screens/SellACar/CarDetails/CarDetails2";
import CarDetails3 from "../Screens/SellACar/CarDetails/CarDetails3";
import CarDetails4 from "../Screens/SellACar/CarDetails/CarDetails4";
import CarDetails5 from "../Screens/SellACar/CarDetails/CarDetails5";
import CarDetails6 from "../Screens/SellACar/CarDetails/CarDetails6";
import CarDetails7 from "../Screens/SellACar/CarDetails/CarDetails7";
import CarDetails8 from "../Screens/SellACar/CarDetails/CarDetails8";
import CarDetails9 from "../Screens/SellACar/CarDetails/CarDetails9";
import CarDetails10 from "../Screens/SellACar/CarDetails/CarDetails10";

// Exterior Features
import ExteriorFeature1 from "../Screens/SellACar/ExteriorFeatures/ExteriorFeature1";
import ExteriorFeature2 from "../Screens/SellACar/ExteriorFeatures/ExteriorFeature2";
import ExteriorFeature3 from "../Screens/SellACar/ExteriorFeatures/ExteriorFeature3";

// Exterior
import Exterior1 from "../Screens/SellACar/CarExteriorImages/Exterior1";
import Exterior2 from "../Screens/SellACar/CarExteriorImages/Exterior2";
import Exterior3 from "../Screens/SellACar/CarExteriorImages/Exterior3";
import Exterior4 from "../Screens/SellACar/CarExteriorImages/Exterior4";
import Exterior5 from "../Screens/SellACar/CarExteriorImages/Exterior5";
import Exterior6 from "../Screens/SellACar/CarExteriorImages/Exterior6";

// Interior
import Interior1 from "../Screens/SellACar/CarInteriorImages/Interior1";
import Interior2 from "../Screens/SellACar/CarInteriorImages/Interior2";
import Interior3 from "../Screens/SellACar/CarInteriorImages/Interior3";
import Interior4 from "../Screens/SellACar/CarInteriorImages/Interior4";
import Interior5 from "../Screens/SellACar/CarInteriorImages/Interior5";

// Thread
import Thread1 from "../Screens/SellACar/ThreadsImages/Thread1";
import Thread2 from "../Screens/SellACar/ThreadsImages/Thread2";
import Thread3 from "../Screens/SellACar/ThreadsImages/Thread3";
import Thread4 from "../Screens/SellACar/ThreadsImages/Thread4";

// Wheel
import Wheel1 from "../Screens/SellACar/WheelsImages/Wheel1";
import Wheel2 from "../Screens/SellACar/WheelsImages/Wheel2";
import Wheel3 from "../Screens/SellACar/WheelsImages/Wheel3";
import Wheel4 from "../Screens/SellACar/WheelsImages/Wheel4";

// Inspection Report
import InspectionReport1 from "../Screens/SellACar/InspectionReport/InspectionReport1";
import InspectionReport2 from "../Screens/SellACar/InspectionReport/InspectionReport2";
import InspectionReport3 from "../Screens/SellACar/InspectionReport/InspectionReport3";

// Price Range
import PriceRange1 from "../Screens/SellACar/PriceRange/PriceRange1";
import PriceRange2 from "../Screens/SellACar/PriceRange/PriceRange2";
import PriceRange3 from "../Screens/SellACar/PriceRange/PriceRange3";
import PriceRange4 from "../Screens/SellACar/PriceRange/PriceRange4";

import Header from "../CustomComponents/Header";

const Stack = createStackNavigator();

const SellCarStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <Header />, // ✅ Properly Closed
      }}
    >
      {/* ✅ Car Details */}
      <Stack.Screen name="SellCar" component={SellCar} />
      <Stack.Screen name="CarDetails1" component={CarDetails1} />
      <Stack.Screen name="CarDetails2" component={CarDetails2} />
      <Stack.Screen name="CarDetails3" component={CarDetails3} />
      <Stack.Screen name="CarDetails4" component={CarDetails4} />
      <Stack.Screen name="CarDetails5" component={CarDetails5} />
      <Stack.Screen name="CarDetails6" component={CarDetails6} />
      <Stack.Screen name="CarDetails7" component={CarDetails7} />
      <Stack.Screen name="CarDetails8" component={CarDetails8} />
      <Stack.Screen name="CarDetails9" component={CarDetails9} />
      <Stack.Screen name="CarDetails10" component={CarDetails10} />

      {/* ✅ Exterior Features */}
      <Stack.Screen name="ExteriorFeature1" component={ExteriorFeature1} />
      <Stack.Screen name="ExteriorFeature2" component={ExteriorFeature2} />
      <Stack.Screen name="ExteriorFeature3" component={ExteriorFeature3} />

      {/* ✅ Exterior */}
      <Stack.Screen name="Exterior1" component={Exterior1} />
      <Stack.Screen name="Exterior2" component={Exterior2} />
      <Stack.Screen name="Exterior3" component={Exterior3} />
      <Stack.Screen name="Exterior4" component={Exterior4} />
      <Stack.Screen name="Exterior5" component={Exterior5} />
      <Stack.Screen name="Exterior6" component={Exterior6} />

      {/* ✅ Interior */}
      <Stack.Screen name="Interior1" component={Interior1} />
      <Stack.Screen name="Interior2" component={Interior2} />
      <Stack.Screen name="Interior3" component={Interior3} />
      <Stack.Screen name="Interior4" component={Interior4} />
      <Stack.Screen name="Interior5" component={Interior5} />

      {/* ✅ Thread */}
      <Stack.Screen name="Thread1" component={Thread1} />
      <Stack.Screen name="Thread2" component={Thread2} />
      <Stack.Screen name="Thread3" component={Thread3} />
      <Stack.Screen name="Thread4" component={Thread4} />

      {/* ✅ Wheel */}
      <Stack.Screen name="Wheel1" component={Wheel1} />
      <Stack.Screen name="Wheel2" component={Wheel2} />
      <Stack.Screen name="Wheel3" component={Wheel3} />
      <Stack.Screen name="Wheel4" component={Wheel4} />

      {/* ✅ Inspection Report */}
      <Stack.Screen name="InspectionReport1" component={InspectionReport1} />
      <Stack.Screen name="InspectionReport2" component={InspectionReport2} />
      <Stack.Screen name="InspectionReport3" component={InspectionReport3} />

      {/* ✅ Price Range */}
      <Stack.Screen name="PriceRange1" component={PriceRange1} />
      <Stack.Screen name="PriceRange2" component={PriceRange2} />
      <Stack.Screen name="PriceRange3" component={PriceRange3} />
      <Stack.Screen name="PriceRange4" component={PriceRange4} />
    </Stack.Navigator>
  );
};

export default SellCarStack;
