import React, { useEffect } from "react";
import ListPoDetailsCard from "../../SinglePoDetails/ListPoDetailsCard/ListPoDetailsCard";
import PendingPoDetails from "../PendingPoDetails";
import shareIcon from "../../../../images/singlePoDetails/shareBtn.png";
import deleteIcon from "../../../../images/singlePoDetails/deleteIcon.png";
import fileIcon from "../../../../images/singlePoDetails/fileAttachmentIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  GetLatestPoData,
  GetOfferDetailsPage,
  GetSinglePoDetails,
  singlePoDetailsDelete,
} from "../../_redux/Action";

const PendingPoDetailsPage = () => {
  const { t } = useTranslation();
  const pendingPoDetailsInfo = useSelector(
    (state) => state.myPoInfo.offerDetailsData
  );

  // my po details delete data section
  const isSinglePoDetailsDeleted = useSelector(
    (state) => state.myPoInfo.isSinglePoDetailsDeleted
  );

  //dispatching single po details Data

  let { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetOfferDetailsPage(id));
  }, [id]);

  //handle details page delete
  const history = useHistory();

  const handleDeleteSinglePoDetails = (id) => {
    dispatch(singlePoDetailsDelete(id));
 

    // history.go(-1);
  };

  return (
    <div className="container">
      {pendingPoDetailsInfo && (
        <div className="poDetailsBoxCard">
          <div className="row  ">
            <div className="justify-content-between d-flex horizontalLine">
              <h3 className="poDetailsTitle">{t("PO Details")}</h3>
              <div className="d-flex justify-content-around">
                <button className="poNo customRadius">
                  {t("PO NO")}:{pendingPoDetailsInfo.po.po_no}
                </button>
                <img
                  className="customRoundIcon"
                  src={shareIcon}
                  alt="shareIcon1"
                />

                <img
                  onClick={() => handleDeleteSinglePoDetails(id)}
                  className="customRoundIcon1"
                  src={deleteIcon}
                  alt="shareIcon1"
                />
              </div>
            </div>

            <div className="col-md-8 col-sm-12 verticalLine1">
              <div className="justify-content-between">
                <h3 className="PoBoxTitle">{pendingPoDetailsInfo.po.title}</h3>
                <p className="poSubTitle2">
                  {" "}
                  {pendingPoDetailsInfo.po.description}
                </p>
              </div>
              <div className=" d-flex img-upload">
                <div className="d-flex img-upload mr-3">
                  {pendingPoDetailsInfo.po.po_attachment &&
                    pendingPoDetailsInfo.po.po_attachment.map((attachItem) => (
                      <>
                        <label className="sPFile" htmlFor="file">
                          <img src={fileIcon} alt="fileIcon-img" />
                        </label>
                        <p className="uploadedImageLabel">
                          {attachItem.attachment}
                        </p>
                      </>
                    ))}
                </div>
              </div>

              <div className="cardBoxBody row">
                {pendingPoDetailsInfo.po.po_item_list &&
                  true &&
                  pendingPoDetailsInfo.po.po_item_list.length > 0 &&
                  pendingPoDetailsInfo.po.po_item_list.map(
                    (eachPoItem, index) => (
                      <div key={index} className="col-md-3 mr-4">
                        <button className="singleItemBoxName2 mb-3">
                          {eachPoItem.title}
                        </button>
                      </div>
                    )
                  )}
              </div>
            </div>

            <div className="col-md-4 col-sm-12 poCardPart2 before_verticalLine">
              <p className="poDetailsItem">
                {" "}
                <span>
                  <img
                    className="custDividerMargin"
                    src={fileIcon}
                    alt="fileIcon1"
                  />
                </span>
                <span className="spanTittle">{t("PO Start Date")}:</span>{" "}
                <span className="output">
                  {pendingPoDetailsInfo.po.start_date}
                </span>
              </p>
              <p className="poDetailsItem">
                <span>
                  <img
                    className="custDividerMargin"
                    src={fileIcon}
                    alt="fileIcon8"
                  />
                </span>
                <span className="spanTittle">{t("PO End Date")}:</span>{" "}
                <span className="output">
                  {pendingPoDetailsInfo.po.end_date}{" "}
                </span>
              </p>

              <p className="poDetailsItem">
                <span>
                  <img
                    className="custDividerMargin"
                    src={fileIcon}
                    alt="fileIcon2"
                  />
                </span>
                <span className="spanTittle">{t("Rest Days For PO Expiry")}: </span>{" "}
                <span className="output">4Days</span>
              </p>
              <p>
                <span>
                  <img
                    className="custDividerMargin"
                    src={fileIcon}
                    alt="fileIcon3"
                  />
                </span>
                <span className="spanTittle">{t("Payment")}</span>
                {pendingPoDetailsInfo.offer_payment == 1 ? (
                  <span className="output"> {t("Credit Card")}</span>
                ) : pendingPoDetailsInfo.offer_payment == 2 ? (
                  <span className="output"> {t("Paypal")}</span>
                ) : (
                  <span className="output">{t("Cash")}</span>
                )}
              </p>
              <p className="poDetailsItem">
                <span>
                  <img
                    className="custDividerMargin"
                    src={fileIcon}
                    alt="fileIcon4"
                  />
                </span>
                <span className="spanTittle">{t("Delivery place")} d:</span>{" "}
                <span className="output">
                  {pendingPoDetailsInfo.po.delivery_place}
                </span>
              </p>
              <p className="poDetailsItem">
                <span>
                  <img
                    className="custDividerMargin"
                    src={fileIcon}
                    alt="fileIcon4"
                  />
                </span>
                <span className="spanTittle">{t("Offers Received")}</span>{" "}
                <span className="output">44</span>
              </p>
              <p className="poDetailsItem">
                <span>
                  <img
                    className="custDividerMargin"
                    src={fileIcon}
                    alt="fileIcon5"
                  />
                </span>
                <span className="spanTittle">{t("Validity")}:</span>{" "}
                <span className="output">
                  {pendingPoDetailsInfo.po.validity}
                </span>
              </p>
              <p className="poDetailsItem">
                <span>
                  <img
                    className="custDividerMargin"
                    src={fileIcon}
                    alt="fileIcon6"
                  />
                </span>
                <span className="spanTittle">{t("PO Created by")}: </span>{" "}
                <span className="output">Nai</span>
              </p>
              <p className="poDetailsItem">
                <span>
                  <img
                    className="custDividerMargin"
                    src={fileIcon}
                    alt="fileIcon6"
                  />
                </span>
                <span className="spanTittle">{t("Views")}: </span>{" "}
                <span className="output">{pendingPoDetailsInfo.po.count}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      <PendingPoDetails pendingPoDetailsInfo={pendingPoDetailsInfo} />
    </div>
  );
};

export default PendingPoDetailsPage;
