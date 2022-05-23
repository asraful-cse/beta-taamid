import * as Types from "./Types";
import Axios from "axios";
import { showToast } from "../../../../utils/ToastHelper";

export const ChangeInputCam = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.CHANGE_INPUT_CAM, payload: formData });
};
export const submitRegistration = (data) => async (dispatch) => {
  const formData = new FormData();
  formData.append("doc_cr_number", data.doc_cr_number2);
  formData.append("doc_authorization", data.doc_authorization2);
  formData.append("doc_id_copy", data.doc_id_copy2);
  formData.append("doc_vat_reg", data.doc_vat_reg2);
  formData.append("doc_certificate", data.doc_certificate2);
  formData.append("doc_stamp", data.doc_stamp2);
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

  console.log("FormData", formData);

  const url = `https://dev.taamid.com/api/create_user/`;

  try {
    await Axios.post(url, formData).then(async (res) => {
      dispatch({ type: Types.IS_LOADING, payload: true });
      if (res.data.success) {
        window.location.replace("/congratulations");
        dispatch({ type: Types.IS_LOADING, payload: false });
      } else {
        console.log("error", res.data.message);
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
