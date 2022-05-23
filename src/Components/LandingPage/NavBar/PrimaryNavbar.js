import React, { useEffect, useRef, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import logo from '../../../images/taamidLogo.png';
import searchIcon from '../../../images/icons/Shape.png';
import arrowDown from '../../../images/icons/Arrow - Down 2.png';
import isEmpty from '../../../utils/isEmpty';
import { getUser } from '../../LoginRegistration/Login/_redux/Action';
import { GetCategories } from '../../MyPoPage/_redux/Action';
import { GetPOItemList } from '../../../SupplierComponents/_redux/Action';

const PrimaryNavbar = ({ handleLogout, languages, currentLanguageCode }) => {
    const [showSearchItems, showSearchItemsSet] = useState(false);
    const [showPOCategoryItems, showPOCategoryItemsSet] = useState(false);
    const [searchPONumber, searchPONumberSet] = useState(false);
    const [poNumber, poNumberSet] = useState(null);
    const searchInputRef = useRef(null);
    const searchItemsRef = useRef(null);
    const categoryItemsRef = useRef(null);

    const history = useHistory();
    const location = useLocation();
    const { t, i18n } = useTranslation();

    const dispatch = useDispatch();
    const categoryData = useSelector((state) => state.myPoInfo.categoryData);

    const changeLanguageOnSelect = (lang) => {
        localStorage.setItem("language", lang);
        i18n.changeLanguage(lang);
    };

    const selectedLanguage = localStorage.getItem('language');
    const isLoggedIn = localStorage.getItem('is_logged_in');
    const isLoggedInNotNull = isLoggedIn === null;

    const expandSearchBar = () => {
        const element = document.getElementById('dropdownId');
        element.classList.add('expandWide');
    };

    const removeExpandSearchPortion = () => {
        const element = document.getElementById('dropdownId');
        element.classList.remove('expandWide');
    };

    const handleChangePONumber = (e) => poNumberSet(parseInt(e.target.value));

    const handleSubmitPoNumber = async (e) => {
        e.preventDefault();
        history.push(`/search?po_no=${poNumber}`);
    };

    const handleShowSearchItems = () => {
        showSearchItemsSet(true);
        expandSearchBar();
    };

    const handleSearchPOCategories = () => {
        showSearchItemsSet(false);
        showPOCategoryItemsSet(true);
        // expandSearchBar();
    };

    const handleSearchPONumber = () => {
        showSearchItemsSet(false);
        showPOCategoryItemsSet(false);
        searchPONumberSet(true);
        // expandSearchBar();
    };

    const handleNothingInputClick = () => { };

    useEffect(() => {
        dispatch(GetCategories());
        dispatch(GetPOItemList());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch, isLoggedInNotNull]);

    useEffect(() => {
        const handleExpandSearch = (event) => {
            if (
                (searchInputRef && !searchInputRef?.current?.contains(event.target)) &&
                (searchItemsRef && !searchItemsRef?.current?.contains(event.target))
            ) {
                showSearchItemsSet(false);
            }
        };
        if (showSearchItems) window.addEventListener('click', handleExpandSearch);

        return () => window.removeEventListener('click', handleExpandSearch);
    }, [showSearchItems]);

    useEffect(() => {
        const handleExpandCategories = (event) => {
            if (
                (searchInputRef && !searchInputRef?.current?.contains(event.target)) &&
                (categoryItemsRef && !categoryItemsRef?.current?.contains(event.target))
            ) {
                showPOCategoryItemsSet(false);
            }
        };
        if (showPOCategoryItems) window.addEventListener('click', handleExpandCategories);

        return () => window.removeEventListener('click', handleExpandCategories);
    }, [showPOCategoryItems]);

    useEffect(() => {
        showSearchItemsSet(false);
        showPOCategoryItemsSet(false);
        searchPONumberSet(false);
        poNumberSet(null);
        removeExpandSearchPortion();
    }, [location.pathname]);

    useEffect(() => {
        if (searchPONumber) {
            searchInputRef.current?.focus();
        }
    }, [searchPONumber]);

    useEffect(() => {
        const handleCloseSearchPONumber = (event) => {
            if (searchInputRef && !searchInputRef?.current?.contains(event.target)) {
                searchPONumberSet(false);
            }
        };
        if (searchPONumber) window.addEventListener('click', handleCloseSearchPONumber);

        return () => window.removeEventListener('click', handleCloseSearchPONumber);
    }, [searchPONumber]);

    return (
        <Navbar bg='white' expand='lg'>
            <Container>
                <Navbar.Brand >
                    <Link to="/">
                        <img src={logo} className='d-inline-block align-top' alt='logo' />
                    </Link>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls='basic-navbar-nav' />

                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='d-flex align-items-lg-center flex-md-row flex-column ms-auto'>
                        <li className='nav-item active'>
                            <div className='searchBarDropdown position-relative'>
                                <div id='dropdownId' className="searchBarDropdown">
                                    <form onSubmit={handleSubmitPoNumber} className='dropbtn d-flex align-items-center'>
                                        {showPOCategoryItems && <i className="bi bi-grid searchIconPN search-icon-combine" style={{ height: '22px', width: '22px' }}></i>}
                                        {searchPONumber && <i className="bi bi-123 search-icon-number searchIconPN"></i>}

                                        <input
                                            ref={searchInputRef}
                                            className='navSearchInput'
                                            type='number'
                                            placeholder={searchPONumber ? t("Search By PO Number") : showPOCategoryItems ? t("Search By Category") : t("Search By...")}
                                            value={searchPONumber ? poNumber : ''}
                                            onFocus={searchPONumber ? handleNothingInputClick : handleShowSearchItems}
                                            onClick={searchPONumber ? handleNothingInputClick : handleShowSearchItems}
                                            onChange={handleChangePONumber}
                                        />
                                        <button type="submit">
                                            <img className='searchIcon mt-1' src={searchIcon} alt='searchIcon' />
                                        </button>
                                    </form>
                                </div>

                                {showSearchItems && <div ref={searchItemsRef} className='search-items'>
                                    <div className='dropdown-content rounded-3' style={{ zIndex: 999 }}>
                                        <div className='search-dropdown-item rounded-3'>
                                            <button className='d-flex justify-content-center align-items-center gap-2' onClick={handleSearchPOCategories}>
                                                <i className='bi bi-grid fs-4 searchIcon-combine'></i>
                                                <div>
                                                    <p className='searchDW-Title text-break'>{t("Search Po with Category")}</p>
                                                    <span className='d-block text-muted text-wrap fw-light text-start'>{t("Categories and PO")}</span>
                                                </div>
                                            </button>
                                        </div>
                                        <hr />
                                        <div className='search-dropdown-item rounded-3'>
                                            <button className='d-flex justify-content-start align-items-center gap-2' onClick={handleSearchPONumber}>
                                                <i className='bi bi-123 fs-4 searchIcon-number'></i>
                                                <div>
                                                    <p className='searchDW-Title text-break'>{t("Search Po with PO Number")}</p>
                                                    <span className='d-block text-muted text-wrap fw-light text-start'>{t("Find and track PO")} </span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>}

                                {!showSearchItems && showPOCategoryItems && <div ref={categoryItemsRef}>
                                    <div className='dropdown-content rounded-3' style={{ zIndex: 999 }}>
                                        {categoryData && categoryData.map((category) => (
                                            <Link key={category.id} to={`/posearch/${category.id}`} className='text-dark'>
                                                <li type='button' className='searchListItem text-capitalize'>{category.name}</li>
                                            </Link>
                                        ))}

                                        {isEmpty(categoryData) && <p className='text-danger text-center mt-2'>{t("Please login to your account.")} <Link to='/login'>{t("Login")}</Link></p>}
                                    </div>
                                </div>}
                            </div>
                        </li>

                        <div className='d-flex flex-column justify-content-between flex-md-row flex-row-reverse' id='navbarSupportedContent'>
                            <li className='nav-item active  loginSignUpContainer'>
                                <div className='language-select'>
                                    <div className='d-flex justify-content-end align-items-center language-select-root'>
                                        <div className='mx-2 dropdown language_dropdown'>
                                            <button
                                                className='btn language_btn  dropdown-toggle d-flex align-items-center'
                                                type='button'
                                                id='dropdownMenuButton'
                                                data-toggle='dropdown'
                                                aria-haspopup='true'
                                                aria-expanded='false'
                                            >
                                                <img className='ml-2 mr-2' src={t('language_logo')} alt='' />
                                                <span className='chevron_img'><img src={arrowDown} alt='' /></span>
                                            </button>

                                            <ul className='dropdown-menu customDropdown' aria-labelledby='dropdownMenuButton'>
                                                {languages.map(({ code, name, country_code, img }) => (
                                                    <li key={country_code}>
                                                        <a
                                                            href={() => false}
                                                            className={classNames('dropdown-item customDivider ml-3', { disabled: currentLanguageCode === code })}
                                                            onClick={() => changeLanguageOnSelect(code)}
                                                        >
                                                            <span
                                                                className={`flag-icon flag-icon-${country_code}`}
                                                                style={{ opacity: currentLanguageCode === code ? 0.5 : 1 }}
                                                            ></span>
                                                            <div className='d-flex justify-content-end align-items-end language_img'>
                                                                {name}
                                                                <img src={img} alt='' />
                                                            </div>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li className='nav-item active'>
                                <div className='loginSignUpContainer'>
                                    {
                                        isLoggedIn == null ?
                                            <Link to='/login' className="loginBtn">
                                                {t("Login")}
                                            </Link>
                                            :
                                            <button className="loginBtn" onClick={handleLogout}>
                                                {t("Log out")}
                                            </button>

                                    }

                                    <Link to='/signup' className='signupBtn'> {t("Sign Up")}</Link>
                                </div>
                            </li>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default PrimaryNavbar;
