import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./PoBoxCard.css";
import { useTranslation } from "react-i18next";

const PoBoxCard = ({ eachMyPo }) => {
  const { t } = useTranslation();

  return (
    <>
      {eachMyPo && (
        <div className="poBoxCard">
          <div className="justify-content-between d-flex">
            <button className="poNo">
              {t("PO NO")}: {eachMyPo.po.po_no} 
            </button>
          </div>

          <div className="justify-content-between">
            <h3 className="PoBoxTitle">{eachMyPo.po.title}</h3>
            <p className="PoSubTitle">{eachMyPo.po.description}</p>
          </div>

          <div className="cardBoxBody row">
            <div className="col-md-3 mr-4">
              <button className="poCardSubBtn mb-3">
                {eachMyPo.po.category_details.name}
              </button>
            </div>
          </div>
          <div className="CardDetails">
            <div className="d-flex">
              <p className="spanItem">
                <span className="spanTittle">{t("Offers Received")} :</span>{" "}
                <span className="output">{eachMyPo.po.count}</span>
              </p>
              <p>
                <span className="spanTittle">{t("Offer Submitted by")}:</span>
                {eachMyPo.po.requester && (
                  <span className="output"> {eachMyPo.po.requester.name}</span>
                )}
                {eachMyPo.po.supplier && (
                  <span className="output"> {eachMyPo.po.supplier.name}</span>
                )}
                {eachMyPo.po.superUser && (
                  <span className="output"> {eachMyPo.po.superUser.name}</span>
                )}
              </p>
            </div>
            <div className="d-flex">
              <p className="spanViewItem">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="me-1 fs-6 me-2"
                  style={{ color: "#cfc9c7" }}
                />
                <span className="spanTittle">{t("PO Start Date")} :</span>
                <span className="output">{eachMyPo.po.start_date}</span>
              </p>
              <p className="spanViewItem">
                <i
                  style={{ color: "#777E90" }}
                  className="bi bi-eye me-2 fs-6"
                ></i>
                <span className="spanTittle">{t("View")}:</span>{" "}
                <span className="output"> nai</span>
              </p>
              <p>
                <i
                  style={{ color: "#777E90" }}
                  className="bi bi-clock me-2 fs-6"
                ></i>
                <span className="spanTittle">{t("Validity")}: </span>{" "}
                <span className="output"> {eachMyPo.po.validity} days</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PoBoxCard;
