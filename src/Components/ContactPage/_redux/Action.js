import Axios from "axios";
import { showToast } from "../../../utils/ToastHelper";
import * as Types from "./Types";

// Get My PO list Data
export const getContact = () => (dispatch) => {
  let url = `https://dev.taamid.com/api/cmsContactInfo/`;

  try {
    Axios.get(url).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: Types.GET_CONTACT_INFO,
          payload: res.data.results,
        });
      }
    });
  } catch (error) {
    console.log("error");
  }
};

// Post Contact Info Data

export const ChangeContactInfo = (name, value) => (dispatch) => {
  const postContactData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.POST_CONTACT_INFO, payload: postContactData });

};

export const postContactData = (data) => (dispatch) => {
  let url = `https://dev.taamid.com/api/cmsContactForm/`;

  try {
    Axios.post(url, data).then((res) => {
      console.log('contact rest', res)
      if (res.status === 201) {
        console.log('posted Contact Data')
      }
    });
  } catch (error) {
    console.log("error");
  }
};