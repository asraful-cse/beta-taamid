import React from 'react';
import { Rating } from '@mui/material';
import emailIcon from '../../../images/registration/Email.png';
import { useTranslation } from 'react-i18next';
import moment from 'moment'

const OrderRating = ({ reviews = {}, title }) => {
  const { t } = useTranslation();
   console.log(reviews, 'reviews')
  return (
    <>
    <div className='p-4 d-flex flex-column gap-1 mx-2'>
      <h4 className='pb-3'>{reviews?.reviewee?.name}’s Review & Rating</h4>
      <div className='d-flex justify-content-between'>

        <div className='d-flex gap-3'>
          <img
            src={reviews?.reviewee.profile_picture?.image || 'http://propeller.in/components/list/img/40x40.png'}
            className='avatar_2'
            width='40'
            height='40'
            alt='po-avatar'
            circle
          />

          <div>
            <h6 className='fw-bold'>{reviews?.reviewee?.name}</h6>
            <p className='text-small text-muted'>
              {reviews?.reviewee?.nationality}
            </p>
          </div>
        </div>

        <span className='date-time'>
        {moment(reviews.created_at).format('ll')  }
      
        </span>
      </div>

      <div className='d-flex gap-2'>
        <p className='fw-bold'>{reviews?.reviewee?.rating_as_requester}</p>
        <p>({reviews?.reviewee?.requester_rating_count} Reviews)</p>
        <Rating name='read-only' value={parseInt(reviews?.reviewee?.rating_as_requester) || 0} readOnly />
      </div>

      <p className="text-muted">{reviews?.comment}</p>
    </div>
    <div className='p-4 d-flex flex-column gap-1 mx-2'>
      <h4 className='pb-3'>My Review & Rating</h4>
      <div className='d-flex justify-content-between'>

        <div className='d-flex gap-3'>
          <img
            src={reviews?.reviewer.profile_picture?.image || 'http://propeller.in/components/list/img/40x40.png'}
            className='avatar_2'
            width='40'
            height='40'
            alt='po-avatar'
            circle
          />

          <div>
            <h6 className='fw-bold'>{reviews?.reviewer?.name}</h6>
            <p className='text-small text-muted'>
              {reviews?.reviewer?.nationality}
            </p>
          </div>
        </div>

        <span className='date-time'>
        {moment(reviews.created_at).format('ll')  }
      
        </span>
      </div>

      <div className='d-flex gap-2'>
        <p className='fw-bold'>{reviews?.reviewer?.rating_as_supplier}</p>
        <p>({reviews?.reviewer?.supplier_rating_count} Reviews)</p>
      
        <Rating name='read-only' value={parseInt(reviews?.reviewer?.rating_as_supplier) || 0} readOnly />
      </div>

      <p className="text-muted">{reviews?.comment}</p>
    </div>
    </>
  )
}

export default OrderRating;