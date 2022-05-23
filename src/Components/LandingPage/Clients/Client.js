import React, { useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel';
import './Clients.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPartnerList } from '../_redux/Action';

const Client = () => {
  let option = {
    responsive: {
      0: {
        items: 2,
      },
      450: {
        items: 3,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 5,
      },
    },
  };

  const partnerInfo = useSelector((state) => state.landingInfo.partnerSliderData);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPartnerList());
  }, [dispatch]);

  return (
    <>
      {partnerInfo && (
        <OwlCarousel
          loop
          margin={10}
          items={6}
          dots={false}
          autoplay
          {...option}
          className='d-flex justify-content-center align-items-center owl-theme logoNewTheme'>
          {partnerInfo.map((eachPartner, index) => {
            return (
              <>
                <div className='item' key={index}>
                  <img src={eachPartner.image} alt={eachPartner.company_name} />
                </div>
              </>
            );
          })}
        </OwlCarousel>
      )}
    </>
  );
};

export default Client;
