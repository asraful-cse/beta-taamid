import Axios from "axios";
import { showToast } from "../../../utils/ToastHelper";
import * as Types from "./Types";

// Get My PO list Data
export const getMyPoList = () => (dispatch) => {
  let url = `https://dev.taamid.com/api/mypo/`;

  try {
    Axios.get(url).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: Types.GET_MY_PO_LIST,
          payload: res.data.purchase_order_list,
        });
      }
    });
  } catch (error) {
    showToast("error", "something is wrong");
  }
};

// Get single po Details Data
export const GetSinglePoDetails = (id) => async (dispatch) => {
  const url = `https://dev.taamid.com/api/mypo/${id}`;

  dispatch({ type: Types.IS_PAGE_LOAD, payload: true });
  try {
    Axios.get(url).then((res) => {
      console.log("singlePo", res);
      if (res.status === 200) {
        dispatch({
          type: Types.GET_SINGLE_PO_DETAILS,
          payload: res.data,
        });
      }
      dispatch({ type: Types.IS_PAGE_LOAD, payload: false });
    });
  } catch (error) {
    showToast("error", "something is wrong");
  }
};

// Get Latest PO Data
export const GetLatestPoData = () => async (dispatch) => {
  const url = `https://dev.taamid.com/api/latestpo/`;

  dispatch({ type: Types.IS_PAGE_LOAD, payload: true });
  try {
    Axios.get(url).then((res) => {
      console.log("Latest", res);
      if (res.status === 200) {
        dispatch({
          type: Types.GET_LATEST_PO,
          payload: res.data.results,
        });
      }
      dispatch({ type: Types.IS_PAGE_LOAD, payload: false });
    });
  } catch (error) {
    showToast("error", "something is wrong");
  }
};

// Get Fav PO Data
export const GetFavPoData = () => async (dispatch) => {
  const url = `https://dev.taamid.com/api/favpo/`;

  dispatch({ type: Types.IS_PAGE_LOAD, payload: true });
  try {
    Axios.get(url).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: Types.GET_FAV_PO,
          payload: res.data.results,
        });
      }
      dispatch({ type: Types.IS_PAGE_LOAD, payload: false });
    });
  } catch (error) {
    showToast("error", "something is wrong");
  }
};

// PUT current role

export const changeCurrentRole = () => async (dispatch) => {
  const url = `https://dev.taamid.com/api/change_current_role`;

  try {
    await Axios.put(url)
      .then((res) => {
        console.log("resPut", res.data.data.current_role);
        dispatch({
          type: Types.UPDATE_CURRENT_ROLE,
          payload: res.data.data.current_role,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    showToast("error", "something is wrong");
  }
};

//delete for single po details
export const singlePoDetailsDelete = (id) => (dispatch) => {
  const url = `https://dev.taamid.com/api/mypo/${id}`;

  try {
    Axios.delete(url).then((res) => {
      console.log("DeleteRes", url, res);
      if (res.data.status) {
        dispatch({ type: Types.IS_SINGLE_PO_DETAILS_DELETED, payload: true });
        dispatch(getMyPoList());
      }
    });
  } catch (error) {
    showToast("error", "something is wrong");
  }
};

// Get Completed order Data
export const GetFilteredOrderData = (status) => async (dispatch) => {
  const url = `https://dev.taamid.com/api/order_by_status?status=${status}`;

  dispatch({ type: Types.IS_PAGE_LOAD, payload: true });
  try {
    Axios.get(url).then((res) => {    
      
      if (res.status === 200) {
        dispatch({
          type: Types.GET_FILTERED_ORDER,
          payload: res.data.data,
        });
      } else {
        showToast("error", res.data.message);
      }
      dispatch({ type: Types.IS_PAGE_LOAD, payload: false });
    });
  } catch (error) {
    showToast("error", "something is wrong");
  }
};

// GetVerification Payment
export const GetPaymentVerification = (offerId, tranId) => async (dispatch) => {

  const url = `https://dev.taamid.com/api/PaymentVerification?offer_id=${offerId}&tran_ref=${tranId}`;

  dispatch({ type: Types.IS_PAGE_LOAD, payload: true });
  try {
    Axios.get(url).then((res) => {
      console.log("payment verify", res);
      if (res.status === 200) {
        dispatch({
          type: Types.GET_PAYMENT_VERIFICATION,
          payload: res.data.data,
        });
        localStorage.removeItem('offer_id');
        localStorage.removeItem('tran_ref');
      }
      dispatch({ type: Types.IS_PAGE_LOAD, payload: false });
    });
  } catch (error) {
    showToast("error", "something is wrong");
  }
};

// Create New PO
// Get category from API
export const GetCategories = () => async (dispatch) => {
  const url = `https://dev.taamid.com/api/category/`;

  dispatch({ type: Types.IS_PAGE_LOAD, payload: true });
  try {
    Axios.get(url).then((res) => {
      console.log("category ddtaa", res);
      if (res.status === 200) {
        dispatch({
          type: Types.GET_CATEGORY_INFO,
          payload: res.data.results,
        });
      } else {
      }
      dispatch({ type: Types.IS_PAGE_LOAD, payload: false });
    });
  } catch (error) {
    showToast("error", "something is wrong");
  }
};

// post API calling
export const ChangeOfferInfo = (name, value) => (dispatch) => {
  const OfferData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.CHANGE_OFFER_INFO, payload: OfferData });
};
export const deleteOfferInfo = (OfferData) => (dispatch) => {
  dispatch({ type: Types.CHANGE_OFFER_INFO, payload: OfferData });
};


export const ChangeAttachment = (name, value) => (dispatch) => {
  const AttachmentData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.CHANGE_ATTACHMENT_DATA, payload: AttachmentData });
};

export const createNewPo = (generalInfo, AttachmentData, itemData) => async (
  dispatch
) => {
  const formData = new FormData();

  if (generalInfo && generalInfo.start_date.length === 0) {
    showToast("error", "start date is required");
    return 0;
  } else if (generalInfo && generalInfo.end_date.length === 0) {
    showToast("error", "End date is required");
    return 0;
  } else if (generalInfo && generalInfo.payment_method === null) {
    showToast("error", "Payment method is required");
    return 0;
  } else if (generalInfo && generalInfo.payment_period.length === 0) {
    showToast("error", "payment period method is required");
    return 0;
  } else if (generalInfo && generalInfo.category.length === 0) {
    showToast("error", "Main Category is required");
    return 0;
  } else if (generalInfo && generalInfo.title.length === 0) {
    showToast("error", "title is required");
    return 0;
  } else if (generalInfo && generalInfo.description.length === 0) {
    showToast("error", "description is required");
    return 0;
  } else if (generalInfo && generalInfo.delivery_place.length === 0) {
    showToast("error", "delivery place is required");
    return 0;
  } else if (AttachmentData && AttachmentData.attachment.length === 0) {
    showToast("error", "Attatchment is required");
    return 0;
  }


  const url = `https://dev.taamid.com/api/mypo/`;

  try {
    await Axios.post(url, generalInfo).then(async (res) => {
      if (res.status === 201) {
        console.log("res", res);
        AttachmentData.po = res.data.id;
        formData.append("attachment", AttachmentData.attachment);
        formData.append("po", AttachmentData.po);

        // console.log("AttachmentData222222222", formData);
        const url2 = `https://dev.taamid.com/api/poattachment/`;
        const url3 = `https://dev.taamid.com/api/poitem/`;

        Axios.post(url2, formData).then((res) => {
          console.log("resPonse Attachment", res);
        });

        itemData.map(async (item) => {
          item["po"] = res.data.id;
          Axios.post(url3, item).then((res) => {
            console.log('PO Item created')
          })

        });
        showToast("success", "Successfully PO has been created");
        dispatch({
          type: Types.GET_PO_ID,
          payload: res.data.po_no,
        });
        // window.location.replace('/manageOffer')
      } else {
        console.log("error", res.data.message);
      }
    });
  } catch (error) {
    showToast("error", "something is wrong");
  }
};

// Get po details page data
export const GetOfferDetailsPage = (id) => async (dispatch) => {
  const url = `https://dev.taamid.com/api/offer_details/${id}`;

  dispatch({ type: Types.IS_PAGE_LOAD, payload: true });
  try {
    Axios.get(url).then((res) => {
      console.log("details page ddtaa", res);
      if (res.status === 200) {
        dispatch({
          type: Types.GET_OFFER_DETAILS,
          payload: res.data.data,
        });
      } else {
      }
      dispatch({ type: Types.IS_PAGE_LOAD, payload: false });
    });
  } catch (error) {
    showToast("error", "something is wrong");
  }
};

// Get group chat data
export const GetGroupChatData = () => async (dispatch) => {
  const url = `https://dev.taamid.com/api/chat_groups`;

  dispatch({ type: Types.IS_PAGE_LOAD, payload: true });
  try {
    Axios.get(url).then((res) => {
      console.log("GET_GROUP_CHAT ddtaa", res);
      if (res.status === 200) {
        dispatch({
          type: Types.GET_GROUP_CHAT,
          payload: res.data,
        });
      } else {
      }
      dispatch({ type: Types.IS_PAGE_LOAD, payload: false });
    });
  } catch (error) {
    showToast("error", "something is wrong");
  }
};

export const ChangeGeneralInfo = (name, value) => (dispatch) => {
  const generalData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.CHANGE_GENERAL_INFO, payload: generalData });
};
