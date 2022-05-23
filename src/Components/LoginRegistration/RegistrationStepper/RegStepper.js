import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { Box } from '@mui/material';
import './RegistrationWrapper.css';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
        backgroundColor:'#2B3990',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      
      backgroundColor:'#2B3990',

    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 6,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: 'white',
  zIndex: 1,
  color: '#777E90', //   text color
  width: 50,
  fontSize:'24px',
  fontWeight:600,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  border:'3px solid #777E90',
  ...(ownerState.active && {
    border:'none',
    backgroundColor:'#2B3990',
    color:'white',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    border:'none',
    color:'white',
    backgroundColor:'#2B3990',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: '1',
    2: '2',
    3: '3',
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ["General Information" ,"Authorized Person’s Information" ,"Attachments Upload"];
const RegStepper = ({activeStep}) => {

    return (
      <Box sx={{width:'100%', display:'flex',justifyContent:'center',mt:8 }} spacing={4}>
      <Stepper sx={{width:'950px'}} alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />} >
        {steps.map((label) => (
          <Step key={label} >
            <StepLabel sx={{
                '& .MuiStepLabel-label': {
                    fontSize:16,
                    fontWeight:500,
                    fontFamily:'Poppins',
                    textAlign:'center',
                    '&.Mui-active': {
                        color:'#2B3990',
                      },
                    '&.Mui-completed':{
                        color:'#2B3990',

                    },
                  },
            }} StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
    );
};

export default RegStepper;