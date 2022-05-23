import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const MarkAsCompleteButton = ({ id = 0 }) => {
  const [loading, loadingSet] = useState(false);
  const [error, errorSet] = useState('');
  const history = useHistory();

  const markAsCompletePoItem = async () => {
    const apiEndPoint = 'https://dev.taamid.com/api/update_offer';

    try {
      errorSet('');
      loadingSet(true);
      const response = await axios.put(`${apiEndPoint}/${id}`, { status: 4 });

      if ([200, 201].includes(response?.status)) {
        loadingSet(false);
        history.goBack();
      }
    } catch (error) {
      loadingSet(false);
      errorSet(`Could not mark as complete at this time`);
    }
  };

  return (
    <>
      {error && <div className="alert alert-warning d-flex justify-content-center align-items-center my-2 mx-4 pb-4" role="alert">
        <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"></svg>
        <div>{error}</div>
      </div>}

      <div className='d-flex justify-content-end align-items-end flex-end mx-4 pb-4'>
        <button
          className='btn btn-success border border-success rounded-pill p-2 px-4 text-white'
          disabled={loading}
          onClick={markAsCompletePoItem}
        >
          Mark as complete
        </button>
      </div>
    </>
  )
}

export default MarkAsCompleteButton