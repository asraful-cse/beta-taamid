import React, { useEffect } from "react";
import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import PropTypes from 'prop-types';
// import { styled } from '@mui/material/styles';
// import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Typography from "@mui/material/Typography";
import "./RegistrationWrapper.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Registration from "../Registration/Registration";
import RegistrationP2 from "../Registration/RegistrationP2";
import RegistrationP3 from "../Registration/RegistrationP3";
import { submitRegistration } from "./_redux/Action";
import RegStepper from "./RegStepper";
import { showToast } from "../../../utils/ToastHelper";
import { useTranslation } from "react-i18next";
// const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
//   [`&.${stepConnectorClasses.alternativeLabel}`]: {
//     top: 22,
//   },
//   [`&.${stepConnectorClasses.active}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//         backgroundColor:'#2B3990',
//     },
//   },
//   [`&.${stepConnectorClasses.completed}`]: {
//     [`& .${stepConnectorClasses.line}`]: {

//       backgroundColor:'#2B3990',

//     },
//   },
//   [`& .${stepConnectorClasses.line}`]: {
//     height: 6,
//     border: 0,
//     backgroundColor:
//       theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
//     borderRadius: 1,
//   },
// }));

// const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
//   backgroundColor: 'white',
//   zIndex: 1,
//   color: '#777E90', //   text color
//   width: 50,
//   fontSize:'24px',
//   fontWeight:600,
//   height: 50,
//   display: 'flex',
//   borderRadius: '50%',
//   justifyContent: 'center',
//   alignItems: 'center',
//   border:'3px solid #777E90',
//   ...(ownerState.active && {
//     border:'none',
//     backgroundColor:'#2B3990',
//     color:'white',
//     boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
//   }),
//   ...(ownerState.completed && {
//     border:'none',
//     color:'white',
//     backgroundColor:'#2B3990',
//   }),
// }));

// function ColorlibStepIcon(props) {
//   const { active, completed, className } = props;

//   const icons = {
//     1: '1',
//     2: '2',
//     3: '3',
//   };

//   return (
//     <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
//       {icons[String(props.icon)]}
//     </ColorlibStepIconRoot>
//   );
// }

// ColorlibStepIcon.propTypes = {
//   /**
//    * Whether this step is active.
//    * @default false
//    */
//   active: PropTypes.bool,
//   className: PropTypes.string,
//   /**
//    * Mark the step as completed. Is passed to child components.
//    * @default false
//    */
//   completed: PropTypes.bool,
//   /**
//    * The label displayed in the step icon.
//    */
//   icon: PropTypes.node,
// };

const steps = [
  "General Information",
  "Authorized Person’s Information",
  "Attachments Upload",
];

const RegistrationWrapper = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputInfo = useSelector((state) => state.registrationInfo.inputInfo);
  const isRegAdded = useSelector((state) => state.registrationInfo.isRegAdded);
  const isRegLoad = useSelector((state) => state.registrationInfo.isRegLoad);

  // necessary states
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  //handle next button
  const handleNext = (data) => {
    if (data.comp_name.length === 0) {
      showToast("error", "Comapy name is required");
      return 0;
    } else if (data.address.length === 0) {
      showToast("error", "Address is required");
      return 0;
    } else if (data.comp_email.length === 0) {
      showToast("error", "email is required");
      return 0;
    } else if (data.landline.length === 0) {
      showToast("error", "landline is required");
      return 0;
    } else if (data.password.length === 0) {
      showToast("error", "password is required");
      return 0;
    } else if (data.c_password.length === 0) {
      showToast("error", "confirm password is required");
      return 0;
    } else if (data.password !== data.c_password) {
      showToast("error", "Confirm Password Doesn't match with password");
      return 0;
    } else if (data.cr_number.length === 0) {
      showToast("error", "CR Number is required");
      return 0;
    } else if (data.cr_expiry_date.length === 0) {
      showToast("error", "CR expiry date is required");
      return 0;
    } else if (data.vat_reg_num.length === 0) {
      showToast("error", "Vat registration number is required");
      return 0;
    } else if (data.activity.length === 0) {
      showToast("error", "Company activities is required");
      return 0;
    }

    if (activeStep === 0) {
    } else if (activeStep === 1) {
      if (data.name.length === 0) {
        showToast("error", "name  is required");
        return 0;
      } else if (data.id_num.length === 0) {
        showToast("error", "Id Number  is required");
        return 0;
      } else if (data.nationality.length === 0) {
        showToast("error", "Nationality  is required");
        return 0;
      } else if (data.phone.length === 0) {
        showToast("error", "Phone  is required");
        return 0;
      } else if (data.email.length === 0) {
        showToast("error", "Email  is required");
        return 0;
      }
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  //handle back button

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  //handle submit

  const handleSubmit = (data) => {
    if (data.doc_cr_number2.length === 0) {
      showToast("error", "CR Number document is required");
      return 0;
    } else if (data.doc_authorization2.length === 0) {
      showToast("error", "Authorization document is required");
      return 0;
    } else if (data.doc_id_copy2.length === 0) {
      showToast("error", "Id copy document is required");
      return 0;
    } else if (data.doc_vat_reg2.length === 0) {
      showToast("error", "VAT registration document is required");
      return 0;
    } else if (data.doc_certificate2.length === 0) {
      showToast("error", "Certificate document is required");
      return 0;
    } else if (data.doc_certificate2.length === 0) {
      showToast("error", "Certificate document is required");
      return 0;
    }

    dispatch(submitRegistration(data));
  };

  useEffect(() => {
    if (isRegAdded) {
      setActiveStep(0);
      // dispatch(FalseCampaignAdded());
    }
  }, [isRegAdded]);
  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <RegStepper activeStep={activeStep} />

      {/* <Box sx={{ width: '100%',display:'flex',justifyContent:'center' }} spacing={4}>
<Stepper sx={{width:'950px'}} alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
{steps.map((label,index) => {

const stepProps = {};
const labelProps = {};

if (isStepSkipped(index)) {
stepProps.completed = false;

} return(
<Step key={label} {...stepProps}>
  <StepLabel {...labelProps} StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
</Step>
);

})}
</Stepper>
</Box> */}

      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }} className="stepper_body my-3">
            {activeStep === 0 && <Registration />}
            {activeStep === 1 && <RegistrationP2 />}
            {activeStep === 2 && <RegistrationP3 />}
          </Typography>
          <div className="stepper_position">
            <Box
              // sx={{ display: "flex", flexDirection: "row", pt: 2 }}
              className="stepper_footer d-flex justify-content-center align-items-center flex-sm-row flex-column-reverse mt-0"
            >
              {activeStep === 1 || activeStep === 2 ? (
                <button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className="fadeIn backButton text-center mt-0"
                >
                  Back
                </button>
              ) : null}
              <Box className="d-flex justify-content-center" />
              {isRegLoad ? (
                <button className="btn btn-outline-primary">
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  >
                    {" "}
                  </span>
                </button>
              ) : (
                <div className="justify-content-center mt-0">
                  <input
                    onClick={(e) => {
                      activeStep === steps.length - 1
                        ? handleSubmit(inputInfo, e)
                        : handleNext(inputInfo);
                    }}
                    type="submit"
                    className="fadeIn next_Btn mt-0"
                    value={activeStep === steps.length - 1 ? t("SUBMIT") : t("NEXT")}
                  />
                </div>
              )}
            </Box>
            {activeStep === 0 ? (
              <div className="regRooter">
                <div id="formFooter" className="d-inline-flex">
                  <p className="forgotPass">{t("Already have an account?")}</p>
                  <Link to="/login" className="registerText">
                  {t("Log in")}
                  </Link>
                </div>
              </div>
            ) : (
              <div id="formFooter" className="d-inline-flex d_hide">
                <p className="forgotPass">{t("Already have an account?")}</p>
                <Link to="/login" className="registerText">
              {t("Log in")}
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </Box>
  );
};
export default RegistrationWrapper;
