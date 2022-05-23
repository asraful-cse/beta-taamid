import React, { useState } from "react";
import "./Registration.css";
import { useDispatch, useSelector } from "react-redux";
import { ChangeInputCam } from "../RegistrationStepper/_redux/Action";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
const Registration = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputInfo = useSelector((state) => state.registrationInfo.inputInfo);
 
  const setPhoneChange = (value) => {  
    handleChangeInput("landline", value);
  };
  
  const handleChangeInput = (name, value, event) => {
    dispatch(ChangeInputCam(name, value));
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();
  const [validated, setValidated] = useState(false);
  return (
    <div className="regWrapper regWrapper_stepper">
      <div className="customLoginBox">
        <div>
          <h2 className="loginTitle">{t("Registration")}</h2>
        </div>
        <form
          className="loginForm ps-3 ps-md-0"
          onSubmit={handleSubmit(handleChangeInput)}
        >
          <div className="">
            <div>
              <label htmlFor="name" className="input_lebel">
                {t("Company Name")}
              </label>
              <br />
              <input
                type="text"
                id="name"
                name="comp_name"
                placeholder={t("Eco focus")}
                value={inputInfo.comp_name}
                className={`fadeIn loginInput ${errors.comp_name && "invalid"}`}
                {...register("comp_name", {
                  required: true,
                  minLength: 2,
                  onChange: (e) => {
                    handleChangeInput("comp_name", e.target.value);
                  },
                })}
                onKeyUp={() => {
                  trigger("comp_name");
                }}
              />
            </div>
            <div>
              <label htmlFor="address" className="input_lebel">
                {t("Address")}
              </label>{" "}
              <br />
              <input
                required
                type="text"
                id="address"
                name="address"
                placeholder={t("Riyadh,Saudi Arabia")}
                value={inputInfo.address}
                className={`fadeIn loginInput ${errors.address && "invalid"}`}
                {...register("address", {
                  required: true,
                  minLength: 2,
                  onChange: (e) => {
                    handleChangeInput("address", e.target.value);
                  },
                })}
                onKeyUp={() => {
                  trigger("address");
                }}
              />
            </div>
            <div>
              <label htmlFor="email" className="input_lebel">
                {t("Email")}
              </label>{" "}
              <br />
              <input
                type="text"
                id="email"
                className={`fadeIn loginInput ${errors.comp_email &&
                  "invalid"}`}
                name="comp_email"
                placeholder="abc@example.com"
                value={inputInfo.comp_email}
                onChange={(e) =>
                  handleChangeInput("comp_email", e.target.value)
                }
                {...register("comp_email", {
                  required: "Email is Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid company email address",
                  },
                  onChange: (e) => {
                    handleChangeInput("comp_email", e.target.value);
                  },
                })}
                onKeyUp={() => {
                  trigger("comp_email");
                }}
              />
            </div>
            <div>
              <label htmlFor="phone" className="input_lebel ">
                {t("Landline")}
              </label>{" "}
              <br />
              <div className="newDesign  ">
                <PhoneInput
                  name="phone"
                  className={`fadeIn loginInput phone   ${errors.landline &&
                    "invalid"} `}
                  placeholder="Enter phone number"
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="SA"
                  value={inputInfo.landline}
                  onChange={setPhoneChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="input_lebel">
                {t("Password")}
              </label>{" "}
              <br />
              <input
                type="password"
                id="password"
                className="fadeIn passInput pl-5"
                name="password"
                placeholder="•••••••"
                value={inputInfo.password}
                onChange={(e) => handleChangeInput("password", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="Cpassword" className="input_lebel">
                {t("Confirm Password")}
              </label>{" "}
              <br />
              <input
                type="password"
                id="Cpassword"
                className="fadeIn passInput"
                name="CPpassword"
                placeholder="•••••••"
                onChange={(e) =>
                  handleChangeInput("c_password", e.target.value)
                }
              />
            </div>
            <div className="d-flex">
              <div>
                <label htmlFor="CRNum" className="input_lebel">
                  {t("CR Number")}
                </label>{" "}
                <br />
                <input
                  type="number"
                  id="CRNum"
                  className="fadeIn dividedBox1"
                  name="cr_number"
                  placeholder="123456789"
                  value={inputInfo.cr_number}
                  onChange={(e) =>
                    handleChangeInput("cr_number", e.target.value)
                  }
                />
              </div>
              <div>
                <label htmlFor="exDate" className="input_devide2">
                  {t("CR Expiry Date")}
                </label>{" "}
                <br />
                <input
                  type="date"
                  id="exDate"
                  className="pe-3 fadeIn dividedBox1 dividedBox2"
                  name="cr_expiry_date"
                  value={inputInfo.cr_expiry_date}
                  onChange={(e) =>
                    handleChangeInput("cr_expiry_date", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="d-flex">
              <div>
                <label htmlFor="Fax" className="input_lebel">
                  {t("Fax (Optional)")}
                </label>
                <br />
                <input
                  type="number"
                  id="Fax"
                  className="fadeIn dividedBox1 "
                  name="Fax"
                  placeholder="12345678"
                />
              </div>
              <div>
                <label htmlFor="VR" className="input_devide2">
                  {t("VAT Registration Number")}
                </label>
                <br />
                <input
                  type="number"
                  id="VR"
                  className="fadeIn dividedBox1 dividedBox2"
                  name="vat_reg_num"
                  placeholder="12345678901121"
                  value={inputInfo.vat_reg_num}
                  onChange={(e) =>
                    handleChangeInput("vat_reg_num", e.target.value)
                  }
                />
              </div>
            </div>
            <div>
              <label htmlFor="text" className="input_lebel">
                {t("Company Activities")}
              </label>{" "}
              <br />
              <textarea
                type="textarea"
                id="text"
                rows="4"
                cols="50"
                className="fadeIn  textArea_2"
                name="activity"
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                value={inputInfo.activity}
                onChange={(e) => handleChangeInput("activity", e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Registration;
