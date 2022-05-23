import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import isEmpty from '../../../utils/isEmpty';
import { Link } from 'react-router-dom';
import PoBoxCard from '../../../Components/MyPoPage/PoBoxCard/PoBoxCard';

const filteringItems = [
  {
    id: '8d8599ce-d520-11ec-9d64-0242ac120002',
    label: 'Filter By Active',
    value: 'active'
  },
  {
    id: '2e89df85-a394-416a-acc8-d9c0cb9d5ade',
    label: 'Filter By Cancel',
    value: 'canceled'
  }
]

const ManageSupplierPoOffers = () => {
  const [status, statusSet] = useState('active');
  const [loading, loadingSet] = useState(false);
  const [error, errorSet] = useState('');
  const [items, itemsSet] = useState([]);

  const { t } = useTranslation();

  const getFilteredPOItems = async (filter) => {
    const apiUrl = 'https://dev.taamid.com/api/order_by_status';

    try {
      loadingSet(true);
      errorSet('');
      itemsSet([]);
      const response = await axios.get(`${apiUrl}?status=${filter}`);

      if (response.data?.data) {
        loadingSet(false);
        itemsSet(response.data?.data);
      }

      if (isEmpty(response.data?.data)) {
        loadingSet(false);
        itemsSet([]);
        errorSet(`Does not have any PO items yet!`);
      }
    } catch (responseError) {
      loadingSet(false);
      errorSet(responseError?.response?.data?.message);
    }
  };

  const handleFilterItemChange = (event) => statusSet(event.target.value);

  useEffect(() => {
    getFilteredPOItems(status);
  }, [status]);

  return (
    <>
      <div className='myPoView'>
        <h3 className='customMyPoTitle1'>{t('Manage Offer')} </h3>
        <select id='gen' className='filteringButton ' onChange={handleFilterItemChange}>
          {filteringItems?.map((item) => (
            <option key={item?.id} value={item?.value}>{item?.label}</option>
          ))}
        </select>
      </div>

      {loading && <div className="d-flex justify-content-center my-3">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>}

      {error && <div className="alert alert-warning d-flex justify-content-center align-items-center my-2" role="alert">
        <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"></svg>
        <div>{error}</div>
      </div>}

      <div className='row'>
        {items && items.map((item, index) => (
          <Link
            key={item?.id}
            to={status === "active" ? `/supplier-manage-offer/active/${item?.id}` : `/supplier-manage-offer/cancel/${item?.id}`}
            className='customLink'
          >
            <PoBoxCard eachMyPo={item} key={index}></PoBoxCard>
          </Link>
        ))}
      </div>
    </>
  )
}

export default ManageSupplierPoOffers;