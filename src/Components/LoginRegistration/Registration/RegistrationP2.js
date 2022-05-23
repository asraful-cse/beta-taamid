import React from "react";
import "./RegistrationP2.css";
import { useStepper } from "../../Steppers/Context";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { ChangeInputCam } from "../RegistrationStepper/_redux/Action";
import {useForm} from "react-hook-form";
const RegistrationP2 = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputInfo = useSelector((state) => state.registrationInfo.inputInfo);


  const handleChangeInput = (name, value) => {
    dispatch(ChangeInputCam(name, value));
  };

  const { register,handleSubmit,formState: { errors }, reset, trigger} = useForm();

  return (
    <div className="regP2Wrapper regWrapper_stepper">
      <div className="customLoginBox">
        <div>
          <h2 className="loginTitle">{t("Registration")}</h2>
        </div>

        <form className="loginForm ps-3 ps-md-0">
          <div>
          <div>
            <label htmlFor="UName" className="input_lebel">
            {t("Name")}  
            </label>{" "}
            <br />
            <input
              type="text"
              id="UName"
              className="fadeIn  loginInput"
              name="UName"
              placeholder="Sajeeb"
              value={inputInfo.name}
              onChange={(e) =>
                handleChangeInput("name", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="IDNum" className="input_lebel">
            {t("Id Number")} 
            </label>{" "}
            <br />
            <input
              type="number"
              id="IDNum"
              className="fadeIn loginInput"
              name="IDNum"
              placeholder="36364636"
              value={inputInfo.id_num}
              onChange={(e) =>
                handleChangeInput("id_num", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="Nationality" className="input_lebel">
            {t("Nationality")} 
            </label>{" "}
            <br />
            <input
              type="text"
              id="Nationality"
              className="fadeIn loginInput"
              name="Nationality"
              placeholder={t("saudi")}
              value={inputInfo.nationality}
              onChange={(e) =>
                handleChangeInput("nationality", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="phone" className="input_lebel">
            {t("Phone")} 
            </label>{" "}
            <br />
            <input
              type="number"
              id="phone"
              className="fadeIn loginInput"
              name="phone"
              placeholder="345634636"
              value={inputInfo.phone}
              onChange={(e) =>
                handleChangeInput("phone", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="Pemail" className="input_lebel">
            {t("Email")} 
            </label>{" "}
            <br />
            <input
              type="email"
              id="Pemail"
              className={`fadeIn passInput ${errors.email &&
              "invalid"}`}
              name="Pemail"
              placeholder="•••••••"
              value={inputInfo.email}
              onChange={(e) =>
                handleChangeInput("email", e.target.value)
              }


              {...register ("email", {
                required:t("Email is Required"),
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
              }}
            />
          </div>

          {/* <div className='backNextBtn'>
                        <div className='d-inline-flex'>
                            <input onClick={decrementCurrentStep} type="submit" className="fadeIn backButton" value="Back"/>
                            <input onClick={incrementCurrentStep} type="submit" className="fadeIn loginButton" value="Next"/>
                        </div>
                    </div> */}
           </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationP2;
