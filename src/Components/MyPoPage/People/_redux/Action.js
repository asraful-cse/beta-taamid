import Axios from "axios"
import * as Types from "./Types";
import {showToast} from "../../../../utils/ToastHelper";

export const getUserType = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.CHANGE_USER_TYPE_INPUT, payload: formData });
};


export const userType = (data) => async (dispatch) => {
  const url='https://dev.taamid.com/api/create_invited_user/'

  try {
  await  Axios.post(url, data).then((res) => {
      if (res.data.success) {
        dispatch({
          type: Types.CHANGE_USER_TYPE_INPUT,
          payload: res.data,

        });
        dispatch(GetInvitedUserData());
      } 
      else  {
        dispatch({
          payload: false,
        });

      }
    });
  } catch (error) {
    const message = error.response.data;
    let key = Object.keys(message)[0]
    showToast("error", message[key][0]);
    console.log('message', message)
    console.log('key', key)
  }
};



// Get Invited user list
export const GetInvitedUserData = () => async (dispatch) => {
  const url = `https://dev.taamid.com/api/invited_user_list`;

  // dispatch({ type: Types.IS_PAGE_LOAD, payload: true });
  try {
    Axios.get(url).then((res) => {
      console.log("user", res);
      if (res.status === 200) {
        dispatch({
          type: Types.GET_INVITED_USER_LIST,
          payload: res.data.data,

        })
      }
      dispatch({ type: Types.IS_PAGE_LOAD, payload: false });
    });
  } catch (error) {
    showToast('error', 'something is wrong')
  }
};


export const deleteInvitedUser = (invited_user) => (dispatch) => {

  console.log (';invited_user action',invited_user)
  const url = `https://dev.taamid.com/api/delete_invited_user/${invited_user}`;

  try {
    Axios.delete(url).then((res) => {
      if (res.data.success) {
        dispatch({ type: Types.IS_INVITED_USER_DELETED, payload: true });
        dispatch(GetInvitedUserData());

      }
    });
  } catch (error) {
    showToast('error', 'something is wrong')
  }
};


// Manage Profile

export const manageProfile = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.CHANGE_MANAGE_PROFILE_INPUT, payload: formData });
};


export const submitProfile = (data) => async (dispatch) => {
  const formData = new FormData();
  formData.append("doc_cr_number", data.doc_cr_number);
  formData.append("doc_authorization", data.doc_authorization);
  formData.append("doc_id_copy", data.doc_id_copy);
  formData.append("doc_vat_reg", data.doc_vat_reg);
  formData.append("doc_certificate", data.doc_certificate);
  formData.append("doc_stamp", data.doc_stamp);
  formData.append("comp_name", data.comp_name);
  formData.append("address", data.address);
  formData.append("comp_email", data.comp_email);
  formData.append("landline", data.landline);
  formData.append("cr_number", data.cr_number);
  formData.append("cr_expiry_date", data.cr_expiry_date);
  formData.append("vat_reg_num", data.vat_reg_num);
  formData.append("activity", data.activity);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("name", data.name);
  formData.append("nationality", data.nationality);
  formData.append("phone", data.phone);
  formData.append("id_num", data.id_num);

  console.log("FormData=============>", formData);

  const url = `https://dev.taamid.com/api/manage_profile/`;

  try {
    await Axios.post(url, formData).then(async (res) => {
      // dispatch({ type: Types.IS_LOADING, payload: true });
      if (res.data.success) {
        // dispatch({ type: Types.IS_LOADING, payload: false });
        // window.location.href = "/login";

      } else {
        console.log("error", res.data.message);
      }
    });
  } catch (error) {}
};

