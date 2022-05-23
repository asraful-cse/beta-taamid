import React from 'react';
import './ResetPassword.css'
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import { changePassword, resetPassword} from "../ForgetPassWord/_redux/Action";
import { useLocation} from "react-router-dom";
import {showToast} from "../../../utils/ToastHelper";
import { useTranslation } from 'react-i18next';
const ResetPassword = () => {
    const { t } = useTranslation();
    const resetPasswordInfo = useSelector((state) => state.forgetInfo.resetPasswordInfo);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
    } = useForm();


    const handleChangeInput = (name, value) => {
        dispatch(changePassword(name, value));

    };


    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token');
    const id = new URLSearchParams(search).get('id');

    const onSubmit = () => {

        if(resetPasswordInfo.password=== resetPasswordInfo.confirm_password)

        {
            dispatch(resetPassword(resetPasswordInfo,id, token));
        }
        else{
            showToast('error',  t("Password does not match"))
        }

    };

    return (
        <div className="resetWrapper">
            <div className= "customResetBox">

                <div >
                    <h2 className="loginTitle">{t("Reset Password")}</h2>
                </div>

                <form className='loginForm' onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <label htmlFor="email" className='emailLabel'>{t("New Password")}</label> <br/>
                        <input type="password" id="password" className="fadeIn passInput" name="password" placeholder="•••••••"

                               onChange={(e) => handleChangeInput("password", e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="email" className='emailLabel'>{t("Confirm Password")} </label> <br/>
                        <input type="password" id="password" className="fadeIn passInput" name="confirm_password" placeholder="•••••••"

                               onChange={(e) => handleChangeInput("confirm_password", e.target.value)}/>
                    </div>

                    <input type="submit" className="fadeIn loginButton" value={t("Reset")}/>
                </form>

            </div>
        </div>
    );
};

export default ResetPassword;