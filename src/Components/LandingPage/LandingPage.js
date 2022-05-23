import React, { useEffect } from "react";
import "./LandingPage.css";
import Banner from "./Banner/Banner";
import CounterInfo from "./CounterSection/CounterInfo";
import WorkingSection from "./WorkingSection/WorkingSection";
import PoSection from "./PoSection/PoSection";
import EmployeeSlider from "./EmployeeSlider/EmployeeSlider";
import Client from "./Clients/Client";
import { useDispatch } from "react-redux";
import { getHomeSliderData } from "./_redux/Action";

const LandingPage = () => {
  window.scroll({
    top: 100,
    left: 100,
    behavior: "smooth",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomeSliderData());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="container">
        <Banner />
      </div>

      <div className=" customClientMargin container">
        <Client />
      </div>

      <div className="customCounterMargin ">
        <CounterInfo />
      </div>

      <div className="customWorkingMargin">
        <WorkingSection />
      </div>

      <div className="customWorkingMargin">
        <EmployeeSlider />
      </div>

      <div className="customWorkingMargin">
        <PoSection />
      </div>
    </div>
  );
};

export default LandingPage;
