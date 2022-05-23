import React, { useState } from "react";
import "./UploadStamp.css";
import closeSquare from "../../images/stamp/closeSquare.png";
import { ChangeInputUpload, uploadStamp } from "../../_redux/Action";
import { useDispatch, useSelector } from "react-redux";
import fileImg from "../../../images/registration/file.png";
import crossFile from "../../../images/fileIcons/crossFile.png";
import { useForm } from "react-hook-form";

const UploadStamp = () => {
  const stampFile = useSelector((state) => state.supplierInfo.stampUpload);


  const dispatch = useDispatch();

  const handleStampSubmit = (data) => {
    dispatch(uploadStamp(data));
  };

  const handleChangeStamp = (name, value) => {

    dispatch(ChangeInputUpload(name, value));
  };

  const [documents, setDocuments] = useState("");

  function handleFile(optionName, file) {
    setDocuments((currentDocuments) => {
      const newDocuments = { ...currentDocuments };
     
      newDocuments[optionName] = file;
     
      handleChangeStamp(optionName, file);
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
    <>
      <div className="container">
        {/*upload file modal*/}

        <div
          className="modal fade modal-wide"
          id="templateModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="templateModal"
          aria-hidden="true"
        >
          <div className="modal-dialog customModalStamp" role="document">
            <div className="modal-content stampContent modalCard">
              <div className="modalHeader stampHeader">
                <h5 className="stampTitle" id="exampleModalLabel2">
                  Upload Stamp
                </h5>
                <img
                  src={closeSquare}
                  alt="closeSquare"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <hr style={{marginBottom:'30px'}}/>
              <div className="modalBody">
                <p className="stampPara">
                  Please upload your stamp from here, <br />
                  before submitting a PO.
                </p>
              </div>
              {/*<div className='uploadStamp'>*/}
              {/*    <input type="file"/>*/}

              {/*</div>*/}
              <form className="d-flex justify-content-center">
                
                <div className="singleInputFile1  inputRegBorder inputRegMargin overFlowLabel w-75">
                  <label className="textOverflow">
                    <input
                      accept="*"
                      multiple={false}
                      type="file"
                      style={{ display: "none" }}
                      className="inputfile inputfile-1 .dividedBox1"
                      value={stampFile.doc_stamp}
                      onChange={(e) => {
                        handleFile("doc_stamp2", e.target.files[0]);
                      }}
                    />
                    {!stampFile.doc_stamp2 && (
                      <img src={fileImg} alt="fileImg" />
                    )}
                    <span className="ml-2 ">
                      {stampFile.doc_stamp2?.name || "Upload File"}
                    </span>
                  </label>
                  {stampFile.doc_stamp2 && (
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
                <div>
                  {/* <input
                            
                            type="submit" value='Upload'/> */}
                  {/* <input
              onClick={(e) => {
                   
                handleStampSubmit(stampFile,e)
                    
                   }}
              type="submit"
              className="fadeIn loginButton"
              value= "Upload"
            /> */}
               
                </div>
              </form>

                <div className="d-flex justify-content-center">
                  <button
                    onClick={(e) => {
                      handleStampSubmit(stampFile, e);
                    }}
                    className="completeBtn"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    Upload
                  </button>
                </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default UploadStamp;
