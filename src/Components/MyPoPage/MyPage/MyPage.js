import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import listView from "../../../images/myPo/listView.png";
import gridView from "../../../images/myPo/gridView.png";
import emptyList from "../../../images/myPo/emptyList.png";
import filledGrid from "../../../images/myPo/filledGrid.png";
import { Link, useLocation } from "react-router-dom";

import { GetLatestPoData } from "../_redux/Action";
import { useTranslation } from "react-i18next";

import PoCard from "../../LandingPage/PoCard/PoCard";
import Box from "../../../SupplierComponents/po/Box";

const MyPage = () => {
  const [rating, setRating] = useState(0);
  const latestPoInfo = useSelector((state) => state.myPoInfo.latestPoData);
  console.log("latestPoInfo", latestPoInfo);
  const { t } = useTranslation();
  const { pathname } = useLocation();
  // dispatching
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetLatestPoData());
  }, []);

  // handle grid and list view
  const [listViews, setListView] = useState("list");
  const handleListView = useCallback(() => {
    setCurrentView("grid");
  }, [setListView]);

  const [currentView, setCurrentView] = useState("grid");
  const handleCurrentView = useCallback(() => {
    setCurrentView("list");
  }, [setCurrentView]);

  // const shareDocument = () => {
  //   navigator.clipboard.writeText(window.location.href);
  //   showToast('success', 'Copied! Share Now..');
  // };

  return (
    <>
      <div className="myPoView">
        {pathname === `/supplier` ? (
          <>
            <h3 className="newTitlePo">{t("Newest Po")} </h3>
            <div className="d-flex">
              {currentView === "grid" ? (
                <>
                  <img
                    className="customList"
                    onClick={handleListView}
                    src={listView}
                    alt="listView"
                  />
                  <img
                    className="customGrid"
                    onClick={handleCurrentView}
                    src={gridView}
                    alt="gridView"
                  />
                </>
              ) : (
                <>
                  <img
                    className="customList1"
                    onClick={handleListView}
                    src={emptyList}
                    alt="listView"
                  />
                  <img
                    className="customGrid"
                    onClick={handleCurrentView}
                    src={filledGrid}
                    alt="listView"
                  />
                </>
              )}
            </div>
          </>
        ) : (
          pathname === `/supplier` && (
            <>
              <h3 className="newTitlePo">{t("Newest Po")}</h3>
              <div className="d-flex">
                {currentView === "grid" ? (
                  <>
                    <img
                      className="customList"
                      onClick={handleListView}
                      src={listView}
                      alt="listView"
                    />
                    <img
                      className="customGrid"
                      onClick={handleCurrentView}
                      src={gridView}
                      alt="gridView"
                    />
                  </>
                ) : (
                  <>
                    <img
                      className="customList1"
                      onClick={handleListView}
                      src={emptyList}
                      alt="listView"
                    />
                    <img
                      className="customGrid"
                      onClick={handleCurrentView}
                      src={filledGrid}
                      alt="listView"
                    />
                  </>
                )}
              </div>
            </>
          )
        )}
      </div>
      <div>
        {currentView === "list" ? (
          <div className="row main_row2">
            {latestPoInfo &&
              latestPoInfo.map((eachMyPo) => (
                <>
                  <Link
                    className={` customLink banner cardResponsive ${
                      pathname === `/myPage`
                        ? "col-md-4 col-xl-4 col-sm-6 col-lg-4 col-xs-12"
                        : pathname === `/supplier`
                        ? "col-md-6 col-xl-4 col-sm-6 col-lg-6 col-xs-12"
                        : pathname === `/posearch`
                        ? "col-md-4 col-xl-4 col-sm-6 col-lg-4 col-xs-12"
                        : "col-md-6 col-xl-3 col-sm-6 col-lg-4 col-xs-12"
                    }`}
                  >
                    <div className="mt-4">
                      <PoCard eachMyPo={eachMyPo}></PoCard>
                    </div>
                  </Link>
                </>
              ))}
          </div>
        ) : (
          <>
            {latestPoInfo && true && latestPoInfo.length > 0 && (
              <div>
                {latestPoInfo &&
                  latestPoInfo.map((eachMyPo, index) => (
                    <Link key={index} className="customLink">
                      <Box eachMyPo={eachMyPo}></Box>
                    </Link>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MyPage;
