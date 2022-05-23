import React, { useEffect, useState } from 'react';
// import i18next from "i18next";
import './NavBar.css';
// import logo from "../../../images/taamidLogo.png";
// import { Link } from "react-router-dom";
// import usa from "../../../images/navbar/usa.png";
// import right from "../../../images/navbar/right.png";
// import notificationIcon from "../../../images/navbar/notification.png";
// import modules from "../../../modules/index";
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';
// import classNames from "classnames";
import { getUser, SetLoginStatusFalse } from '../../LoginRegistration/Login/_redux/Action';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { changeCurrentRole, getMyPoList } from '../../MyPoPage/_redux/Action';

import PrimaryNavbar from './PrimaryNavbar';
import SecondaryNavbar from './SecondaryNavbar';

const languages = [
  {
    code: 'en',
    name: 'English',
    dir: 'ltr',
    country_code: 'gb',
    img: 'https://i.ibb.co/6trLFkS/30x30-usa.png',
  },
  {
    code: 'ar',
    name: 'العربية',
    dir: 'rtl',
    country_code: 'sa',
    img: 'https://i.ibb.co/BT3mvpx/AR-30x30.png',
  },
];

const NavBar = () => {
  const currentLanguageCode = localStorage.getItem('language') || 'en';
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const [currentTab, setCurrentTab] = useState('Switch to Requester');

  useEffect(() => {
    // console.log("Setting page stuff");
    document.body.dir = currentLanguage.dir || 'ltr';
    document.body.lang = currentLanguage.code || 'en';
    document.title = t('Taamid');
  }, [currentLanguage, t]);

  const releaseDate = new Date('2021-03-07');
  const timeDifference = new Date() - releaseDate;
  const number_of_days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const dispatch = useDispatch();

  const profile = useSelector((state) => state.loginInfo.userProfile);

  const history = useHistory();

  // loggedIn status
  const isLoggedIn = localStorage.getItem('is_logged_in');
  const isLoggedInNotNull = isLoggedIn === null;

  // get User rendering
  useEffect(() => {
    dispatch(getUser());
  }, [isLoggedInNotNull]);

  // LogOut
  const handleLogout = () => {
    let response = {
      status: false,
      message: '',
      isLoading: true,
    };

    try {
      localStorage.removeItem('is_logged_in');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_type');

      // toast.success('Logged out successfully !');
      if (typeof window !== 'undefined') {
        window.loction.href = '/login';
      }
    } catch (error) {
      response.message = 'Something Went Wrong !';
      // toast.error(error);
    }

    dispatch(SetLoginStatusFalse());
    history.push('/login');
    window.location.reload();
  };

  //handle user type
  const handleUserType = () => {
    dispatch(changeCurrentRole());
  };

  const url = `${process.env.LOCAl_HOST}`;
  console.log('process.env.LOCAl_HOST', url);

  return (
    <>
      {pathname === `/` ||
        pathname === `/#recentPo` ||
        pathname === `/login` ||
        pathname === `/signup` ? (
        <PrimaryNavbar
          currentLanguageCode={currentLanguageCode}
          languages={languages}
          handleLogout={handleLogout}
        />
      ) : (
        <>
          <SecondaryNavbar
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            handleUserType={handleUserType}
            handleLogout={handleLogout}
            isLoggedIn={isLoggedIn}
            languages={languages}
            currentLanguageCode={currentLanguageCode}
            profile={profile}
          />
        </>
      )}

      {/* <div className="pl-2 d-flex flex-column align-items-start ">*/}
      {/*<h1 className="font-weight-normal mb-3">{t("welcome_message")}</h1>*/}
      {/*<p>{t("days_since_release", { number_of_days })}</p>*/}
      {/*</div>  */}
    </>
  );
};

export default NavBar;
