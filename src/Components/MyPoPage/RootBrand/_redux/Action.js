import Axios from "axios";
import * as Types from "./Types";
import { showToast } from "../../../../utils/ToastHelper";

export const getProfilePicture = (data) => async (dispatch) => {
  const url = "https://dev.taamid.com/api/manage_profile_picture/";

  try {
    await Axios.get(url).then((res) => {
      console.log(res.data.profile_picture[0], "getProfilePicture");
      if (res) {
        dispatch({
          type: Types.get_profile_picture,
          payload: res?.data?.profile_picture[0],
        });
      } else {
        dispatch({
          payload: false,
        });
      }
    });
  } catch (error) {}
};
export const createProfilePicture = (data) => async (dispatch) => {
  const url = `https://dev.taamid.com/api/manage_profile_picture/`;
  const formData = new FormData();
  formData.append("image ", data.file);
  formData.append("company", data.company);

  try {
    await Axios.post(url, formData).then((res) => {
      if (res) {
        showToast("success", "Profile image create successfully");
        dispatch({
          type: Types.update_profile_picture,
          payload: res.data,
        });
      } else {
        dispatch({
          payload: false,
        });
      }
    });
  } catch (error) {}
};
export const updateProfilePicture = (data) => async (dispatch) => {
  const url = `https://dev.taamid.com/api/manage_profile_picture/${data.id}/`;
  const formData = new FormData();
  formData.append("image ", data.file);
  formData.append("company", data.company);

  try {
    await Axios.put(url, formData).then((res) => {
      if (res) {
        showToast("success", "Profile image update successfully");
        dispatch({
          type: Types.update_profile_picture,
          payload: res.data,
        });
      } else {
        dispatch({
          payload: false,
        });
      }
    });
  } catch (error) {}
};
export const deleteProfilePicture = (data) => async (dispatch) => {
  const url = `https://dev.taamid.com/api/manage_profile_picture/${data.id}/`;

  try {
    await Axios.delete(url).then((res) => {
      if (res) {
        showToast("error", "Profile image deleted");
        dispatch({
          type: Types.update_profile_picture,
          payload: res.data,
        });
      } else {
        dispatch({
          payload: false,
        });
      }
    });
  } catch (error) {}
};
