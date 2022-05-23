import React from 'react';
import '../../Components/LandingPage/PoCard/PoCard.css';
import shareIcon from '../../images/card/shareIcon.png';
import heart from '../../images/card/Heart.png';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const Card = ({ displayData, searchTerm, displayFilter, eachBox }) => {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const { pathname } = useLocation();

  return (
    <div>
      <>
        <div className='row'>
          {searchTerm && searchTerm.length > 1
            ? displayFilter &&
            displayFilter.map((d) => (
              <div
                className={`banner ${pathname === `/posearch`
                  ? 'col-md-4 col-xl-4 col-sm-6 col-lg-4 col-xs-12'
                  : 'col-md-6 col-xl-3 col-sm-6 col-lg-4 col-xs-12'
                  }`}>
                <div className='po-card'>
                  <div className='justify-content-between d-flex'>
                    <button className='poNo'>
                      {t('PO NO')}: {d.offer}
                    </button>

                    <div>
                      <img className='shareIcon' src={shareIcon} alt='shareIcon' />
                      <img
                        style={{ margin: '0 0 0 25px!important' }}
                        src={heart}
                        alt='shareIcon'
                      />
                    </div>
                  </div>

                  <div className=' d-flex flex-row justify-content-between titleBox'>
                    <div className=' d-flex flex-row'>
                      <button className='pmd-avatar-list-img'>
                        <img
                          src='http://propeller.in/components/list/img/40x40.png'
                          className='avatar'
                          width='40'
                          height='40'
                          alt='po-avatar'
                          circle
                        />
                      </button>
                      <div className='media-body'>
                        <p className='cardTitle'>{d.createdBy}</p>
                        <p className='cardSubtitle'>{d.city}</p>
                      </div>
                    </div>

                    <div>
                      <p className='rating d-flex justify-content-end'>5.0</p>
                      {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                          <button
                            type='button'
                            key={index}
                            className={index <= rating ? 'on' : 'off'}
                            onClick={() => setRating(index)}>
                            <span className='star'>&#9733;</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className='cardBody'>
                    <button className='card-subtitle-button mb-3'>{d.Title}</button>
                    <p className='card-texts'>{d.subtitle}</p>
                  </div>
                  <hr />

                  <div className='d-flex justify-content-between viewsBox'>
                    <p>
                      <span className='spanTittle'>Views:</span>{' '}
                      <span className='output'>{d.View}</span>
                    </p>
                    <p>
                      <span className='spanTittle'>Validity:</span>{' '}
                      <span className='output'>{d.validity} days</span>
                    </p>
                  </div>
                </div>
              </div>
            ))
            : displayData &&
            displayData.map((d) => (
              <div
                className={`banner ${pathname === `/myPo`
                  ? 'col-md-4 col-xl-4 col-sm-6 col-lg-4 col-xs-12'
                  : pathname === `/requester`
                    ? 'col-md-4 col-xl-4 col-sm-6 col-lg-4 col-xs-12'
                    : pathname === `/posearch`
                      ? 'col-md-4 col-xl-4 col-sm-6 col-lg-4 col-xs-12'
                      : 'col-md-6 col-xl-3 col-sm-6 col-lg-4 col-xs-12'
                  }`}>
                <div className='po-card'>
                  <div className='justify-content-between d-flex'>
                    <button className='poNo'>
                      {t('PO NO')}: {d.offer}
                    </button>

                    <div>
                      <img className='shareIcon' src={shareIcon} alt='shareIcon' />
                      <img
                        style={{ margin: '0 0 0 25px!important' }}
                        src={heart}
                        alt='shareIcon'
                      />
                    </div>
                  </div>

                  <div className=' d-flex flex-row justify-content-between titleBox'>
                    <div className=' d-flex flex-row'>
                      <button className='pmd-avatar-list-img'>
                        <img
                          src='http://propeller.in/components/list/img/40x40.png'
                          className='avatar'
                          width='40'
                          height='40'
                          alt='po-avatar'
                          circle
                        />
                      </button>
                      <div className='media-body'>
                        <p className='cardTitle'>{d.createdBy}</p>
                        <p className='cardSubtitle'>{d.city}</p>
                      </div>
                    </div>

                    <div>
                      <p className='rating d-flex justify-content-end'>5.0</p>
                      {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                          <button
                            type='button'
                            key={index}
                            className={index <= rating ? 'on' : 'off'}
                            onClick={() => setRating(index)}>
                            <span className='star'>&#9733;</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className='cardBody'>
                    <button className='card-subtitle-button mb-3'>{d.Title}</button>
                    <p className='card-texts'>{d.subtitle}</p>
                  </div>
                  <hr />

                  <div className='d-flex justify-content-between viewsBox'>
                    <p>
                      <span className='spanTittle'>Views:</span>{' '}
                      <span className='output'>{d.View}</span>
                    </p>
                    <p>
                      <span className='spanTittle'>Validity:</span>{' '}
                      <span className='output'>{d.validity} days</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </>
    </div>
  );
};

export default Card;
