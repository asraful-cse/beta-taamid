import Axios from "axios"
import { showToast } from "../../../utils/ToastHelper";
import * as Types from "./Types";

// Get Partner list Data
export const getPartnerList = () => (dispatch) => {
    let url = `https://dev.taamid.com/api/BusinessPartnerLogo/`;

    try {
        Axios.get(url).then((res) => {
          
            if (res.status===200) {
              
                dispatch({
                    type: Types.GET_PARTNER_LIST,
                    payload: res.data.results,
                })
            }
        });
    } catch (error) {
        console.log("error");
    }
};

// Get Business Partner Data
export const getPartnersCounts = () => (dispatch) => {
    let url = `https://dev.taamid.com/api/BusinessPartnerCounts/`;

    try {
        Axios.get(url).then((res) => {
           
            if (res.status===200) {

                dispatch({
                    type: Types.GET_PARTNER_COUNTS,
                    payload: res.data.results,
                })
            }
        });
    } catch (error) {
        console.log("error");
    }
};


// Get Home Slider Data
export const getHomeSliderData = () => (dispatch) => {
    let url = `https://dev.taamid.com/api/HomepageSlider/`;

    try {
        Axios.get(url).then((res) => {
          
            if (res.status===200) {

                dispatch({
                    type: Types.GET_SLIDER_DATA,
                    payload: res.data.results,
                })
            }
        });
    } catch (error) {
        console.log("error");
    }
};


// Get Working list Data
export const getWorkingList = () => (dispatch) => {
    let url = `https://dev.taamid.com/api/cmswork/`;
    try {
        Axios.get(url).then((res) => {
            if (res.status===200) {

                dispatch({
                    type: Types.GET_WORKING_LIST,
                    payload: res.data.results,
                })
            }
        });
    } catch (error) {
        console.log("error");
    }
};
export const getBanner = () => (dispatch) => {
    let url = `https://dev.taamid.com/api/banner/`;
    try {
        Axios.get(url).then((res) => {
            if (res.status===200) {

                dispatch({
                    type: Types.GET_BANNER,
                    payload: res?.data?.results[0],
                })
            }
        });
    } catch (error) {
        console.log("error");
    }
};
