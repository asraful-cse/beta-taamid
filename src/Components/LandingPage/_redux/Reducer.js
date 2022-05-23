import * as Types from "./Types";

const initialState = {
  banner:{},
  partnerSliderData: null,
  partnerCountsData: null,
  homeSliderData : null,
  workingListData : null
};



const landingPageReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.GET_PARTNER_LIST:
      return {
        ...state,
        partnerSliderData: action.payload,
      };
    case Types.GET_PARTNER_COUNTS:
      return {
        ...state,
        partnerCountsData: action.payload,
      };
    case Types.GET_SLIDER_DATA:
      return {
        ...state,
        homeSliderData: action.payload,
      };
    case Types.GET_WORKING_LIST:
      return {
        ...state,
        workingListData: action.payload,
      };


    case Types.IS_PAGE_LOAD:
      return {
        ...state,
        isPageLoading: action.payload,
      };
    case Types.GET_BANNER:
      return {
        ...state,
        banner: action.payload,
      };

    default:
      break;
  }

  return newState;
};
export default landingPageReducer;








