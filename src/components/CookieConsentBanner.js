import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './CookieConsentBanner.css';

const CookieConsentBanner = ({
  style = 'light',
  rejectButton = 'show',
  acceptButtonColor = '#4CAF50',
  acceptButtonTextColor = '#FFFFFF',
  position = 'bottom-right',
  onCustomize = () => {},
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consentCookie = document.cookie.split('; ').find(row => row.startsWith('cookieConsent='));
    if (!consentCookie) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setVisible(false);
    document.cookie = "cookieConsent=accepted; path=/; max-age=31536000"; // 1 year
    // Add logic to enable cookies
  };

  if (!visible) return null;

  return (
    <div className={`cookie-consent-popup ${style} ${position}`}>
      <div className="cookie-consent-header">
        <svg className='cookie-icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.9998 16.3541L15.3538 16.0001M9.99979 17.3541L10.3538 17.0001M7.99979 8.35412L8.3538 8.00012M6.99979 13.3541L7.3538 13.0001M11.9998 12.3541L12.3538 12.0001M12.0028 21.0001C14.3307 21 16.5681 20.0982 18.2455 18.4839C19.9228 16.8696 20.9096 14.6683 20.9988 12.3421C21.0048 12.1891 20.8388 12.0921 20.7008 12.1611C18.2248 13.4081 16.6948 12.0841 16.9438 10.3071C16.948 10.2728 16.9445 10.2379 16.9334 10.2052C16.9223 10.1724 16.904 10.1426 16.8798 10.1179C16.8555 10.0932 16.8261 10.0742 16.7935 10.0625C16.761 10.0508 16.7262 10.0465 16.6918 10.0501C14.5208 10.3531 13.6058 9.03612 13.9478 7.24612C13.9529 7.21563 13.9516 7.18442 13.9441 7.15444C13.9366 7.12446 13.923 7.09634 13.9041 7.07186C13.8853 7.04737 13.8616 7.02703 13.8345 7.0121C13.8074 6.99718 13.7776 6.98799 13.7468 6.98512C11.7038 6.80312 11.5348 4.44512 11.8858 3.29512C11.9288 3.15312 11.8268 2.99512 11.6788 3.00012C9.32148 3.08621 7.09212 4.09405 5.47021 5.80687C3.84829 7.51969 2.9634 9.80064 3.00585 12.1591C3.04831 14.5176 4.01471 16.7653 5.69722 18.4186C7.37972 20.072 9.64391 20.9989 12.0028 21.0001Z" stroke={acceptButtonColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h2 className="cookie-head">Your Data, Your Choice</h2>
      </div>
      <p className="p-cookies">We use cookies to improve our services. Please click 'Accept All' to continue</p>
      <div className="cookie-consent-buttons">
        <button onClick={handleAccept} style={{ backgroundColor: acceptButtonColor, color: acceptButtonTextColor }}>Accept All</button>
        {rejectButton !== 'none' && <button onClick={onCustomize} className="customize-button">Reject</button>}
      </div>
    </div>
  );
};

CookieConsentBanner.propTypes = {
  style: PropTypes.string,
  rejectButton: PropTypes.string,
  acceptButtonColor: PropTypes.string,
  acceptButtonTextColor: PropTypes.string,
  position: PropTypes.string,
  onCustomize: PropTypes.func,
};

export default CookieConsentBanner;
