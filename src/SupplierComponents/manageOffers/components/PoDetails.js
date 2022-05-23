import React from 'react'
import { useTranslation } from 'react-i18next';
import shareIcon from '../../../images/singlePoDetails/shareBtn.png';
import fileIcon from '../../../images/singlePoDetails/fileAttachmentIcon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const PoDetails = ({ item = {} }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className='poDetailsBoxCard'>
        <div className='row'>
          <div className='justify-content-between d-flex horizontalLine'>
            <h3 className='poDetailsTitle'>{t('PO Details')}</h3>
            <div className='d-flex justify-content-around'>
              <button className='poNo customRadius'>{t('PO NO')} : {item?.po_no}</button>
              <img className='customRoundIcon' src={shareIcon} alt='shareIcon1' />
            </div>
          </div>

          <div className='col-sm-12 col-md-8 verticalLine1'>
            <div className='justify-content-between'>
              <h3 className='PoBoxTitle'>{item?.title}</h3>
              <p className='Po_sub_title2'> {item?.description}</p>
            </div>

            <div className=' d-flex img-upload'>
              <div className='d-sm-flex '>
                {item?.po_attachment && item?.po_attachment.map((attachItem) => (
                  <ul className=' pl-0' key={Math.random()}>
                    <li className='d-flex align-items-center'>
                      <img src={fileIcon} alt='' height='13px' width='12px' />
                      <p className='uploadedImageLabel mb-0 me-3'> {attachItem.attachment.split('/').pop()}</p>
                    </li>
                  </ul>
                ))}
              </div>
            </div>

            <div className='cardBoxBody row'>
              {item?.po_item_list && item?.po_item_list.map((eachPoItem, index) => (
                <div key={index} className='col-md-3 mr-4'>
                  <button className='singleItemBoxName2 mb-3'>{eachPoItem.title}</button>
                </div>
              ))}
            </div>
          </div>

          <div className='col-sm-12 col-md-4 poCardPart2 before_verticalLine'>
            <p className='poDetailsItem'>
              <FontAwesomeIcon icon={faCalendarAlt} className='me-2 fs-6' style={{ color: '#cfc9c7' }} />
              <span className='spanTittle'>{t('PO Start Date')}:</span>{' '}
              <span className='output'>{item?.start_date}</span>
            </p>

            <p className='poDetailsItem'>
              <FontAwesomeIcon icon={faCalendarAlt} className='me-2 fs-6' style={{ color: '#cfc9c7' }} />
              <span className='spanTittle'>{t('PO End Date')}:</span>{' '}
              <span className='output'>{item?.end_date} </span>
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
                {item?.payment_method === 1
                  ? t('Credit Card')
                  : item?.payment_method === 2
                    ? t('Paypal')
                    : t('Cash')}
              </span>
            </p>

            <p className='poDetailsItem'>
              <i style={{ color: '#777E90' }} className='bi bi-geo-alt me-2 fs-6'></i>
              <span className='spanTittle'>{t('Delivery place')}:</span>{' '}
              <span className='output'>{item?.delivery_place}</span>
            </p>

            <p className='poDetailsItem'>
              <i style={{ color: '#777E90' }} className='bi bi-file-earmark-arrow-down fs-6 me-2'></i>
              <span className='spanTittle'>{t('Offers Received')}</span>{' '}
              <span className='output'>44</span>
            </p>

            <p className='poDetailsItem'>
              <i style={{ color: '#777E90' }} className='bi bi-clock me-2 fs-6'></i>
              <span className='spanTittle'>{t('Validity')}:</span>{' '}
              <span className='output'>{item?.validity}</span>
            </p>

            <p className='poDetailsItem'>
              <i style={{ color: '#777E90' }} className='bi bi-file-earmark-text fs-6 me-2'></i>
              <span className='spanTittle'>{t('PO Created by')}: </span>{' '}
              <span className='output'>{item?.requester?.name}</span>
            </p>

            <p className='poDetailsItem'>
              <i style={{ color: '#777E90' }} className='bi bi-eye me-2 fs-6'></i>
              <span className='spanTittle'>{t('Views')}: </span>{' '}
              <span className='output'>{item?.count}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default PoDetails;