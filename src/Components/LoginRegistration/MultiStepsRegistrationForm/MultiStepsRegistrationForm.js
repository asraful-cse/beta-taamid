import React from "react";
import "./MultiStepsRegistrationForm.css";
import RegistrationWrapper from "../RegistrationStepper/RegistrationWrapper";

const MultiStepsRegistrationForm = () => {
  return (
    <div>
      {/* <Stepper>
        <Stepper.Steps>
          <Stepper.Step
            id="first"
            name="General
Information"
          >
            <StepBody>
              <Registration />
            </StepBody>
          </Stepper.Step>
          <Stepper.Step
            id="second"
            name="Authorized Person’s
Information"
          >
            <StepBody>
              <RegistrationP2 />
            </StepBody>
          </Stepper.Step>
          <Stepper.Step
            id="third"
            name="Attachments
Upload"
          >
            <StepBody>
              <RegistrationP3 />
            </StepBody>
          </Stepper.Step>
        </Stepper.Steps>
      </Stepper> */}

      <RegistrationWrapper />
    </div>
  );
};

export default MultiStepsRegistrationForm;
