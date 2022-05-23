import React, { useEffect, useRef, useState } from 'react';
import i18next from 'i18next';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useTranslation } from 'react-i18next';
import modules from "../../../modules/index";
import logo from "../../../images/taamidLogo.png";
import notificationIcon from "../../../images/navbar/notification.png";
import droptoggle from '../../../images/myPo/droptoggle.png';
import right from "../../../images/navbar/right.png";
import Notifications from '../../MyPoPage/Notifications/Notifications';

const SecondaryNavbar = ({ currentTab, setCurrentTab, handleUserType, handleLogout, isLoggedIn, languages, currentLanguageCode, profile }) => {
    const [companyName, setCompanyName] = useState('');
    const [showNotification, showNotificationSet] = useState(false);
    const [notifications, notificationsSet] = useState([]);
    const notificationRef = useRef();
    const notificationBoxRef = useRef();
    const { t, i18n } = useTranslation();
    const { pathname } = useLocation();
    //userType 1 = super, userType 2= requester , userType 3= supplier
    const userType = localStorage.getItem('user_type');
    const handleToggleNotification = () => showNotificationSet(prevState => !prevState);


    // Notification Websocket Connection
    const access_token = localStorage.getItem('access_token');
    const notificationSocketURL = process.env.NODE_ENV === "development" ? `ws://134.209.193.73/ws/notifications?token=${access_token}` : `wss://134.209.193.73/ws/notifications?token=${access_token}`;
    const { lastMessage, readyState } = useWebSocket(notificationSocketURL);

    const changeLanguageOnSelect = (lang) => {
        localStorage.setItem("language", lang);
        i18n.changeLanguage(lang);
    };

    useEffect(() => {
        if (lastMessage !== null) {
            notificationsSet((prev) => prev.concat(lastMessage));
        }
    }, [lastMessage, notificationsSet]);

    // eslint-disable-next-line no-unused-vars
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    useEffect(() => {
        if (profile) {
            let name = profile.company.comp_name
            setCompanyName(name)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const handleExpandNotification = (event) => {
            if (
                (notificationRef && !notificationRef.current.contains(event.target)) &&
                (notificationBoxRef && !notificationBoxRef?.current?.contains(event.target))
            ) {
                showNotificationSet(false);
            }
        };

        if (showNotification) window.addEventListener('click', handleExpandNotification);

        return () => {
            window.removeEventListener('click', handleExpandNotification);
            notificationsSet([]);
        };
    }, [showNotification]);

    return (
        <nav className="container navbar  navbar-light navbar-expand-lg navbar-template">
            <a className="navbar-brand"   {...currentTab === 'Requester' || currentTab === 'Switch to Requester' ? { href: "/myPo" } : currentTab == 'Supplier' || currentTab == 'Switch to Supplier' ? { href: "/supplier" } : { href: "/myPo" }}  >
                <img src={logo} className="img-fluid brand-logo" alt="logo" />{" "}
            </a>


            <div className="d-flex aign-items-center flex-row order-2 order-lg-3">
                <ul className="navbar-nav flex-row">
                    <li className="nav-item me-3 d-flex  align-items-center d-block d-lg-none notification">
                        <div className='position-relative'>
                            <div ref={notificationRef} className='position-relative d-flex align-items-center' onClick={handleToggleNotification}>
                                <img src={notificationIcon} alt="notificationIcon" className="" />
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-success">
                                    <span className="visually-hidden">{t("unread notifications")}</span>
                                </span>
                            </div>

                            {showNotification &&
                                <div ref={notificationBoxRef} className='position-absolute top-100 start-25' style={{ zIndex: 1000 }}>
                                    <Notifications />
                                </div>
                            }
                        </div>
                    </li>
                </ul>
                <button className="navbar-toggler ms-4" type="button" data-toggle="collapse" data-target="#navbarNavDropdown">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>

            <div className="collapse navbar-collapse order-3 order-lg-2" id="navbarNavDropdown">
                <ul className=" navbar-nav ml-auto d-flex flex-row-reverse flex-lg-row justify-content-start align-items-lg-center ">
                    {/* Notification Portion */}
                    <li className="nav-item d-none d-lg-block notification">
                        <div className='position-relative'>
                            <div ref={notificationRef} className='position-relative d-flex align-items-center' onClick={handleToggleNotification}>
                                <img src={notificationIcon} alt="notificationIcon" className="" />
                                {notifications?.length ?
                                    <div className='position-absolute top-0 start-50 translate-middle mx-2'>
                                        <div className="bg-success rounded-circle " style={{ height: '10px', width: '10px' }}></div>
                                    </div> : null}
                            </div>

                            {showNotification &&
                                <div ref={notificationBoxRef} className='position-absolute top-100 start-25' style={{ zIndex: 1000 }}>
                                    <Notifications />
                                </div>
                            }
                        </div>
                    </li>


                    <div className='mt-0 mt-sm-1 mt-lg-0 '>
                        {userType == 1 && modules.map((module) => {
                            if (
                                currentTab === module.name
                            ) return null
                            return (
                                <li
                                    key={module.name}
                                    className={'switchActive'}
                                >
                                    <Link
                                        to={module.routeProps.path}
                                        onClick={() => { setCurrentTab(module.name); handleUserType(); }}
                                    >
                                        {module.name === "Switch to Requester" ? t("Switch to Requester") : t('Switch to Supplier')}
                                    </Link>
                                </li>
                            )
                        })}
                    </div>

                    <li className=" nav-item dropdown align-items-center me-lg-0 me-3 pt-lg-0 pt-0 mt-sm-0 mt-1">

                        <Link className="nav-link d-flex justify-content-center align-items-center " id="navbarDropdownMenuLink" data-toggle="dropdown">
                            <img className='rounded-circle dropToggleImg' src={droptoggle} alt="" /></Link>
                        <div className="dt_dw dropdown-menu dropdown-menu-right dropdownList">

                            {companyName && pathname === '/supplier' ?
                                (
                                    <Link to={`/supplier`}>
                                        <li className="dropdown-item" href="/supplier">{t("My Page")} </li>
                                    </Link>
                                ) :
                                (
                                    <li className="dropdown-item" href="#">{companyName}</li>

                                )
                            }

                            <hr className='mx-3 my-2' />

                            <li className="lng">
                                <li className="dropdown-item chg_lan" href="#">{t('Change Language')}

                                    <img className='ms-2' src={right} alt="" /></li>

                                <div className="Language_select_hover"

                                >
                                    {languages.map(
                                        ({ code, name, country_code, img }) => (
                                            <li key={country_code}>
                                                <a
                                                    //   defaultValue={value}
                                                    //   onChange={handleChange}
                                                    href={() => false}
                                                    className={classNames(
                                                        "dropdown-item customDivider",
                                                        {
                                                            disabled: currentLanguageCode === code,
                                                        }
                                                    )}
                                                    onClick={() => changeLanguageOnSelect(code)}
                                                >
                                                    <span
                                                        className={`flag-icon flag-icon-${country_code}`}
                                                        style={{
                                                            opacity:
                                                                currentLanguageCode === code
                                                                    ? 0.5
                                                                    : 1,
                                                        }}
                                                    ></span>
                                                    <div className="d-flex language_img">
                                                        {name}
                                                        <img src={img} alt="" />
                                                    </div>
                                                </a>
                                            </li>
                                        )
                                    )}
                                </div>
                            </li>


                            <hr className='mx-3 my-2' />
                            <li
                                onClick={() => handleLogout()}
                                className="dropdown-item text-danger" href="#">{isLoggedIn !== null ? t('Log out') : t('Log in')}
                            </li>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default SecondaryNavbar;