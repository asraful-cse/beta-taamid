import Notification from './Notification';
import './notifications.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import isEmpty from '../../../utils/isEmpty';

const Notifications = () => {
  const [notifications, notificationsSet] = useState([]);
  const [loading, loadingSet] = useState(false);
  const [error, errorSet] = useState('');
  const { t } = useTranslation();

  const getAllTheNotifications = async () => {
    const apiEndPoint = process.env.API_URL || "https://dev.taamid.com/api";

    try {
      errorSet('');
      loadingSet(true);
      const response = await axios.get(`${apiEndPoint}/notifications`);

      if (response.data?.data) {
        loadingSet(false);
        notificationsSet(response.data?.data?.notification_data);
      }

      if (isEmpty(response.data?.data?.notification_data)) {
        loadingSet(false);
        notificationsSet([]);
        errorSet(`You do not have any notifications yet!`);
      }
    } catch (error) {
      loadingSet(false);
      errorSet(`Could not find any notifications`);
    }
  };

  useEffect(() => {
    getAllTheNotifications();

    return () => notificationsSet([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='mt-2'>
      <div className='arrow-up' />
      <div className="notification-area notification-container rounded-3 shadow overflow-auto" style={{ maxHeight: '500px' }}>
        <h5 className='notification-text'>{t('Notification')}</h5>

        {/* Toggle loading state in case of API does not resolve */}
        {loading && <div className="d-flex justify-content-center my-2">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>}

        {/* Handle error what is there is not PO found so far */}
        {error && <div className="alert alert-warning d-flex justify-content-center align-items-center" role="alert">
          <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"></svg>
          <div>{error}</div>
        </div>}

        {notifications?.map((notification) => (
          <Notification key={notification?.id} notification={notification} />
        ))}
      </div>
    </div>
  )
};

export default Notifications;