import React from "react";
import "../../Components/MyPoPage/PoBoxCard/PoBoxCard.css";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { showToast } from "../../utils/ToastHelper";
import FavoratePOComponent from "../../Components/favoratePOComponent/FavoratePOComponent";
import shareIcon from "../../images/card/shareIcon.png";

// import heart from "../../../images/card/Heart.png";
const Box = ({ displayData, searchTerm, eachMyPo }) => {
  const { t } = useTranslation();
  const shareDocument = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("success", "Copied! Share Now..");
  };
  return (
    <div className="poSearchBoxContainer">
      <div className="poBoxCard">
        <div className="justify-content-between d-flex">
          <button className="poNo">
            {t("PO NO")}: {eachMyPo.po_no}
          </button>
          <div className="d-flex justify-content-between align-items-center">
            <div
              className="iconRound"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E6E8EC",
                borderRadius: "30px",
                padding: "6px",
                marginRight: "20px",
              }}
            >
              <img
                onClick={shareDocument}
                className="share_2 "
                src={shareIcon}
                alt="shareIcon"
              />
            </div>
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E6E8EC",
                borderRadius: "30px",
                padding: '6px 2px 8px 1px'
              }}
            >
              <FavoratePOComponent className="imageStyle" po={eachMyPo} />
            </div>
          </div>
        </div>
        <Link to={`/poDetailsView/${eachMyPo.id}`}>
          <div className="justify-content-between">
            <h3 className="PoBoxTitle">{eachMyPo.title}</h3>
            <p className="PoSubTitle">{eachMyPo.description}</p>
          </div>

          <div className="cardBoxBody">
            <button className="poCardSubBtn mb-3">
              {t("Office Accessories")}{" "}
            </button>
            <button className="poCardSubBtn mb-3">Office Accessories</button>
          </div>
          <div className="CardDetails">
            <div className="d-flex">
              <p className="spanItem">
                <span className="spanTittle">{t("Offers Received")}:</span>{" "}
                <span className="output">15</span>
              </p>
              <p>
                <span className="spanTittle">{t("PO Created by")}:</span>{" "}
                <span className="output"> Shan colman</span>
              </p>
            </div>
            <div className="d-flex ">
              <p className="spanViewItem">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="me-2 fs-6 "
                  style={{ color: "#cfc9c7" }}
                />
                <span className="spanTittle">{t("PO Start Date")}: </span>{" "}
                <span className="output"> July 28, 2021</span>
              </p>
              <p className="spanViewItem">
                <i
                  style={{ color: "#777E90" }}
                  className="bi bi-eye me-2 fs-6"
                ></i>
                <span className="spanTittle">{t("View")}:</span>{" "}
                <span className="output"> 25</span>
              </p>
              <p>
                <i
                  style={{ color: "#777E90" }}
                  className="bi bi-clock me-2 fs-6"
                ></i>
                <span className="spanTittle">{t("Validity")}: </span>{" "}
                <span className="output"> 04 days</span>
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Box;
