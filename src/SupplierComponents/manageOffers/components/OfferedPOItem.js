import { useTranslation } from 'react-i18next';
import fileIcon from '../../../images/singlePoDetails/fileAttachmentIcon.png';

const OfferedPOItem = ({ poItem = [], offerItem = [] }) => {
  const { t } = useTranslation();
  const filteredPoItem = poItem.filter(item => offerItem.some(offer => offer?.po_item === item?.id && offer));

  return (
    <>
      {filteredPoItem?.map((item, index) => {
        return item?.id === offerItem[index]?.po_item ? (
          <div className='singleListItemCard' key={item?.id}>
            <div className='justify-content-between'>
              <h3 className='PoBoxTitle' style={{ marginLeft: '20px' }}>{item.title}</h3>
              <p className='singleItemSubTitle'>{item.description}</p>

              <div className='pendingPoUl'>
                <div className='d-flex mx-3'>
                  <div style={{ height: '8px', width: '8px' }} className="bg-success rounded-circle mt-2 mr-2"></div>
                  <p className='fw-normal'>{t('Quantity')} - {item?.quantity}</p>
                </div>
              </div>
            </div>

            <div className='cardBoxBody d-flex'>
              <button className='singleItemNameBox mb-3'>{item.subcategory} </button>
            </div>

            <hr />

            <div className='pendingPoUl'>
              <div className='d-flex mx-3'>
                <div style={{ height: '8px', width: '8px' }} className="bg-success rounded-circle mt-2 mr-2"></div>
                <p className='fw-normal'>{t('Name')} - {offerItem[index]?.title}</p>
              </div>

              <div className='d-flex mx-3'>
                <div style={{ height: '8px', width: '8px' }} className="bg-success rounded-circle mt-2 mr-2"></div>
                <p className='fw-normal'>{t('Attatchments')} - <span className='text-success'><img src={fileIcon} alt='' height='13px' width='12px' /> {offerItem[index]?.attachment?.split('/').pop()}</span></p>
              </div>

              <div className='d-flex mx-3'>
                <div style={{ height: '8px', width: '8px' }} className="bg-success rounded-circle mt-2 mr-2"></div>
                <p className='fw-normal'>{t('Description')} - {offerItem[index]?.description}</p>
              </div>

              <div className='d-flex mx-3'>
                <div style={{ height: '8px', width: '8px' }} className="bg-success rounded-circle mt-2 mr-2"></div>
                <p className='fw-normal'>{t('Unit Price')} - {offerItem[index]?.unit_price}</p>
              </div>

              <div className='d-flex mx-3'>
                <div style={{ height: '8px', width: '8px' }} className="bg-success rounded-circle mt-2 mr-2"></div>
                <p className='fw-normal'>{t('Total Price')} - {offerItem[index]?.total_price}</p>
              </div>
            </div>
          </div>
        ) : null;
      })}
    </>
  )
}

export default OfferedPOItem