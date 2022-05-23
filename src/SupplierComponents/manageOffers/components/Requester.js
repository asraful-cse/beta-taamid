import React from 'react';
import { Rating } from '@mui/material';
import emailIcon from '../../../images/registration/Email.png';
import { useTranslation } from 'react-i18next';

const Requester = ({ requester = {} }) => {
  const { t } = useTranslation();

  return (
    <div className='p-4 d-flex flex-column gap-1 mx-2'>
      <h4 className='pb-3'>{t("About Requester")}</h4>
      <div className='d-flex justify-content-between'>

        <div className='d-flex gap-3'>
          <img
            src={requester?.profile_picture?.image || 'http://propeller.in/components/list/img/40x40.png'}
            className='avatar_2'
            width='40'
            height='40'
            alt='po-avatar'
            circle
          />

          <div>
            <h6 className='fw-bold'>{requester?.name}</h6>
            <p className='text-small text-muted'>
              {requester?.nationality}
            </p>
          </div>
        </div>

        <a href={`mailto: ${requester?.email}`}>
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
        <p className='fw-bold'>{requester?.rating_as_supplier}</p>
        <p>({requester?.supplier_rating_count} Reviews)</p>
        <Rating name='read-only' value={requester?.rating_as_supplier || 0} readOnly />
      </div>

      <p className="text-muted">{requester?.description}</p>
    </div>
  )
}

export default Requester;