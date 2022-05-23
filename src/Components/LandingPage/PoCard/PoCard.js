import React, { useState } from "react";
import "./PoCard.css";
import shareIcon from "../../../images/card/shareIcon.png";
import heart from "../../../images/card/Heart.png";
import redHeart from "../../../images/card/filledHeart.png";
import { useParams, useLocation, Link } from "react-router-dom";
import FavoratePOComponent from "../../favoratePOComponent/FavoratePOComponent";
import { showToast } from "../../../utils/ToastHelper";

const PoCard = ({ eachMyPo, isFavorite = false }) => {
  const [rating, setRating] = useState(0);
  const { catId } = useParams();
  const { pathname } = useLocation();

  const shareDocument = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('success', 'Copied! Share Now..');
  };

  return (
    <>
      {eachMyPo && (
        <div
          className={`banner  ${pathname === `/myPo`
            ? "col-md-4 col-xl-4 col-sm-6 col-lg-3 col-xs-12"
            : pathname === `/requester`
              ? "col-md-4 col-xl-4 col-sm-6 col-lg-4 col-xs-12"
              : pathname ===
                `/posearch/${catId}`
                ? "col-md-4 col-xl-4 col-sm-6 col-lg-4 col-xs-12"
                : "col-md-6 col-xl-3 col-sm-6 col-lg-4 col-xs-12"
            }`}
        >
          <div className="po-card">
            <div className=" d-flex align-items-center justify-content-between">
              <button className="poNo px-1">PO NO:{eachMyPo.po_no}</button>

                <div className="d-flex justify-content-between align-items-center">
                    <img
                      onClick={shareDocument}
                      className="shareIcon mt-0 me-2"
                      src={shareIcon}
                      alt="shareIcon"
                    />
                    
                    <FavoratePOComponent po={eachMyPo}/>                
                    
                </div>
            </div>

            <Link to={`/singlePoDetails/${eachMyPo.id}`}>
              <div>

                <div className=" d-flex flex-row justify-content-between titleBox">
                  <div className=" d-flex flex-row">
                    <button className="pmd-avatar-list-img" id="loveAvatar">
                      <img
                        src="http://propeller.in/components/list/img/40x40.png"
                        className="avatar"
                        width="40"
                        height="40"
                        alt="po-avatar"
                        circle
                      />
                    </button>
                    <div className="media-body">
                      <div className="d-flex justify-content-between">
                        {eachMyPo.requester && (
                          <p className="cardTitle"> {eachMyPo.requester.name}</p>
                        )}
                        {eachMyPo.supplier && (
                          <span className="cardTitle">
                            {" "}
                            {eachMyPo.supplier.name}
                          </span>
                        )}
                        {eachMyPo.superUser && (
                          <span className="cardTitle">
                            {" "}
                            {eachMyPo.superUser.name}
                          </span>
                        )}
                      </div>
                      <p className="cardSubtitle">{eachMyPo.delivery_place}</p>
                    </div>
                  </div>

                  <div className="star">
                    {eachMyPo.requester && (
                      <p className="rating d-flex justify-content-end">
                        {" "}
                        {eachMyPo.requester.rating_as_requester}
                      </p>
                    )}
                    {eachMyPo.supplier && (
                      <p className="rating d-flex justify-content-end">
                        {" "}
                        {eachMyPo.supplier.rating_as_supplier}
                      </p>
                    )}

                    {eachMyPo.superUser && (
                      <p className="rating d-flex justify-content-end">
                        {" "}
                        {eachMyPo.superUser.rating_as_requester}
                      </p>
                    )}

                    {[...Array(5)].map((star, index) => {
                      index += 1;
                      return (
                        <button
                          type="button"
                          key={index}
                          className={index <= rating ? "on" : "off"}
                          onClick={() => setRating(index)}
                        >
                          <span className="star">&#9733;</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="cardBody row">
                  <div className="col-md-12 mt-4">
                    <button className="card-subtitle-button mb-3">
                      {eachMyPo.category_details.name}
                    </button>
                  </div>
                </div>
                <hr className="line_width" />

                <div className="d-flex justify-content-between viewsBox">
                  <p>
                    <span className="spanTittle"> Views: </span>{" "}
                    <span className="output"> naii</span>
                  </p>
                  <p>
                    <span className="spanTittle">Validity: </span>{" "}
                    <span className="output"> {eachMyPo.validity}days</span>
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default PoCard;
