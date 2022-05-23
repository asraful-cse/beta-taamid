import React, { useEffect, useState } from "react";
import bannerImage from "../../../images/banner/banner.png";
import "./Banner.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getBanner } from "../_redux/Action";
const Banner = () => {
  const banner = useSelector((state) => state.landingInfo.banner);
  const [fulldescription, descriptionSet] = useState(false);
  const { t } = useTranslation();

  const description = banner?.description
    ? banner?.description.slice(0, 250)
    : "";

  const readMore = async () => {
    if (!fulldescription) {
      descriptionSet(true);
    } else {
      descriptionSet(false);
    }
  };
  let showDescription = fulldescription ? banner?.description : description;
  let buttonTitle = fulldescription ? t('Read Less') : t("Read More") ;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBanner());
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-7 col-sm-12  bannerMargin bannerMargin2">
          <p className="timeText timeText2">{banner?.sub_title}</p>
          <h1 className="headerText headerText2">{banner?.title}</h1>
          <p className="headerPara headerPara2">{showDescription} </p>

          {/*<p className='headerPara headerPara2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>*/}
          <div className="headerBtn headerBtn_2">
            <button className="readBtn" onClick={readMore} id="myBtn">
              {buttonTitle}
            </button>
            <a href="/#recentPo">
              <button className="discoverBtn">{t("Discover")}</button>
            </a>
          </div>
        </div>
        <div className="col-md-5  col-sm-12 bannerImgMargin">
          <img
            className="bannerImg img-fluid"
            src={banner?.image ? banner.image : bannerImage}
            alt="banner"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
