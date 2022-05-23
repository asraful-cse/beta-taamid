import Axios from "axios"
import * as Types from "./Types";
import {showToast} from "../../../../utils/ToastHelper";


export const changeForget = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
    };
    dispatch ({type: Types.CHANGE_FORGET_INPUT, payload: formData});
};


export const forgetPass = (data) => async (dispatch) => {
    const url = 'https://dev.taamid.com/api/forgot_password/'

    try {
        Axios.post (url, data).then ((res) => {
            if (res.data.success) {
                showToast('success', 'An email has been sent to your email')

                dispatch ({

                    type: Types.FORGET_PASS_200,
                    payload: res.data.message,
                });
            } else {

                dispatch ({
                    type: Types.FORGET_PASS,
                    payload: res.data.message,
                });
            }
        })
            .catch ((err) => {
                const message = JSON.parse (err.request.response).message;
                showToast ("error", message);
            })

    } catch (error) {
        showToast('error', 'Something is wrong')
    }
};

// reset password


export const changePassword = (name, value) => (dispatch) => {
    const formData = {
        name: name,
        value: value,
    };
    dispatch ({type: Types.RESET_PASSWORD, payload: formData});
};

export const resetPassword = (data, id, token) => async () => {
    console.log (' reset data', data)
    const url = `https://dev.taamid.com/api/reset_password?id=${id}&token=${token}`
    data.token = token

    try {
        Axios.post (url, data).then ((res) => {

                console.log ('reset res', res)
                if (res.data) {
                    showToast ('success', 'Password Reset Successful')
                }
            }
        ).catch ((err) => {
                const message = JSON.parse (err.request.response).message;
                showToast ("error", message);
            }
        );
    } catch (error) {
        showToast ('error', 'Something is wrong')

    }
};


