import * as Types from "./Types";

const initialState = {
  userProfile: null,
  afterLoginData: false,
}
const loginReducer = (state = initialState, action) => {
    const newState = { ...state };
  
    switch (action.type) {
      case Types.GET_USER:
        return {
          ...state,
          userProfile: action.payload,
        };

        case Types.SET_LOGIN_FALSE:
            return {
              ...state,
              afterLoginData: action.payload,
              loginTextInput: initialState.loginTextInput,
            };
            case Types.AFTER_LOGIN_DATA:
              console.log(`action.payload`, action.payload);
              return {
                ...state,
                afterLoginData: action.payload,
              };
  
      default:
        break;
    }
  
    return newState;
  };
  export default loginReducer;