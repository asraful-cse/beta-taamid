import React from 'react';
import './ContactForm.css'
import email from '../../../images/contract/email.png';
import {useForm} from "react-hook-form";
import {ChangeContactInfo, postContactData} from "../_redux/Action";
import {useDispatch} from "react-redux";
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
    const { t } = useTranslation();


    // dispatching
    const dispatch = useDispatch ();
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        trigger,
    } = useForm ();


    const handleChangeInput = (name, value) => {
        dispatch (ChangeContactInfo (name, value));
    };

    const onSubmit = (data) => {
        dispatch (postContactData (data));
        reset ();
    };


    return (
        <div>

            <form className='formContactfield' onSubmit={handleSubmit (onSubmit)}>
                <div className="form-group">
                    <label className='contactLabelTitle' for="formGroupExampleInput">{t("Email")}</label>
                    <div className={`d-flex p-2 in inputContact ${errors.email &&
                    "invalid"}`}>
                        <img src={email} alt="email"/>
                        <input type="text" className={`inputContactField pl-2 `} placeholder="abc@example.com"

                               {...register ("email", {
                                   required: "Email is Required",
                                   pattern: {
                                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                       message:t("Invalid email address"),
                                   },
                                   onChange: (e) => {
                                       handleChangeInput ("email", e.target.value)
                                   }
                               })}

                               onKeyUp={() => {
                                   trigger ("email");
                               }}/>

                    </div>
                </div>

                <div className="form-group">
                    <label className='contactLabelTitle' for="formGroupExampleInput">{t("Subject")}</label>
                    <div className={`d-flex p-2 in inputContact ${errors.subject &&
                    "invalid"}`}>
                        <img src={email} alt=""/>
                        <input type="text" className='inputContactField pl-2' placeholder={t("Your subject")}

                               {...register ("subject", {
                                   required: t("subject is Required"),
                                   minLength: 5,

                                   onChange: (e) => {
                                       handleChangeInput ("subject", e.target.value)
                                   }
                               })}

                               onKeyUp={() => {
                                   trigger ("subject");
                               }}/>

                    </div>
                </div>

                <div className={`form-group `}>
                    <label className='contactLabelTitle' for="formGroupExampleInput">{t("Message")}</label><br/>
                    <textarea className={`inputContact inputTextArea ${errors.activities &&
                    "invalid"}`} name="" id="" style={{width: '100%'}} cols="50"
                              rows="6" placeholder={t('Type your message...')}
                              {...register ("activities", {
                                  required: "activities is Required",
                                  minLength: 5,

                                  onChange: (e) => {
                                      handleChangeInput ("email", e.target.value)
                                  }
                              })}

                              onKeyUp={() => {
                                  trigger ("activities");
                              }}> </textarea>
                </div>

                <div className='text-end'>
                    <input type="submit" className="btn contactSubmitBtn px-4" value={t("Submit")} />
                </div>
            </form>


        </div>
    );
};

export default ContactForm;