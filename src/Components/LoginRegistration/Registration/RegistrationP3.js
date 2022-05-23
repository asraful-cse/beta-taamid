import React, { useState } from "react";
import "./RegistrationP3.css";
import fileImg from "../../../images/registration/file.png";
import crossFile from "../../../images/fileIcons/crossFile.png";
import { useDispatch, useSelector } from "react-redux";
import { ChangeInputCam } from "../RegistrationStepper/_redux/Action";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
const RegistrationP3 = () => {
  const [checked, setChecked] = React.useState(true);
  const dispatch = useDispatch();
  const inputInfo = useSelector((state) => state.registrationInfo.inputInfo);
  const { t } = useTranslation();

  const handleChangeInput = (name, value) => {
    dispatch(ChangeInputCam(name, value));
  };

  const [documents, setDocuments] = useState("");

  function handleFile(optionName, file) {
    setDocuments((currentDocuments) => {
      const newDocuments = { ...currentDocuments };
      console.log("newDocuments", newDocuments);
      newDocuments[optionName] = file;
      console.log("file", file);
      handleChangeInput(optionName, file);
      return newDocuments;
    });
  }

  // destructuring from useForm

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  return (
    <div className="regP2Wrapper regWrapper_stepper">
      <div className="customLoginBox">
        <div>
          <h2 className="loginTitle"> {t("Registration")} </h2>
        </div>

        <form className="loginForm mx-auto">
          <div className="">
            <div className="row d-flex justify-content-center">
              <div className="col-12 col-sm-6  singleRegInputFile ">
                <p> {t("CR Number")} </p>

                <div className="singleInputFile1  inputRegBorder inputRegMargin overFlowLabel">
                  <label className="textOverflow">
                    <input
                      accept="*"
                      multiple={false}
                      type="file"
                      style={{ display: "none" }}
                      className="inputfile inputfile-1 .dividedBox1"
                      value={inputInfo.doc_cr_number}
                      name="doc_cr_number2"
                      onChange={(e) => {
                        handleFile("doc_cr_number2", e.target.files[0]);
                      }}
                    />
                    {!inputInfo.doc_cr_number2 && (
                      <img src={fileImg} alt="fileImg" />
                    )}
                    <span className="ml-2 ">
                      {inputInfo.doc_cr_number2?.name || t("Upload File")}
                    </span>
                  </label>
                  {inputInfo.doc_cr_number2 && (
                    <img
                      src={crossFile}
                      alt="'crossFile'"
                      className="crossFile1"
                      onClick={() => {
                        handleFile("doc_cr_number2", "");
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="col-12 col-sm-6 singleRegInputFile ">
                <p>{t("Authorization Doc")} </p>

                <div className="singleInputFile1  inputRegBorder inputRegMargin overFlowLabel">
                  <label className="textOverflow">
                    <input
                      accept="*"
                      multiple={false}
                      type="file"
                      style={{ display: "none" }}
                      className="inputfile inputfile-1 .dividedBox1"
                      value={inputInfo.doc_authorization}
                      onChange={(e) => {
                        handleFile("doc_authorization2", e.target.files[0]);
                      }}
                    />
                    {!inputInfo.doc_authorization2 && (
                      <img src={fileImg} alt="fileImg" />
                    )}
                    <span className="ml-2 ">
                      {inputInfo.doc_authorization2?.name || t("Upload File")}
                    </span>
                  </label>
                  {inputInfo.doc_authorization2 && (
                    <img
                      src={crossFile}
                      alt="'crossFile'"
                      className="crossFile1"
                      onClick={() => {
                        handleFile("doc_authorization2", "");
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="row d-flex justify-content-center">
              <div className="col-12 col-sm-6 singleRegInputFile ">
                <p>{t("ID Copy")} </p>

                <div className="singleInputFile1  inputRegBorder inputRegMargin overFlowLabel">
                  <label className="textOverflow">
                    <input
                      accept="*"
                      multiple={false}
                      type="file"
                      style={{ display: "none" }}
                      class="inputfile inputfile-1 .dividedBox1"
                      value={inputInfo.doc_id_copy}
                      onChange={(e) => {
                        handleFile("doc_id_copy2", e.target.files[0]);
                      }}
                    />
                    {!inputInfo.doc_id_copy2 && (
                      <img src={fileImg} alt="fileImg" />
                    )}
                    <span className="ml-2 ">
                      {inputInfo.doc_id_copy2?.name || t("Upload File")}
                    </span>
                  </label>
                  {inputInfo.doc_id_copy2 && (
                    <img
                      src={crossFile}
                      alt="'crossFile'"
                      className="crossFile1"
                      onClick={() => {
                        handleFile("doc_id_copy2", "");
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="col-12 col-sm-6 singleRegInputFile ">
                <p>{t("VAT Registration Number")} </p>

                <div className="singleInputFile1  inputRegBorder inputRegMargin overFlowLabel">
                  <label className="textOverflow">
                    <input
                      accept="*"
                      multiple={false}
                      type="file"
                      style={{ display: "none" }}
                      className="inputfile inputfile-1 .dividedBox1"
                      value={inputInfo.doc_vat_reg}
                      onChange={(e) => {
                        handleFile("doc_vat_reg2", e.target.files[0]);
                      }}
                    />
                    {!inputInfo.doc_vat_reg2 && (
                      <img src={fileImg} alt="fileImg" />
                    )}
                    <span className="ml-2 ">
                      {inputInfo.doc_vat_reg2?.name || t("Upload File")}
                    </span>
                  </label>
                  {inputInfo.doc_vat_reg2 && (
                    <img
                      src={crossFile}
                      alt="'crossFile'"
                      className="crossFile1"
                      onClick={() => {
                        handleFile("doc_vat_reg2", "");
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="row d-flex justify-content-center">
              <div className="col-12 col-sm-6 singleRegInputFile ">
                <p> {t("Certificate")}</p>

                <div className="singleInputFile1  inputRegBorder inputRegMargin overFlowLabel">
                  <label className="textOverflow">
                    <input
                      accept="*"
                      multiple={false}
                      type="file"
                      style={{ display: "none" }}
                      className="inputfile inputfile-1 .dividedBox1"
                      value={inputInfo.doc_certificate}
                      onChange={(e) => {
                        handleFile("doc_certificate2", e.target.files[0]);
                      }}
                    />
                    {!inputInfo.doc_certificate2 && (
                      <img src={fileImg} alt="fileImg" />
                    )}
                    <span className="ml-2 ">
                      {inputInfo.doc_certificate2?.name || t("Upload File")}
                    </span>
                  </label>
                  {inputInfo.doc_certificate2 && (
                    <img
                      src={crossFile}
                      alt="'crossFile'"
                      className="crossFile1"
                      onClick={() => {
                        handleFile("doc_certificate2", "");
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="col-12 col-sm-6 singleRegInputFile ">
                <p>{t("Stamp (optional)")}</p>
                <div className="singleInputFile1  inputRegBorder inputRegMargin overFlowLabel">
                  <label className="textOverflow">
                    <input
                      accept="*"
                      multiple={false}
                      type="file"
                      style={{ display: "none" }}
                      className="inputfile inputfile-1 .dividedBox1"
                      value={inputInfo.doc_stamp}
                      onChange={(e) => {
                        handleFile("doc_stamp2", e.target.files[0]);
                      }}
                    />
                    {!inputInfo.doc_stamp2 && (
                      <img src={fileImg} alt="fileImg" />
                    )}
                    <span className="ml-2 ">
                      {inputInfo.doc_stamp2?.name || t("Upload File")}
                    </span>
                  </label>
                  {inputInfo.doc_stamp2 && (
                    <img
                      src={crossFile}
                      alt="'crossFile'"
                      className="crossFile1"
                      onClick={() => {
                        handleFile("doc_stamp2", "");
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="unstyled ">
                {/* <input
                id="styled-checkbox-1"
                type="checkbox"
                value="value1"
                className={`styled-checkbox ${errors.comp_name && "invalid"}`}
                {...register("tick", {
                    required: true,
                    minLength: 2,
                    pattern: {
                        value: /^[A-Za-z]+$/i,
                        message: "Invalid Tick",
                    },

                    onChange: (e) => {
                        handleChangeInput("tick", e.target.value);
                    },
                })}
                onKeyUp={() => {
                    trigger("tick");
                }}
                required={true}
              /> */}
                <input
                  id="styled-checkbox-1"
                  className="styled-checkbox"
                  type="checkbox"
                  defaultChecked={checked}
                  onChange={() => setChecked(!checked)}
                />
                <label htmlFor="styled-checkbox-1">
                {t("I’ve agreed to the terms and conditions of Purchase Order Platform for the possibility of registration")} 
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationP3;
