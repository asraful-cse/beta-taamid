/* eslint-disable jsx-a11y/alt-text */
import React, {useEffect} from "react";
import "./EmployeeSlider.css";
import OwlCarousel from "react-owl-carousel";
import Slider from "react-slick";
import {useDispatch, useSelector} from "react-redux";
import {getHomeSliderData} from "../_redux/Action";



const EmployeeSlider = () => {


  let option = {
   
    responsive: {
      0: {
        items: 1,
      },
      450: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };
  function NextArrow(props) {
    const {  style, onClick } = props;
    return (
    <div className='nav-btn next-slide next-slide_2' style={{ ...style, display: "block", }} onClick={onClick} >
       <img src="https://i.ibb.co/72GW5cc/Group-3351.png" />
        </div>
    );
  }
  
  function PrevArrow(props) {
    const {  style, onClick } = props;
    return (
      <div className='nav-btn nav-btn prev-slide prev-slide_2' style={{ ...style, display: "block", }} onClick={onClick} >
     <img src=" https://i.ibb.co/RBPr66Q/Group-3352.png"/>
      </div>
    );
  }
  const homeSliderInfo = useSelector((state) => state.landingInfo.homeSliderData);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,   
    autoplaySpeed: 2000,
    rtl: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  
  
  }

// dispatching
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomeSliderData());
  }, []);

  return (
    <div className="card__container owl_profile">
    
      <Slider {...settings}>
      {homeSliderInfo && homeSliderInfo.map((item, index) => {
          return (
            <div key = { index } className="sliderBG sliderBG2 responsive_slider responsive_slider2">
              <div>
                <img className="sliderImg imgNew" src={item.image} alt="item" />
              </div>
              <div className="sliderText newSliderText">
                <h2 className="sliderTitle sliderTitle_N2">{item.Name}</h2>
                <h4 className="sliderSubTitle sliderSubTitle_2">
                  {item.short_description}
                </h4>
                <p className="sliderPara sliderPara_N2">
                  {item.disclaimer}
                  
                </p>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default EmployeeSlider;
