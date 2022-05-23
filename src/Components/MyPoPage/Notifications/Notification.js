import timeSince from "../../../utils/timeAgo";

const Notification = ({ notification = {} }) => {
  return (
    <div
      className="notification-item position-relative d-flex justify-content-start align-items-center gap-2 p-2 mt-2 rounded-3"
      style={{ maxWidth: '300px' }}
    >
      <div className="notification-image">
        <div className='bg-secondary bg-gradient rounded-3' style={{ height: '40px', width: '40px' }}></div>
      </div>

      <div className="notification-content d-flex flex-column justify-content-center">
        <div className='notification-content--text'>
          <span className={`fs-6 text-break fw-light text-wrap ${!notification?.is_read ? 'fw-normal' : ''}`}>{notification.title}</span>
        </div>
        <div className='notification-content--time'>
          <span className='fs-small text-muted'>{timeSince((new Date(notification.created_at)))} ago</span>
        </div>
      </div>

      {!notification.is_read &&
        <div className='position-absolute end-0 mx-2'>
          <div className="bg-success rounded-circle " style={{ height: '10px', width: '10px' }} />
        </div>}
    </div>
  )
};

export default Notification;