import React, { useEffect, useState } from "react";
import axios from "axios";
import isEmpty from "../../../utils/isEmpty";
import { Link, useParams } from "react-router-dom";
import "../../../Components/MyPoPage/PendingPoDetails/PendingPoDetails.css";
import "../../SupplierPoDetailsView/SupplierPoDetails.css";
import CrossIcon from "../../../images/fileIcons/crossFile.png";
import OfferedPOItem from "../components/OfferedPOItem";
import Requester from "../components/Requester";
import PoDetails from "../components/PoDetails";
import { useTranslation } from "react-i18next";
const SupplierAcceptedOfferDetails = () => {
  const [loading, loadingSet] = useState(false);
  const [error, errorSet] = useState("");
  const [itemDetails, itemDetailsSet] = useState([]);
   
  const { id } = useParams();
  const { t } = useTranslation();
  const getPOItemDetails = async (item) => {
    const apiUrl = "https://dev.taamid.com/api/offer_details";

    try {
      loadingSet(true);
      errorSet("");
      const response = await axios.get(`${apiUrl}/${item}`);

      if (response.data?.data) {
        loadingSet(false);
        itemDetailsSet(response.data?.data);
      }

      if (isEmpty(response.data?.data)) {
        loadingSet(false);
        itemDetailsSet([]);
        errorSet(`PO item details is not available!`);
      }
    } catch (responseError) {
      loadingSet(false);
    }
  };

  useEffect(() => {
    getPOItemDetails(id);
  }, [id]);

  return (
    <>
      <div className="container">
        {loading && (
          <div className="d-flex justify-content-center my-3">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div
            className="alert alert-warning d-flex justify-content-center align-items-center my-2"
            role="alert"
          >
            <svg
              className="bi flex-shrink-0 me-2"
              width="24"
              height="24"
              role="img"
              aria-label="Warning:"
            ></svg>
            <div>{error}</div>
          </div>
        )}

        {itemDetails && (
          <>
            <PoDetails item={itemDetails?.po} />

            <div className="listContainer">
              <Requester requester={itemDetails?.po?.requester} />
              <hr />
              <OfferedPOItem
                poItem={itemDetails?.po?.po_item_list}
                offerItem={itemDetails?.offer_details}
              />

              <div
                className="p-2 bg-white border rounded-lg mx-4 mb-4"
                style={{ borderColor: "#E6E8EC" }}
              >
                <h2 className="grandTotal">
                  {t("Grand Total - SAR")} {itemDetails?.grand_total}
                  <span className="vatCaption"> *VAT Exclusive</span>
                </h2>
              </div>
            </div>

            <div
              className="bg-white border rounded-lg py-4 my-4"
              style={{ borderColor: "#E6E8EC" }}
            >
              <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                <img
                  src={CrossIcon}
                  alt="Order Cancelled"
                  height={50}
                  width={50}
                />
                <p className="fw-bold">Sorry! Your offer has been declined!</p>
                <div className="d-flex gap-2">
                  <button
                    className="btn border border-success rounded-pill p-2 px-4 text-success"
                    disabled
                  >
                    Cancel Offer
                  </button>

                  <Link to={`/poDetailsView/${itemDetails?.id}`}>
                    <button className="btn border border-success rounded-pill p-2 px-4 text-white bg-success">
                      Resubmit
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SupplierAcceptedOfferDetails;
