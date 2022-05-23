import * as Types from "./Types";

//initialization
const initialState = {
  userTypeInfo: {
    email: "",
    user_type: "",
    company: "",
    id_num: "",
   
  },
  manageProfile: {
    comp_name: "",
    address: "",
    comp_email: "",
    landline: "",
    cr_number: "",
    cr_expiry_date: "",
    vat_reg_num: "",
    activity: "",
    doc_cr_number: "",
    doc_authorization: "",
    doc_id_copy: "",
    doc_vat_reg: "",
    doc_certificate: "",
    doc_stamp: "",
    email: "",
    password: "",
    name: "",
    nationality: "",
    phone: "",
    id_num: "",
  },
};
const userTypeReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.CHANGE_USER_TYPE_INPUT:
      const { name, value } = action.payload;
      const userTypeInfo = { ...state.userTypeInfo };
      userTypeInfo[name] = value;
      return {
        ...state,
        userTypeInfo: userTypeInfo,
      };

    case Types.CHANGE_MANAGE_PROFILE_INPUT:
      const profileVal = action.payload;
      const manageProfile = { ...state.manageProfile };
      manageProfile[profileVal.name] = profileVal.value;
      return {
        ...state,
        manageProfile: manageProfile,
      };

     
    default:
      break;
  }

  return newState;
};
export default userTypeReducer;
