import * as Types from "./Types";

const initialState = {
  myPoListData: null,
  singlePoDetailsData: null,
  isPageLoading: false,
  latestPoData: null,
  favPoData: null,
  changeCurrentRole: 2,
  isSinglePoDetailsDeleted: "",
  filteredOrderData: null,
  invitedUserData: null,
  isInvitedUserDeleted: "",
  paymentVerificationData: null,
  generalInfo: {
    start_date: "",
    end_date: "",
    payment_method: null,
    payment_period: "",
    title: "",
    description: "",
    delivery_place: "",
    status: 1,
    category: "",
  },
  offerDetailsData: null,
  groupChatData: null,
  AttachmentData: {
    attachment: "",
    po: "",
  },

  itemData: {
    title:"",
    description:"",
    quantity: "",
    po: "",
    subcategory:""
  },
  categoryData: [],
  offerData:{
  },


};

const myPoReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.GET_MY_PO_LIST:
      return {
        ...state,
        myPoListData: action.payload,
      };
    case Types.GET_SINGLE_PO_DETAILS:
      return {
        ...state,
        singlePoDetailsData: action.payload,
      };
    case Types.GET_LATEST_PO:
      return {
        ...state,
        latestPoData: action.payload,
      };
    case Types.GET_FAV_PO:
      return {
        ...state,
        favPoData: action.payload,
      };

    case Types.GET_FILTERED_ORDER:
      return {
        ...state,
        filteredOrderData: action.payload,
      };
    case Types.GET_OFFER_DETAILS:
      return {
        ...state,
        offerDetailsData: action.payload,
      };
    case Types.GET_GROUP_CHAT:
      return {
        ...state,
        groupChatData: action.payload,
      };
    case Types.GET_INVITED_USER_LIST:
      return {
        ...state,
        invitedUserData: action.payload,
      };
    case Types.GET_PAYMENT_VERIFICATION:
      return {
        ...state,
        paymentVerificationData: action.payload,
      };
    case Types.GET_CATEGORY_INFO:
      return {
        ...state,
        categoryData: action.payload,
      };
    case Types.UPDATE_CURRENT_ROLE:
      return {
        ...state,

        changeCurrentRole: action.payload,
      };
    case Types.IS_SINGLE_PO_DETAILS_DELETED:
      return {
        ...state,
        isSinglePoDetailsDeleted: action.payload,
      };

    case Types.IS_INVITED_USER_DELETED:
      return {
        ...state,
        isInvitedUserDeleted: action.payload,
      };

    case Types.IS_PAGE_LOAD:
      return {
        ...state,
        isPageLoading: action.payload,
      };
    case Types.CHANGE_GENERAL_INFO:
      const { name, value } = action.payload;
      const generalInfo = { ...state.generalInfo };
      generalInfo[name] = value;
      return {
        ...state,
        generalInfo: generalInfo,
      };
    case Types.CHANGE_ATTACHMENT_DATA:
      const attachment = action.payload;
      let AttachmentData = { ...state.AttachmentData };
      AttachmentData[attachment.name] = attachment.value;
      return {
        ...state,
        AttachmentData: AttachmentData,
      };

      // case Types.CHANGE_ITEM_INFO:
      //   const item = action.payload;
      //   let itemData = { ...state.itemData };
      //   itemData[item.name] = item.value;
      //   return {
      //     ...state,
      //     itemData: itemData,
      //   };

         case Types.CHANGE_OFFER_INFO:
        const item2 = action.payload;
        let offerData = { ...state.offerData };
        offerData[item2.name] = item2.value;
        return {
          ...state,
          offerData: offerData,
        };


    default:
      break;
  }

  return newState;
};
export default myPoReducer;
