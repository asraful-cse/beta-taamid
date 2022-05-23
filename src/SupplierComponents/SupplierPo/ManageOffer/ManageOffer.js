import React, { useEffect } from "react";
import PoBoxCard from "../../../Components/MyPoPage/PoBoxCard/PoBoxCard";
import { useDispatch, useSelector } from "react-redux";
import { GetFilteredOrderData } from "../../../Components/MyPoPage/_redux/Action";
import { Link, useLocation } from "react-router-dom";
import { GetPaymentVerification } from "../../_redux/Action";
import { useTranslation } from "react-i18next";

const ManageOffer = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const filteredOrderList = useSelector(
    (state) => state.myPoInfo.filteredOrderData
  );

  // dispatching
  const dispatch = useDispatch();

 

  const handleOrders = (name, value) => {
    let status = "";
    if (value == 4) {
      status = "completed";
      dispatch(GetFilteredOrderData(status));
    }
    if (value == 1) {
      status = "pending";

      dispatch(GetFilteredOrderData(status));
    }
    if (value == 2) {
      status = "active";

      dispatch(GetFilteredOrderData(status));
    }
    if (value == 5) {
      status = "canceled";
      dispatch(GetFilteredOrderData(status));
    }
  };
 
  useEffect(() => {
    dispatch(GetPaymentVerification());
  }, []);
  
  useEffect(() => {
    handleOrders("orderValue", "2");
  }, []);

  return (
    <>
      {pathname === `/supplier` || pathname === `/supplierManageOffer` ? (
        <>
          <div className="myPoView">
            <h3 className="customMyPoTitle1">{t("Active Orders")}</h3>
            <div>
              <select
                id="gen"
                className="filteringButton "
                onChange={(e) => handleOrders("orderValue", e.target.value)}
              >
                <option selected>{t("Filtering by status")}</option>
                <option value="2">{t("Filtering by Active")}</option>
                <option value="5">{t("Filtering by Cancel")}</option>
              </select>
            </div>
          </div>
          <div className="row">
            {filteredOrderList &&
              filteredOrderList.map((eachMyPo, index) => (
                <Link
                  to={`${
                    eachMyPo.status === 2
                      ? "/singleDetailsActive"
                      : "/cancelledPoDetails"
                  }/${eachMyPo.po.id}`}
                  key={index}
                  className="customLink"
                >
                  <PoBoxCard eachMyPo={eachMyPo} key={index}></PoBoxCard>
                </Link>
              ))}
          </div>
        </>
      ) : pathname === `/manageOffer` ? (
        <>
          <div className="myPoView">
            <h3 className="customMyPoTitle1">{t("Manage Offer")} </h3>
            <div>
              <select
                id="gen"
                className="filteringButton "
                onChange={(e) => handleOrders("orderValue", e.target.value)}
              >
                <option selected>{t("Filtering by status")}</option>
                <option value="1">{t("Filtering by Active")}</option>
                <option value="2">{t("Filtering by Cancel")}</option>
              </select>
            </div>
          </div>
          <div className="row">
            {filteredOrderList &&
              filteredOrderList.map((eachMyPo, index) => (
                <Link
                  to={`${
                    eachMyPo.status === 1
                      ? "/pendingPoDetails"
                      : "/acceptedPoDetails"
                  }/${eachMyPo.po.id}`}
                  key={index}
                  className="customLink"
                >
                  <PoBoxCard eachMyPo={eachMyPo} key={index}></PoBoxCard>
                </Link>
              ))}
          </div>
        </>
      ) : (
        <>
          <div className="myPoView">
            <h3 className="customMyPoTitle1">{t("Order Status")}</h3>
            <div>
              <select
                id="gen"
                className="filteringButton "
                onChange={(e) => handleOrders("orderValue", e.target.value)}
              >
             
                <option value="2" selected>
                  {t("Filtering by Active")}
                </option>
                <option value="4">{t("Filtering by Completed")}</option>
              </select>
            </div>
          </div>
          <div className="row">
            {filteredOrderList &&
              filteredOrderList.map((eachMyPo, index) => (
                <Link
                  to={`${
                    eachMyPo.status === 2
                      ? `/orders/ongoing`
                      : "/orders/completed"
                  }/${eachMyPo.id}`}
                  key={index}
                  className="customLink"
                >
                  <PoBoxCard eachMyPo={eachMyPo} key={index}></PoBoxCard>
                </Link>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default ManageOffer;
