import * as Types from "./Types";

const initialState = {
  inputInfo: {
    comp_name: "",
    address: "",
    comp_email: "",
    landline: "",
    cr_number: "",
    cr_expiry_date:"",
    vat_reg_num: "",
    activity: "",
    doc_cr_number2:"",
    doc_authorization2: "",
    doc_id_copy2: "",
    doc_vat_reg2: "",
    doc_certificate2: "",
    doc_stamp2: "",
    email: "",
    password: "",
    c_password:"",
    name: "",
    nationality: "",
    phone: "",
    id_num: "",
  },
  
  isLoading: false,
  isRegAdded: false,
  isRegLoad: false,
};
const RegistrationReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case Types.CHANGE_INPUT_CAM:
      const { name, value } = action.payload;
      const inputInfo = { ...state.inputInfo };
      inputInfo[name] = value;
      return {
        ...state,
        inputInfo: inputInfo,
      };
  
    case Types.IS_PAGE_LOAD:
      return {
        ...state,
        isLoading: action.payload,
      };
 
      case Types.IS_LOADING:
        return {
          ...state,
          isLoading: action.payload,
        };

    default:
      break;
  }
  return newState;
};
export default RegistrationReducer;
