import React, { useEffect, useState } from 'react';
import '../../Components/MyPoPage/PendingPoDetails/PendingPoDetails.css';
import './SupplierPoDetails.css';
import AcceptedOrders from '../SupplierOrders/AcceptedOrders/AcceptedOrders';
import { useDispatch, useSelector } from 'react-redux';
import { GetStampData } from '../_redux/Action';
import { Link, useParams } from 'react-router-dom';
import { GetSinglePoDetails } from '../../Components/MyPoPage/_redux/Action';
import ToggoleComponent from '../PoDetailsViewPage/ToggoleComponent';
import Axios from 'axios';
import RatingReviewForm from '../../Components/MyPoPage/CompletedPoDetails/RatingReviewForm/RatingReviewForm';
import { showToast } from '../../utils/ToastHelper';
import { Rating } from '@mui/material';
import emailIcon from '../../images/registration/Email.png';
import shareIcon from '../../images/singlePoDetails/shareBtn.png';
import deleteIcon from '../../images/singlePoDetails/deleteIcon.png';
import fileIcon from '../../images/singlePoDetails/fileAttachmentIcon.png';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import fileDownload from 'js-file-download';

const SupplierPoDetailsView = () => {
  const { t } = useTranslation();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const { id } = useParams();

  const [offerCount, setOfferCount] = useState(0);

  const increaseOfferCount = () => {
    setOfferCount(offerCount + 1);
  };

  const decreaseOfferCount = () => {
    setOfferCount(offerCount - 1);
  };

  const [itemData, setItemData] = useState([]);
  const [grandTotal, setgrandTotal] = useState(0);
  const [itemTaken, setItemTaken] = useState([]);
  // const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const getPreferenceData = (params) => {
    setItemData(params)  
    const grandTotalPrice = itemData.map(item => parseInt(item?.total_price)).reduce((prev, curr) => prev + curr, 0);
    setgrandTotal(grandTotalPrice);
};

  const createOffer = async () => {

    const url = `https://dev.taamid.com/api/create_offer/${id}`;
    let payload = {};
    let formData = new FormData();
    itemData.map((data, index) => {
      Object.keys(data).map((key) => {
        payload[`${key}${index + 1}`] = data[key];
      });
    });

    Object.keys(payload).map((key) => {
      formData.append(key, payload[key]);
    });

    formData.append('po_id', id);
    formData.append('offer_item_count', itemData.length);

    try {
      await Axios.post(url, formData).then(async (res) => {
        localStorage.setItem('tran_ref', res.data.data.payment.tran_ref);
        localStorage.setItem('offer_id', res.data.data.payment.cart_id);
        window.location.href = res.data.data.payment.redirect_url;
      });
    } catch (error) {
      if (error.response?.data && Array.isArray(error.response?.data)) {
        error.response.data.map((message2) => {
          let key = Object.keys(message2)[0];

          if (key !== undefined) {
            showToast('error', `${capitalizeFirstLetter(key)} :  ${message2[key][0]}`);
          }
        });
      } else {
        const message = error.response?.data?.message;
        showToast('error', message);
      }
    }
  
  };

  const stampInfo = useSelector((state) => state.supplierInfo.stampData);
  const PoDetailsViewInfo = useSelector((state) => state.myPoInfo.singlePoDetailsData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetSinglePoDetails(id));
  }, [dispatch, id]);

  // dispatching
  useEffect(() => {
    dispatch(GetStampData());
  }, [dispatch]);

  const shareDocument = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('success', 'Copied! Share Now..');
  };

  // const handleDeleteSinglePoDetails = (id) => {
  //   dispatch(singlePoDetailsDelete(id));
  //   console.log(isSinglePoDetailsDeleted);

  //   history.go(-1);
  // };

  const startDownload = (e) => {
    const url = `${e}`;
    const filename = `${e.split('/').pop()}`;

    Axios.get(url, {
      responseType: 'blob',
    }).then((res) => {
      fileDownload(res.data, filename);
    });
  };




  return (
    <>
      {PoDetailsViewInfo && (
        <>
          <div className='container'>
            <div className='poDetailsBoxCard'>
              <div className='row  '>
                <div className='justify-content-between d-flex horizontalLine'>
                  <h3 className='poDetailsTitle'>{t('PO Details')}</h3>
                  <div className='d-flex justify-content-around'>
                    <button className='poNo customRadius '>
                      {t('PO NO')}:{PoDetailsViewInfo?.po_no}
                    </button>

                    <img
                      onClick={shareDocument}
                      className='customRoundIcon'
                      src={shareIcon}
                      alt='shareIcon1'
                    />

                    <img
                      // onClick={() => handleDeleteSinglePoDetails(id)}
                      className='customRoundIcon1'
                      src={deleteIcon}
                      alt='shareIcon1'
                    />
                  </div>
                </div>

                <div className='col-sm-12 col-md-8 verticalLine1'>
                  <div className='justify-content-between'>
                    <h3 className='PoBoxTitle'>{PoDetailsViewInfo?.title}</h3>
                    <p className='Po_sub_title2'> {PoDetailsViewInfo?.description}</p>
                  </div>
                  <div className=' d-flex img-upload'>
                    {/* d-flex img-upload mr-3 */}
                    <div className='d-sm-flex '>
                      {PoDetailsViewInfo?.po_attachment &&
                        PoDetailsViewInfo?.po_attachment.map((attachItem) => (
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
                    {PoDetailsViewInfo?.po_item_list &&
                      true &&
                      PoDetailsViewInfo?.po_item_list.length > 0 &&
                      PoDetailsViewInfo?.po_item_list.map((eachPoItem, index) => (
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
                    <span className='output'>{PoDetailsViewInfo?.start_date}</span>
                  </p>

                  <p className='poDetailsItem'>
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className='me-2 fs-6 '
                      style={{ color: '#cfc9c7' }}
                    />
                    <span className='spanTittle'>{t('PO End Date')}:</span>{' '}
                    <span className='output'>{PoDetailsViewInfo?.end_date} </span>
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
                      {PoDetailsViewInfo?.payment_method === 1
                        ? t('Credit Card')
                        : PoDetailsViewInfo?.payment_method === 2
                          ? t('Paypal')
                          : t('Cash')}
                    </span>
                  </p>

                  <p className='poDetailsItem'>
                    <i style={{ color: '#777E90' }} className='bi bi-geo-alt me-2 fs-6'></i>
                    <span className='spanTittle'>{t('Delivery place')}:</span>{' '}
                    <span className='output'>{PoDetailsViewInfo?.delivery_place}</span>
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
                    <span className='output'>{PoDetailsViewInfo?.validity}</span>
                  </p>

                  <p className='poDetailsItem'>
                    <i style={{ color: '#777E90' }} className='bi bi-file-earmark-text fs-6 me-2'></i>
                    <span className='spanTittle'>{t('PO Created by')}: </span>{' '}
                    <span className='output'>{PoDetailsViewInfo?.requester?.name}</span>
                  </p>
                  <p className='poDetailsItem'>
                    <i style={{ color: '#777E90' }} className='bi bi-eye me-2 fs-6'></i>
                    <span className='spanTittle'>{t('Views')}: </span>{' '}
                    <span className='output'>{PoDetailsViewInfo?.count}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='container'>
            <div className='pendingItemBoxCard suplierPoDetailsCustMargin'>
              <div className='p-2 d-flex flex-column gap-1'>
                <h4 className='pb-3'>About Requester</h4>

                <div className='d-flex justify-content-between'>
                  <div className='d-flex gap-3'>
                    <img
                      src={
                        PoDetailsViewInfo?.requester?.profile_picture?.image ||
                        'http://propeller.in/components/list/img/40x40.png'
                      }
                      className=' avatar_2'
                      width='40'
                      height='40'
                      alt='po-avatar'
                      circle
                    />

                    <div>
                      <h6 className='fw-bold'>{PoDetailsViewInfo?.requester?.name}</h6>
                      <p className='text-small text-muted'>
                        {PoDetailsViewInfo?.requester?.nationality}
                      </p>
                    </div>
                  </div>

                  <a href={`mailto: ${PoDetailsViewInfo?.requester?.email}`}>
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
                  <p className='fw-bold'>{PoDetailsViewInfo?.requester?.rating_as_supplier}</p>
                  <p>({PoDetailsViewInfo?.requester?.supplier_rating_count} Reviews)</p>
                  <Rating
                    name='read-only'
                    value={PoDetailsViewInfo?.requester?.rating_as_supplier || 0}
                    readOnly
                  />
                </div>

                {/* <p className="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolorem molestiae quae laborum nam minima explicabo...</p> */}
              </div>

              <hr style={{ marginBottom: '30px', border: '1px solid #E6E8EC' }} />
              <h3 className='listItemTitle'>List of Items</h3>

              {PoDetailsViewInfo && PoDetailsViewInfo.po_item_list.map((item, index) => (
                <ToggoleComponent
                  // show={show}
                  // setShow={setShow}
                  error={error}
                  setError={setError}
                  item={item}
                  index={index}
                  increaseOfferCount={increaseOfferCount}
                  decreaseOfferCount={decreaseOfferCount}
                  offerCount={offerCount}
                  setItemData={getPreferenceData}
                  setItemTaken={setItemTaken}
                  itemTaken={itemTaken}
                  itemData={itemData}></ToggoleComponent>
              ))}

              <div className='p-2 bg-white border rounded-lg' style={{ borderColor: '#E6E8EC' }}>
                <h2 className='grandTotal'>
                Grand Total - {grandTotal} SAR
                  <span className='vatCaption'> *VAT Exclusive</span>
                </h2>
              </div>

              <div className='totalContainer'>
                <div className='submitPoDetails'>
                  <p className='vatCaption offerText'>*Offer Fee - SR 20</p>
                  <div>
                    {stampInfo && stampInfo.stamp_exists ? (
                      <button
                        id='btnId'
                        type='button'
                        className='completeBtn customSubmitMargin'
                        onClick={() => createOffer()}>
                        Submit
                      </button>
                    ) : (
                      <button
                        type='button'
                        className='completeBtn customSubmitMargin'
                        data-toggle='modal'
                        data-target='#templateModal'
                        data-name='name'
                        data-title='title 1'
                        data-customer='Chrysler'
                        data-logo='https://dummyimage.com/400x200/000/fff.png&text=modal+1'
                        data-industry='industry'
                        data-products='products'
                        data-sales
                        cycle='sales cycle'
                        data-competition='competition'
                        data-background='background'
                        data-salesperson='Tony Tiger'
                        data-jobtitle='jobtitle'
                        data-headshot='headshot'
                        data-email='email'
                        data-metrics='metrics'
                        data-economicBuyer='economicBuyer'
                        data-decisionCriteria='decisionCriteria'
                        data-decisionProcess='decisionProcess'
                        data-identifyPain='identifyPain'
                        data-champion='champion'
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {/* <button onClick={() => createOffer()} className="btn btn-primary">
              {" "}
              Offer Create
            </button> */}
            </div>
            {/* <AcceptedOrders /> */}

            {/* Rating Form */}
            {/* <div className='declineExpiredCard'>
              <RatingReviewForm item={PoDetailsViewInfo?.id || id} />
            </div> */}
          </div>
        </>
      )}
 
    </>
  );
};

export default SupplierPoDetailsView;
