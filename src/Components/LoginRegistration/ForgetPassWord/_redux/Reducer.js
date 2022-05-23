import * as Types from "./Types";

const initialState = {
    forgetInputInfo: {
        email: "",

    },
    message_Forget: "",
    message_Forget_200: "",
    resetPasswordInfo: {
        token: '',
        password: '',
        confirm_password: ''
    },
}
const forgetPassReducer = (state = initialState, action) => {
    const newState = { ...state };
  
    switch (action.type) {
      case Types.FORGET_PASS:
        return {
          ...state,
          message_Forget: action.payload,
        };
        case Types.FORGET_PASS_200:
          return {
            ...state,
            message_Forget_200: action.payload,
          };


          case Types.CHANGE_FORGET_INPUT:
            const { name, value } = action.payload;
            const forgetInputInfo = { ...state.forgetInputInfo };
            forgetInputInfo[name] = value;
            return {
              ...state,
              forgetInputInfo: forgetInputInfo,
            };
        case Types.RESET_PASSWORD:
            const resetPass = action.payload;
            const resetPasswordInfo = { ...state.resetPasswordInfo };
            resetPasswordInfo[resetPass.name] = resetPass.value;
            return {
                ...state,
                resetPasswordInfo: resetPasswordInfo,
            };

      default:
        break;
    }
  
    return newState;
  };
  export default forgetPassReducer;