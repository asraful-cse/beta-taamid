import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AcceptOrDeclineButtons = ({ id = 0 }) => {
  const [loading, loadingSet] = useState({ decline: false, accept: false });
  const [error, errorSet] = useState('');
  const history = useHistory();

  const declinePoOffer = async () => {
    const apiEndPoint = 'https://dev.taamid.com/api/update_offer';

    try {
      errorSet('');
      loadingSet(prev => ({ ...prev, decline: true }));
      const response = await axios.put(`${apiEndPoint}/${id}`, { status: 3 });

      if ([200, 201].includes(response.data)) {
        loadingSet(prev => ({ ...prev, decline: false }));
        history.goBack();
      }
    } catch (error) {
      loadingSet(prev => ({ ...prev, decline: false }));
      errorSet(`Could not decline offer at this time`);
    }
  };

  const acceptPoOffer = async () => {
    const apiEndPoint = 'https://dev.taamid.com/api/update_offer';

    try {
      errorSet('');
      loadingSet(prev => ({ ...prev, accept: true }));
      const response = await axios.put(`${apiEndPoint}/${id}`, { status: 2 });

      if ([200, 201].includes(response?.status)) {
        loadingSet(prev => ({ ...prev, accept: false }));
        history.goBack();
      }
    } catch (error) {
      loadingSet(prev => ({ ...prev, accept: false }));
      errorSet(`Could not accept offer at this time`);
    }
  };

  return (
    <>
      {error && <div className="alert alert-warning d-flex justify-content-center align-items-center my-2 mx-4 pb-4" role="alert">
        <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"></svg>
        <div>{error}</div>
      </div>}

      <div className='d-flex justify-content-end align-items-end flex-end gap-2 mx-4 pb-4'>
        <button
          className='btn border border-success rounded-pill p-2 px-4 text-success'
          disabled={loading?.decline}
          onClick={declinePoOffer}
        >
          Decline
        </button>

        <button
          className='btn btn-success border border-success rounded-pill p-2 px-4 text-white'
          disabled={loading?.accept}
          onClick={acceptPoOffer}
        >
          Accept
        </button>
      </div>
    </>
  )
}

export default AcceptOrDeclineButtons;