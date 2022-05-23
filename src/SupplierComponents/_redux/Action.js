import Axios from "axios";
import * as Types from "./Types";

// Get check stamp api
export const GetStampData = () => async (dispatch) => {
  const url = `https://dev.taamid.com/api/check_stamp`;

  dispatch({ type: Types.IS_PAGE_LOAD, payload: true });
  try {
    Axios.get(url).then((res) => {
      console.log("GET_STAMP ddtaa", res);
      if (res.status === 200) {
        dispatch({
          type: Types.GET_STAMP,
          payload: res.data.data,
        });
      } else {
      }
      dispatch({ type: Types.IS_PAGE_LOAD, payload: false });
    });
  } catch (error) {}
};

// Get fees list
// export const GetFeesList = () => async (dispatch) => {
//     const url = `https://dev.taamid.com/api/fees_list`;

//     dispatch({ type: Types.IS_PAGE_LOAD, payload: true });
//     try {
//         Axios.get(url).then((res) => {
           
//             if (res.status===200) {

//                 dispatch({
//                     type: Types.GET_FEES_LIST,
//                     payload: res.data,

//                 });
//             }
//             else {
//             }
//             dispatch({ type: Types.IS_PAGE_LOAD, payload: false });
//         });
//     } catch (error) { }
// };

// post payment
// export const postPaymentData = (data) => async (dispatch) => {
//     console.log(' payment data', data)
//     const url=`https://dev.taamid.com/api/PaymentRequestToPaytab`

//     try {
//         Axios.post(url, data).then((res) => {

//             console.log('payment res', res)
//             if (res.data) {
//                 const redirect_url = res.data.data.redirect_url
//                 dispatch({
//                     type: Types.POST_PAYMENT,
//                     payload: res.data,
//                 });
//                 window.location.href=redirect_url
//             }
//         });
//     } catch (error) {
//         console.log('error', error)
//     }
// };

// Get payment verification
export const GetPaymentVerification = () => async (dispatch) => {
  const url = `https://dev.taamid.com/api/PaymentVerification`;

  dispatch({ type: Types.IS_PAGE_LOAD, payload: true });
  try {
    Axios.get(url).then((res) => {
      console.log("verify", res);

      if (res.status === 200) {
        dispatch({
          type: Types.GET_PAYMENT_VERIFICATION,
          payload: res.data,
        });
      } else {
      }
      dispatch({ type: Types.IS_PAGE_LOAD, payload: false });
    });
  } catch (error) {}
};

// Get PO List
export const GetPOList = () => async (dispatch) => {
  const url = `https://dev.taamid.com/api/polist`;

  dispatch({ type: Types.IS_PAGE_LOAD, payload: true });
  try {
    Axios.get(url).then((res) => {
      console.log("polist", res.data);

      if (res.status === 200) {
        dispatch({
          type: Types.GET_PO_LIST,
          payload: res.data.purchase_order_list,
        });
      } else {
      }
      dispatch({ type: Types.IS_PAGE_LOAD, payload: false });
    });
  } catch (error) {}
};

// Get PO Item List
export const GetPOItemList = () => async (dispatch) => {
  const url = `https://dev.taamid.com/api/poitem/`;

  dispatch({ type: Types.IS_PAGE_LOAD, payload: true });
  try {
    Axios.get(url).then((res) => {
      console.log("GET_PO_ITEM_LIST", res.data);

      if (res.status === 200) {
        dispatch({
          type: Types.GET_PO_ITEM_LIST,
          payload: res.data.results,
        });
      } else {
      }
      dispatch({ type: Types.IS_PAGE_LOAD, payload: false });
    });
  } catch (error) {}
};

// stamp upload

export const ChangeInputUpload = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.CHANGE_INPUT_STAMP, payload: formData });
};

export const uploadStamp = (data) => async (dispatch) => {
  const formData = new FormData();

  formData.append("doc_stamp", data.doc_stamp2);

  const url = `https://dev.taamid.com/api/upload_stamp`;

  try {
    await Axios.post(url, formData).then(async (res) => {
      dispatch({ type: Types.IS_LOADING, payload: true });
      if (res.data.success) {
        dispatch({ type: Types.IS_LOADING, payload: false });
        dispatch(GetStampData());
      } else {
        console.log("error", res.data.message);
      }
    });
  } catch (error) {}
};
