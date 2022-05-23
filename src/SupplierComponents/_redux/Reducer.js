import * as Types from './Types';

const initialState = {
  stampData: null,
  isPageLoading: false,
  // feesListData: null,
  // paymentInputData: {
  //   profile_id: '',
  //   tran_type: "",
  //   tran_class: "",
  //   cart_id: '',
  //   cart_currency: "",
  //   cart_amount: '',
  //   paypage_lang: "en",
  //   hide_shipping: true,
  //   cart_description: null,
  //   customer_details: {
  //     name: '',
  //     email: '',
  //     phone: '',
  //     street1: "",
  //     city: "",
  //     state: "",
  //     country: "",
  //     zip: "",
  //     ip: "",
  //   },
  //   callback: "https://dev.taamid.com/api/PaymentResponseFromPaytab",
  //   
  // },
  paymentVerificationData: null,
  poListData: null,
  stampUpload: {
    doc_stamp2: '',
  },
  poItemData: null,
};

const supplierReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.GET_STAMP:
      return {
        ...state,
        stampData: action.payload,
      };
    case Types.CHANGE_INPUT_STAMP:
      const { name, value } = action.payload;
      const stampUpload = { ...state.stampUpload };
      stampUpload[name] = value;
      return {
        ...state,
        stampUpload: stampUpload,
      };

    // case Types.GET_FEES_LIST:
    //   return {
    //     ...state,
    //     feesListData: action.payload,
    //   };
    // case Types.POST_PAYMENT:
    //   return {
    //     ...state,
    //     paymentInputData: action.payload,
    //   };
    case Types.GET_PAYMENT_VERIFICATION:
      return {
        ...state,
        paymentVerificationData: action.payload,
      };
    case Types.GET_PO_LIST:
      return {
        ...state,
        poListData: action.payload,
      };
    case Types.GET_PO_ITEM_LIST:
      return {
        ...state,
        poItemData: action.payload,
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
export default supplierReducer;
