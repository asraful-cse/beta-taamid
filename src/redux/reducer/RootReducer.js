import {combineReducers} from "redux";
import forgetPassReducer from "../../Components/LoginRegistration/ForgetPassWord/_redux/Reducer";
import loginReducer from "../../Components/LoginRegistration/Login/_redux/Reducer";
import RegistrationReducer from "../../Components/LoginRegistration/RegistrationStepper/_redux/Reducer";
import BrandReducer from "../../modules/test/_redux/reducer/BrandReducer";
import userTypeReducer from "../../Components/MyPoPage/People/_redux/Reducer";
import myPoReducer from "../../Components/MyPoPage/_redux/Reducer";
import supplierReducer from "../../SupplierComponents/_redux/Reducer";
import landingPageReducer from "../../Components/LandingPage/_redux/Reducer";
import profile_picture from "../../Components/MyPoPage/RootBrand/_redux/Reducer";
import contactReducer from "../../Components/ContactPage/_redux/Reducer";


// combine all of the reducers here
const rootReducer = combineReducers ({

    brandinfo: BrandReducer,
    loginInfo: loginReducer,
    profile_picture: profile_picture,
    registrationInfo: RegistrationReducer,
    forgetInfo: forgetPassReducer,
    userRoleInfo: userTypeReducer,
    myPoInfo: myPoReducer,
    supplierInfo: supplierReducer,
    landingInfo: landingPageReducer,
    contactInfo: contactReducer

});

export default rootReducer;
  