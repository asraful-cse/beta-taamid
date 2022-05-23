import Axios from "axios";
import {showToast} from "../../../../utils/ToastHelper";
import * as Types from "./Types";

export const submitInput = (email, password) => (dispatch) => {
        const url = "https://dev.taamid.com/api/user/login/";
        const postdata = {
            email,
            password,
        };

        // Post User Data
        try {

            Axios.post (url, postdata).then ((res) => {


                if (res.data.success) {
                    showToast ("success", "Successfully logged In");
                    // Store data's to local storage
                    localStorage.setItem ("is_logged_in", JSON.stringify (true));
                    localStorage.setItem ("access_token", res.data.data.data.access);
                    localStorage.setItem ("refresh_token", res.data.data.data.refresh);
                    localStorage.setItem ("user_type", res.data.data.user_type);


                    if (res.data.data.user_type == 3) {
                        window.location.replace ('/supplier')
                    } else {
                        window.location.replace ('/myPo')
                    }

                    dispatch ({type: Types.AFTER_LOGIN_DATA, payload: true});
                }
                else{

                    showToast ("error", ' Password does not match');
                }
            })
                .catch ((err) => {
                    const message = JSON.parse (err.request.response).message;
                    showToast ("error", message);
                })


        } catch
            (error) {


            showToast("error", "Something went wrong");
            console.log ('lasterr', error)
        }
    }
;


// Get User Data

export const getUser = () => async (dispatch) => {
    let url = `https://dev.taamid.com/api/user_profile/`;

    try {
        await Axios.get (url).then ((res) => {
            console.log ("res", res);

            if (res.data.success) {
                dispatch ({
                    type: Types.GET_USER,
                    payload: res.data.data,
                });
            }
        });
    } catch (error) {
        // showToast("error", "Something went wrong");
        // console.log("error");
    }
};

// Logout
export const SetLoginStatusFalse = () => (dispatch) => {
    dispatch ({type: Types.SET_LOGIN_FALSE, payload: false});
};
