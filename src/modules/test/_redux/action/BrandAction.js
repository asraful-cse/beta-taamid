import * as Types from "../types/Types";
import Axios from "axios";
import { showToast } from "src/utils/ToastHelper";
import moment from "moment";
import axios from "axios";

export const SubmitBrandInput = (data) => (dispatch) => {
  if (data.brandName.length === 0) {
    showToast("error", "Brand name shouldn't be empty");
    return 0;
  } else if (data.brandImg.length === 0) {
    showToast("error", "Please select a brand image");
    return 0;
  } else if (data.brandImg.size > 153600) {
    showToast("error", "Image size shouldn't be more than 150 KB");
    return 0;
  }
  const formData = new FormData();
  const url = `${process.env.REACT_APP_BAZAR}store/brand/create`;
  dispatch({ type: Types.IS_LOAD_BRAND, payload: true });
  try {
    Axios.post(url, data)
      .then((res) => {
        if (res.data.status) {
          const urlImg = `${process.env.REACT_APP_BAZAR}store/brand/${res.data.brandID}/upload`;
          formData.append("brand-image", data.brandImg);
          Axios.put(urlImg, formData)
            .then((resImg) => {
              if (resImg.data.status) {
                showToast("success", "Brand created successfully");
                dispatch({ type: Types.IS_SUCCESS_BRAND, payload: true });
                dispatch({ type: Types.IS_LOAD_BRAND, payload: false });
              } else {
                showToast("error", resImg.data.message);
                dispatch({ type: Types.IS_LOAD_BRAND, payload: false });
              }
            })
            .catch((err) => {
              dispatch({ type: Types.IS_LOAD_BRAND, payload: false });
              const message = JSON.parse(err.request.response).message;
              showToast("error", message);
            });
        } else {
          showToast("error", res.data.message);
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_LOAD_BRAND, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
  dispatch({ type: Types.IS_LOAD_BRAND, payload: true });
};

export const GetBrandInput = (name, value, e) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.GET_BRAND_INPUT, payload: formData });

  if (name === "brandImg") {
    let reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      formData.name = "imagePreviewUrl";
      formData.value = reader.result;
      dispatch({ type: Types.GET_BRAND_INPUT, payload: formData });
    };
    reader.readAsDataURL(file);
  }
};

export const GetBrandInfo = (pageNo) => (dispatch) => {
  const url = `${process.env.REACT_APP_BAZAR}store/brand/list?page=${pageNo}&size=1000`;
  dispatch({ type: Types.IS_LOAD_BRAND_LIST, payload: true });
  try {
    Axios.get(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.GET_BRAND_LIST, payload: res.data.brands });
        dispatch({ type: Types.IS_LOAD_BRAND_LIST, payload: false });
      }
    });
  } catch (error) {
    dispatch({ type: Types.IS_LOAD_BRAND_LIST, payload: false });
  }
  dispatch({ type: Types.IS_LOAD_BRAND_LIST, payload: true });
};

export const BrandDelete = (id) => (dispatch) => {
  const url = `${process.env.REACT_APP_BAZAR}store/brand/${id}/delete`;

  try {
    Axios.delete(url).then((res) => {
      if (res.data.status) {
        dispatch({ type: Types.IS_BRAND_DELETED, payload: true });
        showToast("error", res.data.message);
      }
    });
  } catch (error) {}
};
export const SetFalseBrandDelete = () => (dispatch) => {
  dispatch({ type: Types.IS_BRAND_DELETED, payload: false });
};

export const SetBrandUpdatedData = (data) => (dispatch) => {
  dispatch({ type: Types.SET_BRAND_UPDATED, payload: data });
};

export const UpdateBrand = (data) => (dispatch) => {
  console.log(`data.brandImg.length`, data.brandImg);
  if (data.brandName.length === 0) {
    showToast("error", "Brand name shouldn't be empty");
    return 0;
  } else if (
    data.brandImg.length === undefined &&
    data.brandImg.size > 153600
  ) {
    showToast("error", "Image size shouldn't be more than 150 KB");
    return 0;
  }
  const formData = new FormData();
  const url = `${process.env.REACT_APP_BAZAR}store/brand/edit`;
  dispatch({ type: Types.IS_LOAD_BRAND, payload: true });
  try {
    Axios.put(url, data)
      .then((res) => {
        console.log(`res`, res);
        if (res.data.status) {
          if (data.brandImg.length === 0) {
            dispatch({ type: Types.IS_SUCCESS_BRAND, payload: true });
            dispatch({ type: Types.IS_LOAD_BRAND, payload: false });
            showToast("success", "Updated successfully");
          } else {
            const urlImg = `${process.env.REACT_APP_BAZAR}store/brand/${data.brandID}/upload`;
            formData.append("brand-image", data.brandImg);
            Axios.put(urlImg, formData)
              .then((resImg) => {
                console.log(`resImg`, resImg);
                if (resImg.data.status) {
                  showToast("success", resImg.data.message);
                  dispatch({ type: Types.IS_SUCCESS_BRAND, payload: true });
                  dispatch({ type: Types.IS_LOAD_BRAND, payload: false });
                } else {
                  showToast("error", resImg.data.message);
                  dispatch({ type: Types.IS_LOAD_BRAND, payload: false });
                }
              })
              .catch((err) => {
                dispatch({ type: Types.IS_LOAD_BRAND, payload: false });
                const message = JSON.parse(err.request.response).message;
                showToast("error", message);
              });
          }
        } else {
          showToast("error", res.data.message);
          dispatch({ type: Types.IS_LOAD_BRAND, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: Types.IS_LOAD_BRAND, payload: false });
        const message = JSON.parse(err.request.response).message;
        showToast("error", message);
      });
  } catch (error) {
    showToast("error", "Something went wrong");
  }
  dispatch({ type: Types.IS_LOAD_BRAND, payload: true });
};
export const SetFalseBrandSuccess = () => (dispatch) => {
  dispatch({ type: Types.IS_SUCCESS_BRAND, payload: false });
};
