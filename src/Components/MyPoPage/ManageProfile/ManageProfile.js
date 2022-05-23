import React, { useEffect, useState } from "react";
import "./ManageProfile.css";
import CompanyInformation from "./CompanyInformation/CompanyInformation";
import AuthorizedInfo from "./AuthorizedInfo/AuthorizedInfo";
import AttachmentUpload from "./AttachmentUpload/AttachmentUpload";
import AdminApproval from "./AdminApproval/AdminApproval";
import { useForm } from "react-hook-form";
import fileImg from "../../../images/registration/file.png";
import { useDispatch, useSelector } from "react-redux";
import { manageProfile, submitProfile } from "../People/_redux/Action";
import crossFile from "../../../images/fileIcons/crossFile.png";
import call from "../../../images/myPo/Call.png";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
// import 'react-phone-input-2/lib/style.css'
import "react-phone-input-2/lib/high-res.css";
import { useTranslation } from "react-i18next";
const ManageProfile = () => {
  const managePInfo = useSelector((state) => state.userRoleInfo.manageProfile);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleChangeProfile = (name, value) => {
    console.log(name, value);
    dispatch(manageProfile(name, value));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();
  // const [documents, setDocuments] = useState("");
  // function handleFile(optionName, file) {
  //   setDocuments((currentDocuments) => {
  //     const newDocuments = { ...currentDocuments };
  //     console.log("newDocuments", newDocuments);
  //     newDocuments[optionName] = file;
  //     handleChangeProfile(optionName, file);
  //     return newDocuments;
  //   });
  // }
  const [documents, setDocuments] = useState("");

  function handleFile(optionName, file) {
    setDocuments((currentDocuments) => {
      const newDocuments = { ...currentDocuments };
      newDocuments[optionName] = file;
      handleChangeProfile(optionName, file);
      return newDocuments;
    });
  }

  const onSubmit = (e) => {
    dispatch(submitProfile(managePInfo));
    reset();
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const [phone, setPhone] = useState("");
  const setPhoneChange = (value) => {
    console.log(value);
    setPhone(value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="companyInfoWrapper">
          <div className="customLoginBox">
            <p className="companyInfo">{t("Company Information")}</p>

            <div>
              <label htmlFor="name" className=" ForPF comInfoPadding">
                {t("Company Name")}
              </label>{" "}
              <br />
              <input
                type="text"
                id="name"
                name="comp_name"
                placeholder="Eco focus"
                value={managePInfo.comp_name}
                className={`fadeIn companyInfoInput  ${errors.comp_name &&
                  "invalid"}`}
                {...register("comp_name", {
                  required: true,
                  minLength: 2,

                  onChange: (e) => {
                    handleChangeProfile("comp_name", e.target.value);
                  },
                })}
                onKeyUp={() => {
                  trigger("comp_name");
                }}
              />
            </div>
            <div>
              <label htmlFor="address" className=" comInfoPadding">
                {t("Address")}
              </label>
              <br />
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Riyadh,Saudi Arabia"
                value={managePInfo.address}
                className={`fadeIn companyInfoInput ${errors.address &&
                  "invalid"}`}
                {...register("address", {
                  required: true,
                  minLength: 2,

                  onChange: (e) => {
                    handleChangeProfile("address", e.target.value);
                  },
                })}
                onKeyUp={() => {
                  trigger("address");
                }}
              />
            </div>
            <div>
              <label htmlFor="email" className=" comInfoPadding">
                {t("Email")}
              </label>{" "}
              <br />
              <input
                type="text"
                id="email"
                name="comp_email"
                placeholder="abcd@gmail.com"
                value={managePInfo.comp_email}
                className={`fadeIn companyInfoInput ${errors.comp_email &&
                  "invalid"}`}
                {...register("comp_email", {
                  required: true,
                  // minLength: 2,
                  pattern: {
                    value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                    message: t("Invalid Name address"),
                  },
                  onChange: (e) => {
                    handleChangeProfile("comp_email", e.target.value);
                  },
                })}
                onKeyUp={() => {
                  trigger("comp_email");
                }}
              />
            </div>
            <div>
              <label htmlFor="phone" className="comInfoPadding ">
                {t("Landline")}
              </label>{" "}
              <br />
              <div>
                <PhoneInput
                  name="phone"
                  className={`fadeIn companyInfoInput phone   ${errors.landline &&
                    "invalid"} `}
                  placeholder="Enter phone number"
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="SA"
                  value={phone}
                  onChange={setPhoneChange}
                />
              </div>
            </div>
            {/* <div>
              <label htmlFor="phone" className=" comInfoPadding">
                {t("Landline")}
              </label>{" "}
              <br />
              <PhoneInput
                className={`fadeIn companyInfoInput ${errors.landline &&
                  "invalid"}`}
                placeholder="Enter phone number"
                value={phone}
                onChange={setPhoneChange}
              />
                
              </div> */}
              {/* <input
                type="number"
                id="phone"
                name="landline"
                placeholder="345634636"
                value={managePInfo.landline}
                className={`fadeIn companyInfoInput ${errors.landline &&
                  "invalid"}`}
                {...register("landline", {
                  required: true,
                  // minLength: 2,
                  onChange: (e) => {
                    handleChangeProfile("landline", e.target.value);
                  },
                })}
                onKeyUp={() => {
                  trigger("landline");
                }}
              /> */}
            

            <div className="d-flex box2ComInfo">
              <div>
                <label htmlFor="CRNum" className=" comInfoPadding">
                  {t("CR Number")}
                </label>{" "}
                <br />
                <input
                  type="number"
                  id="CRNum"
                  name="cr_number"
                  placeholder="•••••••"
                  value={managePInfo.cr_number}
                  className={`compInfoD1P1 dividedBox1 ${errors.cr_number &&
                    "invalid"}`}
                  {...register("cr_number", {
                    required: true,
                    // minLength: 2,
                    onChange: (e) => {
                      handleChangeProfile("cr_number", e.target.value);
                    },
                  })}
                  onKeyUp={() => {
                    trigger("cr_number");
                  }}
                />
              </div>
              <div>
                <label htmlFor="exDate" className="divideBox2label">
                  {t("CR Expiry Date")}
                </label>{" "}
                <br />
                <input
                  type="date"
                  id="exDate"
                  name="cr_expiry_date"
                  placeholder="•••••••"
                  value={managePInfo.cr_expiry_date}
                  className={`fadeIn compInfoD1P1 dividedBox1 compInfoD2P2 ${errors.cr_expiry_date &&
                    "invalid"}`}
                  {...register("cr_expiry_date", {
                    required: true,
                    // minLength: 2,
                    onChange: (e) => {
                      handleChangeProfile("cr_expiry_date", e.target.value);
                    },
                  })}
                  onKeyUp={() => {
                    trigger("cr_expiry_date");
                  }}
                />
              </div>
            </div>
            <div className="d-flex box2ComInfo">
              <div className="">
                <label htmlFor="Fax" className=" comInfoPadding">
                  {t("Fax (Optional)")}
                </label>{" "}
                <br />
                <input
                  type="number"
                  id="Fax"
                  className="fadeIn compInfoD1P1 dividedBox1 "
                  name="password"
                  placeholder="•••••••"
                />
              </div>
              <div className="">
                <label htmlFor="VR" className="divideBox2label">
                  {t("VAT Registration Number")}
                </label>{" "}
                <br />
                {/* <PhoneInput 
            
          inputClass='dd'
          inputExtraProps={{
            name: "phone",
            required: true,
            autoFocus: false,

            
          }}
          // outline:'none',border:0,
           inputStyle={{outline:'none',border:0}}
          className={`fadeIn companyInfoInput ${errors.landline &&
            "invalid"}`}
          defaultCountry={"sg"}
          value={phone}
          onChange={handleOnChange}
        /> */}
                <input
                  type="number"
                  id="VR"
                  name="vat_reg_num"
                  placeholder="•••••••"
                  value={managePInfo.vat_reg_num}
                  className={`fadeIn compInfoD1P1 dividedBox1 compInfoD2P2 ${errors.vat_reg_num &&
                    "invalid"}`}
                  {...register("vat_reg_num", {
                    required: true,
                    // minLength: 2,
                    onChange: (e) => {
                      handleChangeProfile("vat_reg_num", e.target.value);
                    },
                  })}
                  onKeyUp={() => {
                    trigger("vat_reg_num");
                  }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="text" className=" comInfoPadding">
                {t("Company Activities")}
              </label>{" "}
              <br />
              <textarea
                type="textarea  "
                id="text"
                rows="4"
                cols="50"
                name="activity"
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                value={managePInfo.activity}
                className={`fadeIn textArea compInfoTextBoxS ${errors.activity &&
                  "invalid"}`}
                {...register("activity", {
                  required: true,
                  minLength: 5,
                  onChange: (e) => {
                    handleChangeProfile("activity", e.target.value);
                  },
                })}
                onKeyUp={() => {
                  trigger("activity");
                }}
              />
            </div>

            {/* </form> */}
          </div>
        </div>

        {/* Person Information */}
        <div className="companyInfoWrapper pb-3">
          <div className="customLoginBox">
            <p className="companyInfo">
              {" "}
              {t("Authorized Person’s Information")}{" "}
            </p>

            {/* <form className='loginForm'> */}
            <div>
              <label
                htmlFor="name"
                className="emailLabelForAuthor comInfoPadding"
              >
                {t("Name")}
              </label>{" "}
              <br />
              {/* <input
                type="text"
                id="name"
                className="fadeIn companyInfoInput"
                width="787px"
                name="login"
                placeholder="Eco focus"
              /> */}
              <input
                type="text"
                id="UName"
                name="name"
                placeholder={t("Eco focus")}
                // value={managePInfo.name}
                className={`fadeIn companyInfoInput ${errors.name &&
                  "invalid"}`}
                {...register("name", {
                  required: true,
                  // minLength: 2,
                  onChange: (e) => {
                    handleChangeProfile("name", e.target.value);
                  },
                })}
                onKeyUp={() => {
                  trigger("name");
                }}
              />
            </div>
            <div>
              <label
                htmlFor="IDNum"
                className="emailLabelForAuthor comInfoPadding"
              >
                {t("Id Number")}{" "}
              </label>{" "}
              <br />
              <input
                type="number"
                id="IDNum"
                name="id_num"
                placeholder="2324523535"
                // value={managePInfo.id_num}
                className={`fadeIn companyInfoInput ${errors.id_num &&
                  "invalid"}`}
                {...register("id_num", {
                  required: true,
                  // minLength: 2,
                  onChange: (e) => {
                    handleChangeProfile("id_num", e.target.value);
                  },
                })}
                onKeyUp={() => {
                  trigger("id_num");
                }}
              />
            </div>
            <div>
              <label
                htmlFor="Nationality"
                className="emailLabelForAuthor comInfoPadding"
              >
                {t("Nationality")}
              </label>{" "}
              <br />
              {/* <input
                type="text"
                id="Nationality"
                className="fadeIn companyInfoInput"
                name="Nationality"
                placeholder="Saudi"
              /> */}
              <input
                type="text"
                id="Nationality"
                name="Nationality"
                placeholder={t("Saudi")}
                // value={managePInfo.Nationality}
                className={`fadeIn companyInfoInput ${errors.Nationality &&
                  "invalid"}`}
                {...register("Nationality", {
                  required: true,
                  // minLength: 2,
                  onChange: (e) => {
                    handleChangeProfile("nationality", e.target.value);
                  },
                })}
                onKeyUp={() => {
                  trigger("Nationality");
                }}
              />
            </div>

            <div>
              <label className="emailLabelForAuthor comInfoPadding">
                {t("Phone")}
              </label>{" "}
              <br />
              <input
                type="number"
                id="phone"
                name="phone"
                placeholder="3454354353"
                // value={managePInfo.Nationality}
                className={`fadeIn companyInfoInput ${errors.phone &&
                  "invalid"}`}
                {...register("phone", {
                  required: true,
                  // minLength: 2,
                  onChange: (e) => {
                    handleChangeProfile("phone", e.target.value);
                  },
                })}
                onKeyUp={() => {
                  trigger("phone");
                }}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="emailLabelForAuthor comInfoPadding"
              >
                {t("Email")}{" "}
              </label>{" "}
              <br />
              <input
                type="text"
                id="Pemail"
                name="email"
                placeholder="abcd@gmail.com"
                // value={managePInfo.address}
                className={`fadeIn companyInfoInput ${errors.email &&
                  "invalid"}`}
                {...register("email", {
                  required: true,
                  // minLength: 2,
                  pattern: {
                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Invalid Name address",
                  },
                  onChange: (e) => {
                    handleChangeProfile("email", e.target.value);
                  },
                })}
                onKeyUp={() => {
                  trigger("email");
                }}
              />
            </div>
            {/* </form> */}
          </div>
        </div>

        {/* File Upload */}

        <div className="companyInfoWrapper authorizedCard pb-5">
          <div className="customLoginBox">
            <div className="manageProfileHeader">
              <h2 className="companyInfo" style={{ marginBottom: "-33px" }}>
                {t("Attachments Upload")}
              </h2>
            </div>
            <div className="row d-flex justify-content-center mt-5 ">
              <div className="col-sm-5 singleRegInputFile ">
                <p>{t("CR Number")}</p>

                <div className="singleInputFile1  inputRegBorder inputRegMargin overFlowLabel d-flex justify-content-around">
                  <label className="textOverflow d-flex align-items-center">
                    <input
                      accept="*"
                      multiple={false}
                      type="file"
                      style={{ display: "none" }}
                      className="inputfile inputfile-1 .dividedBox1"
                      // value={managePInfo.doc_cr_number}
                      name="doc_cr_number"
                      onChange={(e) => {
                        handleFile("doc_cr_number", e.target.files[0]);
                      }}
                    />
                    {!managePInfo.doc_cr_number && (
                      <img src={fileImg} alt="fileImg" />
                    )}
                    <span className="ml-2 ">
                      {managePInfo.doc_cr_number?.name || t("Upload File")}
                    </span>
                  </label>
                  {managePInfo.doc_cr_number && (
                    <div>
                      <img
                        src={crossFile}
                        alt="'crossFile'"
                        className="crossFile1"
                        onClick={() => {
                          handleFile("doc_cr_number", "");
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="col-sm-5 singleRegInputFile ">
                <p>{t("Authorization Doc")}</p>

                <div className="singleInputFile1  inputRegBorder inputRegMargin overFlowLabel d-flex justify-content-around">
                  <label className="textOverflow d-flex align-items-center">
                    <input
                      accept="*"
                      multiple={false}
                      type="file"
                      style={{ display: "none" }}
                      className="inputfile inputfile-1 .dividedBox1"
                      // value={managePInfo.doc_authorization}
                      onChange={(e) => {
                        handleFile("doc_authorization", e.target.files[0]);
                      }}
                    />
                    {!managePInfo.doc_authorization && (
                      <img src={fileImg} alt="fileImg" />
                    )}
                    <span className="ml-2 ">
                      {managePInfo.doc_authorization?.name || t("Upload File")}
                    </span>
                  </label>
                  {managePInfo.doc_authorization && (
                    <div>
                      <img
                        src={crossFile}
                        alt="'crossFile'"
                        className="crossFile1"
                        onClick={() => {
                          handleFile("doc_authorization");
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="row d-flex justify-content-center">
              <div className="col-sm-5 singleRegInputFile ">
                <p>{t("ID Copy")} </p>

                <div className="singleInputFile1  inputRegBorder inputRegMargin overFlowLabel d-flex justify-content-around">
                  <label className="textOverflow d-flex align-items-center">
                    <input
                      accept="*"
                      multiple={false}
                      type="file"
                      style={{ display: "none" }}
                      className="inputfile inputfile-1 .dividedBox1"
                      // value={managePInfo.doc_id_copy}
                      onChange={(e) => {
                        handleFile("doc_id_copy", e.target.files[0]);
                      }}
                    />
                    {!managePInfo.doc_id_copy && (
                      <img src={fileImg} alt="fileImg" />
                    )}
                    <span className="ml-2 ">
                      {managePInfo.doc_id_copy?.name || t("Upload File")}
                    </span>
                  </label>
                  {managePInfo.doc_id_copy && (
                    <div>
                      <img
                        src={crossFile}
                        alt="'crossFile'"
                        className="crossFile1"
                        onClick={() => {
                          handleFile("doc_id_copy", "");
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="col-sm-5 singleRegInputFile ">
                <p>{t("VAT Registration Number")} </p>

                <div className="singleInputFile1  inputRegBorder inputRegMargin overFlowLabel d-flex justify-content-around">
                  <label className="textOverflow d-flex align-items-center">
                    <input
                      accept="*"
                      multiple={false}
                      type="file"
                      style={{ display: "none" }}
                      className="inputfile inputfile-1 .dividedBox1"
                      // value={managePInfo.doc_vat_reg}
                      name="doc_vat_reg"
                      onChange={(e) => {
                        handleFile("doc_vat_reg", e.target.files[0]);
                      }}
                    />
                    {!managePInfo.doc_vat_reg && (
                      <img src={fileImg} alt="fileImg" />
                    )}
                    <span className="ml-2 ">
                      {managePInfo.doc_vat_reg?.name || t("Upload File")}
                    </span>
                  </label>
                  {managePInfo.doc_vat_reg && (
                    <div>
                      <img
                        src={crossFile}
                        alt="'crossFile'"
                        className="crossFile1"
                        onClick={() => {
                          handleFile("doc_vat_reg", "");
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="row d-flex justify-content-center">
              <div className="col-sm-5 singleRegInputFile ">
                <p>{t("Certificate")}</p>

                <div className="singleInputFile1  inputRegBorder inputRegMargin overFlowLabel d-flex justify-content-around">
                  <label className="textOverflow d-flex align-items-center">
                    <input
                      accept="*"
                      multiple={false}
                      type="file"
                      style={{ display: "none" }}
                      className="inputfile inputfile-1 .dividedBox1"
                      // value={managePInfo.doc_certificate}
                      onChange={(e) => {
                        handleFile("doc_certificate", e.target.files[0]);
                      }}
                    />
                    {!managePInfo.doc_certificate && (
                      <img src={fileImg} alt="fileImg" />
                    )}
                    <span className="ml-2 ">
                      {managePInfo.doc_certificate?.name || t("Upload File")}
                    </span>
                  </label>
                  {managePInfo.doc_certificate && (
                    <div>
                      <img
                        src={crossFile}
                        alt="'crossFile'"
                        className="crossFile1"
                        onClick={() => {
                          handleFile("doc_certificate", "");
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-sm-5 singleRegInputFile ">
                <p>{t("Stamp (optional)")} </p>
                <div className="singleInputFile1  inputRegBorder inputRegMargin overFlowLabel d-flex justify-content-around">
                  <label className="textOverflow d-flex align-items-center">
                    <input
                      accept="*"
                      multiple={false}
                      type="file"
                      style={{ display: "none" }}
                      className="inputfile inputfile-1 .dividedBox1"
                      // value={managePInfo.doc_stamp}
                      onChange={(e) => {
                        handleFile("doc_stamp", e.target.files[0]);
                      }}
                    />
                    {!managePInfo.doc_stamp && (
                      <img src={fileImg} alt="fileImg" />
                    )}
                    <span className="ml-2 ">
                      {managePInfo.doc_stamp?.name || t("Upload File")}
                    </span>
                  </label>
                  {managePInfo.doc_stamp && (
                    <div>
                      <img
                        src={crossFile}
                        alt="'crossFile'"
                        className="crossFile1"
                        onClick={() => {
                          handleFile("doc_stamp", "");
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="manage_profile_btn text-end">
          <input
            type="submit"
            className="contactSubmitBtn py-2 px-5"
            value={t("Update")}
          />
        </div>
      </form>

      {/* <CompanyInformation></CompanyInformation> */}
      {/* <AuthorizedInfo></AuthorizedInfo> */}
      {/* <AttachmentUpload></AttachmentUpload>
      <AdminApproval></AdminApproval> */}
    </div>
  );
};

export default ManageProfile;
