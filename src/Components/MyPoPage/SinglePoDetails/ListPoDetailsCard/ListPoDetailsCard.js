import React, { useEffect, useState } from 'react';
import './ListPoDetailsCard.css';
import shareIcon from '../../../../images/singlePoDetails/shareBtn.png';
import emailIcon from '../../../../images/registration/Email.png';
import deleteIcon from '../../../../images/singlePoDetails/deleteIcon.png';
import fileIcon from '../../../../images/singlePoDetails/fileAttachmentIcon.png';
import { useDispatch, useSelector } from 'react-redux';
import { GetSinglePoDetails, singlePoDetailsDelete } from '../../_redux/Action';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { WindowTwoTone } from '@mui/icons-material';
import Axios from 'axios';
import fileDownload from 'js-file-download';
import { showToast } from '../../../../utils/ToastHelper';
import { useTranslation } from 'react-i18next';
import { Rating } from '@mui/material';

const ListPoDetailsCard = () => {
  const { t } = useTranslation();
  // single po details data section
  const singlePoDetailsData = useSelector((state) => state.myPoInfo.singlePoDetailsData);

  // my po details delete data section
  const isSinglePoDetailsDeleted = useSelector((state) => state.myPoInfo.isSinglePoDetailsDeleted);
  //dispatching single po details Data

  let { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetSinglePoDetails(id));
  }, [id]);

  //handle details page delete
  const history = useHistory();

  const handleDeleteSinglePoDetails = (id) => {
    dispatch(singlePoDetailsDelete(id));
    history.go(-1);
  };

  // Start file download.

  //download block by cors policy

  const startDownload = (e) => {
    const url = `${e}`;
    const filename = `${e.split('/').pop()}`;

    Axios.get(url, {
      responseType: 'blob',
    }).then((res) => {
      fileDownload(res.data, filename);
    });
  };

  const shareDocument = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('success', 'Copied! Share Now..');
  };

  return (
    <>
      {singlePoDetailsData && (
        <div className='poDetailsBoxCard'>
          <div className='row  '>
            <div className='justify-content-between d-flex horizontalLine'>
              <h3 className='poDetailsTitle'>{t('PO Details')}</h3>
              <div className='d-flex justify-content-around'>
                <button className='poNo customRadius '>
                  {t('PO NO')}:{singlePoDetailsData.po_no}
                </button>

                <img
                  onClick={shareDocument}
                  className='customRoundIcon'
                  src={shareIcon}
                  alt='shareIcon1'
                />

                <img
                  onClick={() => handleDeleteSinglePoDetails(id)}
                  className='customRoundIcon1'
                  src={deleteIcon}
                  alt='shareIcon1'
                />
              </div>
            </div>

            <div className='col-sm-12 col-md-8 verticalLine1'>
              <div className='justify-content-between'>
                <h3 className='PoBoxTitle'>{singlePoDetailsData.title}</h3>
                <p className='Po_sub_title2'> {singlePoDetailsData.description}</p>
              </div>
              <div className=' d-flex img-upload'>
                {/* d-flex img-upload mr-3 */}
                <div className='d-sm-flex '>
                  {singlePoDetailsData.po_attachment &&
                    singlePoDetailsData.po_attachment.map((attachItem) => (
                      <ul className=' pl-0' key={Math.random()}>
                        <li className='d-flex align-items-center'>
                          <img src={fileIcon} alt='' height='13px' width='12px' />

                          <Link>
                            <p
                              onClick={() => startDownload(attachItem.attachment)}
                              className='uploadedImageLabel mb-0 me-3'>
                              {attachItem.attachment.split('/').pop()}
                            </p>
                          </Link>
                        </li>
                      </ul>
                    ))}
                </div>
              </div>

              <div className='cardBoxBody row'>
                {singlePoDetailsData.po_item_list &&
                  true &&
                  singlePoDetailsData.po_item_list.length > 0 &&
                  singlePoDetailsData.po_item_list.map((eachPoItem, index) => (
                    <div key={index} className='col-md-3 mr-4'>
                      <button className='singleItemBoxName2 mb-3'>{eachPoItem.title}</button>
                    </div>
                  ))}
              </div>
            </div>

            <div className='col-sm-12 col-md-4 poCardPart2 before_verticalLine'>
              <p className='poDetailsItem'>
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className='me-2 fs-6 '
                  style={{ color: '#cfc9c7' }}
                />
                <span className='spanTittle'>{t('PO Start Date')}:</span>{' '}
                <span className='output'>{singlePoDetailsData.start_date}</span>
              </p>

              <p className='poDetailsItem'>
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className='me-2 fs-6 '
                  style={{ color: '#cfc9c7' }}
                />
                <span className='spanTittle'>{t('PO End Date')}:</span>{' '}
                <span className='output'>{singlePoDetailsData.end_date} </span>
              </p>

              <p className='poDetailsItem'>
                <i style={{ color: '#777E90' }} className='bi bi-clock me-2 fs-6'></i>
                <span className='spanTittle'>{t('Rest Days For PO Expiry')}: </span>{' '}
                <span className='output'>4Days</span>
              </p>

              <p className='poDetailsItem'>
                <i style={{ color: '#777E90' }} className='bi bi-credit-card  me-2 fs-6'></i>
                <span className='spanTittle'>{t('Payment')}:</span>{' '}
                <span className='output'>
                  {singlePoDetailsData.payment_method === 1
                    ? t('Credit Card')
                    : singlePoDetailsData.payment_method === 2
                      ? t('Paypal')
                      : t('Cash')}
                </span>
              </p>

              <p className='poDetailsItem'>
                <i style={{ color: '#777E90' }} className='bi bi-geo-alt me-2 fs-6'></i>
                <span className='spanTittle'>{t('Delivery place')}:</span>{' '}
                <span className='output'>{singlePoDetailsData.delivery_place}</span>
              </p>

              <p className='poDetailsItem'>
                <i
                  style={{ color: '#777E90' }}
                  className='bi bi-file-earmark-arrow-down fs-6 me-2'></i>
                <span className='spanTittle'>{t('Offers Received')}</span>{' '}
                <span className='output'>44</span>
              </p>

              <p className='poDetailsItem'>
                <i style={{ color: '#777E90' }} className='bi bi-clock me-2 fs-6'></i>
                <span className='spanTittle'>{t('Validity')}:</span>{' '}
                <span className='output'>{singlePoDetailsData.validity}</span>
              </p>

              <p className='poDetailsItem'>
                <i style={{ color: '#777E90' }} className='bi bi-file-earmark-text fs-6 me-2'></i>
                <span className='spanTittle'>{t('PO Created by')}: </span>{' '}
                <span className='output'>{singlePoDetailsData?.requester?.name}</span>
              </p>
              <p className='poDetailsItem'>
                <i style={{ color: '#777E90' }} className='bi bi-eye me-2 fs-6'></i>
                <span className='spanTittle'>{t('Views')}: </span>{' '}
                <span className='output'>{singlePoDetailsData.count}</span>
              </p>
            </div>
          </div>
        </div>
      )}



      {singlePoDetailsData && (
        <div className='listContainer'>
          <div className='p-4 d-flex flex-column gap-1 mx-2'>
            <h4 className='pb-3'>About Requester</h4>

            <div className='d-flex justify-content-between'>
              <div className='d-flex gap-3'>
                <img
                  src={
                    singlePoDetailsData?.requester?.profile_picture?.image ||
                    'http://propeller.in/components/list/img/40x40.png'
                  }
                  className='avatar_2'
                  width='40'
                  height='40'
                  alt='po-avatar'
                  circle
                />

                <div>
                  <h6 className='fw-bold'>{singlePoDetailsData?.requester?.name}</h6>
                  <p className='text-small text-muted'>
                    {singlePoDetailsData?.requester?.nationality}
                  </p>
                </div>
              </div>

              <a href={`mailto: ${singlePoDetailsData?.requester?.email}`}>
                <img
                  className='rounded-circle border-muted border border-2 p-2 pointer'
                  src={emailIcon}
                  alt='Email'
                  height={40}
                  width={40}
                />
              </a>
            </div>

            <div className='d-flex gap-2'>
              <p className='fw-bold'>{singlePoDetailsData?.requester?.rating_as_supplier}</p>
              <p>({singlePoDetailsData?.requester?.supplier_rating_count} Reviews)</p>
              <Rating
                name='read-only'
                value={singlePoDetailsData?.requester?.rating_as_supplier || 0}
                readOnly
              />
            </div>

          
          </div>

          <hr />

          <div>
            <h4 className='infoTitle' style={{ marginTop: '30px', marginBottom: '30px' }}>
              {t('List of Items')}
            </h4>

            <div>
              {singlePoDetailsData.po_item_list &&
                singlePoDetailsData.po_item_list.map((poEachItem, index) => (
                  <div className='singleListItemCard'>
                    <div className='justify-content-between' key={index}>
                      <h3 className='PoBoxTitle' style={{ marginLeft: '20px' }}>
                      
                        {poEachItem.title}
                      </h3>

                      <p className='singleItemSubTitle'>{poEachItem.description}</p>
                      <div className='pendingPoUl'>
                        <ul>
                          <li>
                          
                            <span
                              className='itemTitle '
                              style={{ fontWeight: 'bold', marginRight: '0' }}>
                              {t('Quantity')} -
                            </span>{' '}
                            <span className='poItemQuant'>{poEachItem.quantity}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className='cardBoxBody d-flex'>
                      <button className='singleItemNameBox mb-3'>{poEachItem.subcategory} </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          
        </div>
      )}
    </>
  );
};

export default ListPoDetailsCard;
