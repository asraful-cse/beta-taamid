import React from 'react';
import './SendInvitation.css'
import {useForm} from "react-hook-form";
import {getUserType, userType} from "../_redux/Action";
import {useDispatch, useSelector} from "react-redux";
import emailImg from '../../../../images/invitation/Email.png';
import personImg from '../../../../images/invitation/person.png';
import { useTranslation } from "react-i18next";
const SendInvitation = () => {
    const { t } = useTranslation();


    // profile information
    const profile = useSelector ((state) => state.loginInfo.userProfile);


    // user type information
    const userTypeInfo = useSelector ((state) => state.userRoleInfo.userTypeInfo);
    const dispatch = useDispatch ();

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        trigger,
    } = useForm ();

    // handleInput Functionality
    const handleChangeInput = (name, value) => {
        dispatch (getUserType (name, value));
    };


    // onSubmit Functionality
    const onSubmit = (data) => {

        dispatch (userType (data));
        reset ();
    };


    return (
        <div className="companyInfoWrapper sendInviteCard" style={{height: '524px'}}>
            <div className="customLoginBox p-4">

                <div>
                    <h2 className="invitation_heading">{t("Send Invitation")}</h2>
                </div>


                <form style={{marginTop:'30px'}} className='invitationForm' onSubmit={handleSubmit (onSubmit)}>
                    <div className='row  justify-content-center align-items-center'>

                        <div className='col-12 col-sm-6'>
                            <label htmlFor="email" className='invitaion_lebel'>{t("User’s Email")} 
                            </label> <br/>
                            <div className='invitaion_field'>
                            <img src={emailImg} alt="" />
                            <input type="email"  className={`invitaion_input fadeIn  ${errors.email &&
                            "invalid"}`} name="email" placeholder="abc@example.com"
                                   {...register ("email", {
                                       required: "Email is Required",
                                       pattern: {
                                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                           message: "Invalid email address",
                                       },
                                       onChange: (e) => {
                                           handleChangeInput ("email", e.target.value)
                                       }
                                   })}

                                   onKeyUp={() => {
                                       trigger ("email");
                                   }}
                            />
                           </div>
                        </div>
                        <div className='col-12 col-sm-6'>
                            <label htmlFor="email" className='invitaion_lebel'>{t("User’s Role")}</label> <br/>
                            <div className='invitaion_field'>
                            <img src={personImg} alt="" />
                            <select  className='invitaion_input'
                                    value={userTypeInfo.user_type}
                                    {...register ("user_type", {
                                        required: true,
                                        onChange: (e) => {
                                            handleChangeInput ("user_type", e.target.value)
                                        }
                                    })}>
                                <option value="">{t("Select Role")}</option>
                                <option value="1">{t("Super User")}</option>
                                <option value="2">{t("Requester")}</option>
                                <option value="3">{t("Supplier")}</option>
                            </select>
                            </div>


                            <div className="select-option">
                                <div className="option "></div>
                            </div>
                        </div>

                    </div>
                    <div className="hiddenUserTypes">
                        {
                            profile &&
                            <>
                                <input type="text" id="company" name="company"
                                       value={profile.user.company}
                                       {...register ("company", {
                                           required: false,
                                           onChange: (e) => {
                                               handleChangeInput ("company", e.target.value)
                                           }
                                       })} />
                                <input type="text" id="id_num" name="id_num"
                                       value={profile.user.id_num}
                                       {...register ("id_num", {
                                           required: true,
                                           onChange: (e) => {
                                               handleChangeInput ("id_num", e.target.value)
                                           }
                                       })}
                                />
                            </>
                        }
                    </div>
                    <div className='d-flex justify-content-end mt-4'>
                        <button type="submit" className='invitation_submit'>{t("Send")} </button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default SendInvitation;