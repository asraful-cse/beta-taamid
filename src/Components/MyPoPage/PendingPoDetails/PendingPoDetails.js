import React, { useState } from "react";
import "./PendingPoDetails.css";
import mailIcon from "../../../SupplierComponents/images/reviewPage/mailIcon.png";
import printIcon from "../../../SupplierComponents/images/reviewPage/printIcon.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const PendingPoDetails = ({ pendingPoDetailsInfo }) => {
  const { t } = useTranslation();
  const items = [1, 2, 3, 4];
  const [rating, setRating] = useState(0);

  // print function
  console.log(pendingPoDetailsInfo, "pendingPoDetailsInfo");
  const print = () => {
    window.print();
  };

  return (
    <>
      {pendingPoDetailsInfo && (
        <div className="container">
          <div className="pendingItemBoxCard">
            <div className=" d-flex flex-row justify-content-between">
              <div className="d-flex flex-row">
                <div>
                  <div className="d-flex">
                    <button>
                      <img
                        src="http://propeller.in/components/list/img/40x40.png"
                        className="avatar"
                        width="40"
                        height="40"
                        alt="avatarCircle"
                        circle
                      />
                    </button>
                    <div>
                      {pendingPoDetailsInfo && (
                        <div>
                          {pendingPoDetailsInfo.supplier && (
                            <p
                              className="cardTitle"
                              style={{ color: " #23262F" }}
                            >
                              {pendingPoDetailsInfo.po.requester.name}
                            </p>
                          )}
                        </div>
                      )}

                      <p className="cardSubtitle" style={{ color: " #23262F" }}>
                        Riyadh
                      </p>
                    </div>
                  </div>

                  <div className="media-body d-flex">
                    <span className="ratingForPendingPoItem ">
                      5.0 (40 reviews)
                    </span>
                    {[...Array(5)].map((star, index) => {
                      index += 1;
                      return (
                        <button
                          type="buttonForStar"
                          key={index}
                          className={index <= rating ? "on" : "off"}
                          onClick={() => setRating(index)}
                        >
                          <span className="star">&#9733;</span>
                        </button>
                      );
                    })}
                  </div>
                  {pendingPoDetailsInfo && (
                    <p
                      className="singleItemSubTitle"
                      style={{ marginLeft: "0px" }}
                    >
                      {pendingPoDetailsInfo.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="d-flex align-items-start">
                <div className="roundedIcon1 roundedIcon2">
                  <Link
                    to={`/messageCenter/${pendingPoDetailsInfo.supplier.company}`}
                  >
                    <img
                      className="mailPrintIcon"
                      src={mailIcon}
                      alt="mailPrintIcon1"
                    />
                  </Link>
                </div>

                <div className="roundedIcon1 roundedIcon3">
                  <img
                    className="mailPrintIcon"
                    onClick={print}
                    src={printIcon}
                    alt="mailPrintIcon2"
                  />
                </div>
              </div>
            </div>
            <hr style={{ marginBottom: "30px", border: "1px solid #E6E8EC" }} />
            <div className="singleListItemCard m-auto">
              {pendingPoDetailsInfo &&
                pendingPoDetailsInfo.po.po_item_list &&
                pendingPoDetailsInfo.po.po_item_list.map((item) => (
                  <div>
                    <div className="justify-content-between">
                      <h3 className="PoBoxTitle" style={{ marginLeft: "20px" }}>
                        {item.title}
                      </h3>
                      <p className="singleItemSubTitle">{item.description}</p>
                    </div>
                    <div className="pendingPoUl">
                      <ul>
                        <li>
                          <span
                            className="itemTitle "
                            style={{ fontWeight: "bold", marginRight: "0" }}
                          >
                            {t("Quantity")}-{" "}
                            <span className="poItemQuant">{item.quantity}</span>
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="cardBoxBody d-flex">
                      <button className="singleItemNameBox mb-3">
                        {item.subcategory}
                      </button>
                    </div>

                    <hr style={{ border: "1px solid #E6E8EC" }} />
                    <div className="pendingPoUl">
                      <ul>
                        <li>
                          <span
                            className="itemTitle "
                            style={{ fontWeight: "bold", marginRight: "0" }}
                          >
                            {t("Name")}-
                          </span>{" "}
                          <span className="itemTitle">{item.title}</span>
                        </li>
                        <li>
                          <span
                            className="itemTitle "
                            style={{ fontWeight: "bold", marginRight: "0" }}
                          >
                            {t("Attachment")}-
                          </span>{" "}
                          <span className="itemTitle">{item.title}</span>
                        </li>
                        <li>
                          <span
                            className="itemTitle "
                            style={{ fontWeight: "bold", marginRight: "0" }}
                          >
                            {t("Description")}-
                          </span>{" "}
                          <span className="itemTitle">{item.title}</span>
                        </li>
                        <li>
                          <span
                            className="itemTitle "
                            style={{ fontWeight: "bold", marginRight: "0" }}
                          >
                            {t("Unit Price")}-
                          </span>{" "}
                          <span className="itemTitle">{item.title}</span>
                        </li>
                        <li>
                          <span
                            className="itemTitle "
                            style={{ fontWeight: "bold", marginRight: "0" }}
                          >
                            {t("Total Price")}-
                          </span>{" "}
                          <span className="itemTitle">{item.title}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
            <div className="singleListItemCard pendingDetailsTotalCard m-auto">
              <h2 className="grandTotal">
                {t("Grand Total - SAR")} {pendingPoDetailsInfo.grand_total}
                <span className="vatCaption"> *VAT Exclusive</span>
              </h2>
            </div>
            <div className="totalContainer d-flex justify-content-end">
              {/*<div>*/}
              {/*    <button className='completeBtn ' type="button"> Complete</button>*/}
              {/*</div>*/}
              <div>
                <button className="completeBtn  " type="button">
                  {t("Decline ")}
                </button>
              </div>
              <div>
                <button className="completeBtn " type="button">
                  {t("Accept")}
                </button>
              </div>
            </div>
          </div>

          {/*<div>*/}
          {/*    <RatingReview></RatingReview>*/}
          {/*</div>*/}
        </div>
      )}
    </>
  );
};

export default PendingPoDetails;
