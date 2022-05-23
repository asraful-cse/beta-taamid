import * as Types from "./Types";

const initialState = {
   contactData : null,
  postContactData : {
    email : '',
    subject : '',
    activities : ''
  }

};

const contactReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.GET_CONTACT_INFO:
      return {
        ...state,
        contactData: action.payload,
      };
    case Types.POST_CONTACT_INFO:
      const { name, value } = action.payload;
      const contactPageInfo = { ...state.postContactData };
      contactPageInfo[name] = value;
      return {
        ...state,
        postContactData: contactPageInfo,
      };


    case Types.IS_PAGE_LOAD:
      return {
        ...state,
        isPageLoading: action.payload,
      };


    default:
      break;
  }

  return newState;
};
export default contactReducer;
