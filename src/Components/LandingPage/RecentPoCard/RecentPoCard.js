import React, { useState } from "react";
import "./RecentPoCard.css";
import shareIcon from "../../../images/card/shareIcon.png";
import heart from "../../../images/card/Heart.png";
import { Link, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FavoratePOComponent from '../../favoratePOComponent/FavoratePOComponent';
import { showToast } from "../../../utils/ToastHelper";

const RecentPoCard = ({ eachMyPo }) => {
  
  const [rating, setRating] = useState(0);
  const { t } = useTranslation();
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
            ? 'col-md-4 col-xl-4 col-sm-6 col-lg-3 col-xs-12'
            : pathname === `/requester`
              ? 'col-md-4 col-xl-4 col-sm-6 col-lg-4 col-xs-12'
              : pathname === `/posearch/${catId}`
                ? 'col-md-4 col-xl-4 col-sm-6 col-lg-4 col-xs-12'
                : 'col-md-6 col-xl-3 col-sm-6 col-lg-4 col-xs-12'
            }`}>
          <div className='PoCardDesign ml-0 '>
            <div className=' RecPo-card '>
              {/* <div className="po-card "> */}
              <div className="justify-content-between d-flex">
                <button className="RecentPoNo">
                  {t("Po No")}:{eachMyPo.po_no}
                </button>

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

              <div className=' d-flex flex-row justify-content-between RecTitleBox'>
                <div className=' d-flex np'>
                  <button className='pmd-avatar-list-img' id='loveAvatar'>
                    <img
                      src='http://propeller.in/components/list/img/40x40.png'
                      className=' avatar_2'
                      width='40'
                      height='40'
                      alt='po-avatar'
                      circle
                    />
                  </button>
                  <div className='media-body'>
                    <div className='d-flex justify-content-between'>
                      {eachMyPo.requester && (
                        <p className='RecCardTitle2'> {eachMyPo.requester.name}</p>
                      )}
                    </div>
                    <p className='RecCardSubtitle'>{eachMyPo.delivery_place}</p>
                  </div>
                </div>

                <div className='RecStar'>
                  {eachMyPo.requester && (
                    <p className='RecRating d-flex justify-content-end'>
                      {' '}
                      {eachMyPo.requester.rating_as_requester}
                    </p>
                  )}
                  {eachMyPo.supplier && (
                    <p className='RecRating d-flex justify-content-end'>
                      {' '}
                      {eachMyPo.supplier.rating_as_supplier}
                    </p>
                  )}

                  {eachMyPo.superUser && (
                    <p className='RecRating d-flex justify-content-end'>
                      {' '}
                      {eachMyPo.superUser.rating_as_requester}
                    </p>
                  )}

                  {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                      <button
                        type='button'
                        key={index}
                        className={index <= rating ? 'on' : 'off'}
                        onClick={() => setRating(index)}>
                        <span className='RecStar'>&#9733;</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="cardBody row">
                <div className="col-md-12 mt-4">
                  <button className="RecCard-subtitle-button mb-3">
                    {eachMyPo.category_details.name}
                  </button>
                </div>
                <p className="RecentPoDescription">{eachMyPo.description}</p>
              </div>
              <hr className='line_width' />

              <div className='d-flex justify-content-between viewsBox'>
                <p>
                  <span className='RecSpanTittle'> {t("Views")} : </span>{' '}
                  <span className='RecOutput'> nai</span>
                </p>
                <p>
                  <span className='RecSpanTittle'>{t("Validity")} : </span>{' '}
                  <span className='RecOutput'> {eachMyPo.validity} {t("days")}</span>
                </p>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecentPoCard;
