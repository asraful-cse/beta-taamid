import React from "react";
import "./ForgetPassWord.css";
import { useDispatch, useSelector } from "react-redux";
import { changeForget, forgetPass } from "./_redux/Action";
import { useForm } from "react-hook-form";
import emailImg from '../../../images/invitation/Email.png'
import { useTranslation } from 'react-i18next';
const ForgetPassword = () => {
    const forgetInputInfo = useSelector((state) => state.forgetInfo.forgetInputInfo);
    const message1 = useSelector((state) => state.forgetInfo.message_Forget);
    const message2 = useSelector((state) => state.forgetInfo.message_Forget_200);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
      } = useForm();


    const handleChangeInput = (name, value) => {
        dispatch(changeForget(name, value));
      };
      const onSubmit = (data) => {
        dispatch(forgetPass(data));
        reset();
      };

  return (
    <div className="forgetWrapper">
      <div className="customForgetBox">
        <div>
          <h2 className="loginTitle">{t("Forgot Password")}</h2>
        </div>

        <form  onSubmit={handleSubmit(onSubmit)}>

            <div className='col-12 px-5'>
                        <label htmlFor="email" className='invitaion_lebel'>{t("Email")}
                        </label> <br/>
                        <div style={{paddingTop:'12px',paddingBottom:'12px'}} className='invitaion_field '>
                          <img src={emailImg} alt="" />
                          <input type="email"  className={`invitaion_input fadeIn fs-6 ${errors.email && "invalid"}`} name="email" 
                              placeholder="abc@example.com"
                              value={forgetInputInfo.email}
                              {...register ("email", {
                                required:t("Email is Required"),
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: t("Invalid email address"),
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

          <input
                     
               type="submit" value={t("Send")} className="fadeIn loginButton"  />
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
