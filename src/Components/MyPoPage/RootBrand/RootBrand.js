/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from "react";
import "./RootBrand.css";

import { Link, NavLink } from "react-router-dom";
import invite from "../../../images/people/invite.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import rootBrandLogo from "../../../images/myPo/rootbandLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { getProfilePicture, createProfilePicture, updateProfilePicture, deleteProfilePicture } from "./_redux/Action";
import { useTranslation } from "react-i18next";
import cameraIcon from "../../../images/fileIcons/camara.svg";
import deleteIcon from "../../../images/fileIcons/delete.svg";

const RootBrand = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isRequester = useSelector((state) => state.myPoInfo.changeCurrentRole);
  const profile = useSelector((state) => state.loginInfo.userProfile);
  const profile_picture = useSelector((state) => state.profile_picture.profile_picture);
  const [style, setStyle] = useState(false);
  const [img, setImage] = useState();
  const fileRef = useRef();


  useEffect(() => {
    dispatch(getProfilePicture());
  }, [dispatch]);

  let recentCompanyId = localStorage.getItem("recentChatCompany");
  //  alert(recentCompanyId);


  const deleteOnProfilePicture = () => {
    dispatch(deleteProfilePicture({ id: profile_picture.id, }));
  }
  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setImage(reader.result);
      let data = {

        company: profile.user.company,
        file,
        image: reader.result,
      };
      if (profile_picture) {
        data['id'] = profile_picture.id
        dispatch(updateProfilePicture(data));
      } else {
        dispatch(createProfilePicture(data));
      }


    };
    reader.readAsDataURL(file);
  };
  const navRootBrands2 = [
    {
      title: t("My Po"),
      page_link: "/myPo",
    },
    {
      title: t("Manage Offer"),
      page_link: "/manageOffer",
    },
    {
      title: t("Po History"),
      page_link: "/poHistory",
    },
    {
      title: t("Favourite Po"),
      page_link: "/favPo",
    },
    {
      title: t("Manage Profile"),
      page_link: "/manageProfile",
    },
    {
      title: t("People"),
      page_link: "/people",
      image: invite,
    },

    {
      title: t("Message Center"),
      page_link: `/messageCenter/${recentCompanyId}`,
    },
  ];
  const navRootBrands3 = [
    {
      title: t("Manage Offer"),
      page_link: "/supplierManageOffer",
    },
    {
      title: t("Order Status"),
      page_link: "/orderStatus",
    },
    {
      title: t("Manage Profile"),
      page_link: "/manageProfile",
    },
    {
      title: t("People"),
      page_link: "/people",
      image: invite
    },
    {
      title: "Favourite Po",
      page_link: "/favPo",
    },

    {
      title: t("Message Center"),
      page_link: `/messageCenter`,
    },
  ];
  return (
    <div className="rootCard position-relative">
      <i className="bi bi-star-fill text-warning ratingProfile">
        <span className="fst-normal ms-1">5</span>
      </i>
      <div className="profile-pic" onMouseLeave={() => setStyle(false)}>
        <div className="brandLogo">
          <img
            className=" rounded-circle"
            onMouseOver={() => setStyle(true)}
            src={profile_picture ? profile_picture?.image : img}
            alt="rootBrandLogo"
            for="photo-upload"
          />

          <input
            id="photo-upload"
            className="d-none"
            ref={fileRef}
            type="file"
            onChange={photoUpload}
          />
        </div>
        <div className={style ? "profile-action" : "d-none"}>
          <button className="btn delete-btn" onClick={deleteOnProfilePicture}>
            <img
              src={deleteIcon}

              alt="icon"
            />
          </button>

          <button className="btn camera-btn" onClick={() => fileRef.current.click()}>
            <img src={cameraIcon} alt="icon" />{" "}
          </button>
        </div>
      </div>

      <h2 className="brandTitle">{t("Root Brand")} </h2>
      {isRequester == 2 ? (
        <p className="brandSubTitle mt-2">{t("Requester")} </p>
      ) : isRequester == 3 ? (
        <p className="brandSubTitle mt-2">{t("Supplier")}</p>
      ) : null}

      <p className="brandText">
        {t(
          "A wholesome farm owner in Montana. Upcoming gallery solo show in Germany..."
        )}
      </p>

      <div className="MyPoList">
        <ul>
          {isRequester === 2 ? (
            <>
              {navRootBrands2.map((item) => (
                <div style={{ width: "100%" }} key={Math.random()}>
                  <li>
                    <NavLink
                      to={item.page_link}
                      className="text-link d-flex align-items-center link"
                      activeClassName={"greenColored"}
                    >
                      <FontAwesomeIcon
                        className="squareBox"
                        icon={faAngleRight}
                      />

                      {item.title}

                      <div>
                        <img
                          src={item?.image}
                          className="invitePeople img-fluid ml-lg-3"
                          alt=""
                        />
                      </div>
                    </NavLink>
                  </li>
                  <hr
                    style={{
                      width: "80%",
                      height: "1px",
                      left: "180px",
                      top: "477px",
                      background: "#b0b3b9",
                    }}
                  />
                </div>
              ))}
              <div className="createRoot">
                <button className="createBtn">
                  <Link to="/createNewPo">{t("Create New Po")}</Link>
                </button>
              </div>
            </>
          ) : (
            <>
              {navRootBrands3.map((item) => (
                <li style={{ width: "100%" }} key={Math.random()}>
                  <li>
                    <NavLink
                      to={item.page_link}
                      className="text-link d-flex align-items-center"
                      activeClassName={"greenColored"}
                    >
                      <FontAwesomeIcon
                        className="squareBox"
                        icon={faAngleRight}
                      />
                      {item.title}
                      <div>
                        <img
                          src={item?.image}
                          className="invitePeople img-fluid ml-lg-3"
                          alt=""
                        />
                      </div>
                    </NavLink>
                  </li>
                  <hr
                    style={{
                      width: "80%",
                      height: "1px",
                      left: "180px",
                      top: "477px",
                      background: "#b0b3b9",
                    }}
                  />
                </li>
              ))}
            </>
          )}
        </ul>
      </div>

      {/*{isRequester===2 && (*/}
      {/*  <>*/}
      {/*    <ul>*/}
      {/*      <hr style={{ width: "80%", border: "1px solid #E6E8EC" }} />*/}
      {/*    </ul>*/}
      {/*    <div className="createRoot">*/}
      {/*      <button className="createBtn">*/}
      {/*        <Link to="/createNewPo">Create New Po</Link>*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*  </>*/}
      {/*)}*/}
    </div>
  );
};

export default RootBrand;
