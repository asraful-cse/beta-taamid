import React from "react";
import footerLogo from "../../../images/taamidLogo.png";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import arrowBg from "../../../images/footer/rightArrowBG.png";
import { Link, NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useTranslation } from 'react-i18next';
import facebook from "../../../images/footer/facebook.png";
import twitter from "../../../images/footer/twitter.png";
import linkedin from "../../../images/footer/linkedin.png";
const Footer = () => {
  const { t } = useTranslation();
  return (
    <>
      {" "}
      <hr className="solid" />
      <div className="container">
        <div className="row logoColumn">
          <div className=" col-md-3 col-lg-3 col-sm-12 col-xs-12">
            <Link to="/">
              <img className="footerLogo" src={footerLogo} alt="footerLogo" />
            </Link>
            <p className="footerPara1">{t("The New Creative Economy.")}</p>
          </div>
          <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
            <p className="footerHeaderPara">{t("Important Link")}</p>
            <Link to="/contactus" className="removeLinkCss">
              {" "}
              <p className="footerSmallPara">{t("Contact Us")}</p>
            </Link>
            <Link to="/whoWeAre" className="removeLinkCss">
              <p className="footerSmallPara">{t("Who we are")}</p>
            </Link>
            <HashLink className="removeLinkCss" to="/#howtowork">
              <p className="footerSmallPara">{t("How it works")}</p>
            </HashLink>

            <Link to="/disclaimer" className="removeLinkCss">
              <p className="footerSmallPara">{t("Disclaimer")}</p>
            </Link>
          </div>
          <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
            <p className="footerHeaderPara">{t("Social Media")}</p>
            <div>
              <ul className="social-media list-inline">
                <li className="list-inline-item iconResize">
                  <a href="//facebook.com">
                    {" "}
                    <img src={facebook} alt="" />
                  </a>
                </li>
                <li className="list-inline-item iconResize">
                  <a href="//google.com">
                    <img src={twitter} alt="" />
                  </a>
                </li>
                <li className="list-inline-item iconResize">
                  <a href="//instagram.com">
                    <img src={linkedin} alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className=" col-md-3 col-lg-3 col-sm-12 col-xs-12">
            <p className="footerHeaderPara">{t("Join Newsletter")}</p>
            <p className="newsCaption">
              {t("Subscribe our newsletter to get more info about new PO & Deals.")}

            </p>
            <div className=" newsLetter">
              <div className="d-flex newsletter_small">
                <input
                  type="text"
                  className="subscribeBtn"
                  placeholder={t('Enter your email')}
                />
                <img className="rightArrow" src={arrowBg} alt="arrow" />
                <span className="rightArrowSign">&#8594;</span>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="copyRightCap">
          <p>

            {t("Copyright © 2022 PO. All rights reserved")}

          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
