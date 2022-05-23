import React from "react";
import "./Login.css";
import { Link, } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {   submitInput } from "./_redux/Action";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import mailSign from '../../../images/Login/mailSign.png';
import lockSign from '../../../images/Login/lock.png';



const Login = () => {
  const { t } = useTranslation();
  const dispatch=useDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = () => {
  dispatch(submitInput(email,password))
    reset();
  };




  return (
    <div className="wrapper">
      {/* wrapper */}
      <div className="customLoginBox">
        <div>
          <h2 className="loginTitle">{t("Login")}</h2>
        </div>

        {/* <form className="loginForm" onSubmit={handlesubmit}> */}
        
        <form className="loginForm mx-auto"  onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* user email */}

            <div>
            <label htmlFor="email" className="input_Label text-start">
              {t("Email")}
            </label>
              <br />

          <div className={`userLoginInput d-flex align-items-center mx-auto ${errors.email && "invalid"}`}>
                {/* <i className="bi bi-grid   searchIconPN" style={{height:'32px',width:'32px'}}></i> */}
                <img className="loginIcon me-2" src={mailSign} alt="searchIcon"  />
                
                {/* ${errors.email && "invalid"}` */}
                <input className='fadeIn userLoginField' type='email'  name="email" placeholder="abc@example.com"
                // id='email'
                // onChange={e=>changeInput("email",e.target.value)}
                value={email}
                {...register("email", { required: "Email is Required" ,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                  onChange: (e) => {setEmail(e.target.value)}
                })}
                
                onKeyUp={() => {
                  trigger("email");
              }}
              />

                 
          </div>
            </div>

            {/* user password */}

          <div>
            <div className="d-flex justify-content-between">
      
              <label htmlFor="password" className="input_Label ms-0">
              {t("Password")}
                
              </label>
              <br />
              <label htmlFor="forget" className="">
                <Link className="forget_Label" to="/forgetPassword" style={{ }}> {t("Forgot Password?")} </Link>
              </label>
              
            </div>

            <div className="userLoginInput d-flex align-items-center mx-auto">
              {/* <i className="bi bi-grid   searchIconPN" style={{height:'32px',width:'32px'}}></i> */}

              <img className="loginIcon me-2" src={lockSign} alt="searchIcon" /> 

              <input  className='fadeIn userLoginField'  name="password" placeholder="••••••••" type='password'
              // id="password"
              // onChange={e=>changeInput("email",e.target.value)}
              onChange={e=>setPassword(e.target.value)}
              value={password}
              {...register("password", { required: "Password is Required",
              onChange: (e) => {setPassword(e.target.value)}
            })}
              />

              
            </div>
          </div>

          <input type="submit" className="fadeIn loginButton" value={t("Log in")} />
          </div>
        </form>

        <div className="regRooter">
          <div id="formFooter" className="d-inline-flex">
            <p className="forgotPass">{t("Don’t have an account?")}  </p>{" "}
            <Link to="/signup" className="registerText">
              {t("Register")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
