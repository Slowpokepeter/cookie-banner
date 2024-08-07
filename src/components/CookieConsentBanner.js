import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CookieCustomize from './CookieCustomize';
import './CookieConsentBanner.css';

const inlineStyles = `
body {
  font-family: 'Inter', sans-serif;
}

.cookie-consent-popup {
  position: fixed;
  width: 360px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 16px rgba(3, 7, 18, .08), 0 16px 20px rgba(3, 7, 18, .08), 0 0 0 1px rgba(3, 7, 18, .08), inset 0 0 0 0.5px rgba(229, 231, 235, .6), inset 0 0 0 1px rgba(255, 255, 255);
  z-index: 1000;
}

.cookie-consent-popup.light {
  background-color: #fff;
  color: #000;
}

.cookie-consent-popup.dark {
  background-color: #333;
  box-shadow: 0 2px 16px rgba(3, 7, 18, .08), 0 16px 20px rgba(3, 7, 18, .08), 0 0 0 1px rgba(3, 7, 18, .08), inset 0 0 0 0.5px rgb(92 92 92 / 60%), inset 0 0 0 1px rgb(42 42 42);
  color: #fff;
}

.p-cookies.dark {
  color: #c4c4c4;
}

.slider.dark {
  background-color: #4e4e4e;
}

.cookie-consent-header {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  margin-bottom: 10px;
}

.cookie-head {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 0px;
}

.p-cookies {
  font-size: 14px;
  color: #475569;
}

.cookie-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  color: #635BFF;
}

.cookie-consent-buttons {
  display: flex;
  justify-content: start;
  font-size: 13px;
  line-height: normal;
  gap: 10px;
  margin-top: 20px;
}

.cookie-consent-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.cookie-consent-buttons .customize-button {
  background-color: #fff;
  color: #000;
  border: 1px solid #ccc;
}

.cookie-consent-popup.top-left {
  top: 20px;
  left: 20px;
}

.cookie-consent-popup.top-right {
  top: 20px;
  right: 20px;
}

.cookie-consent-popup.bottom-left {
  bottom: 20px;
  left: 20px;
}

.cookie-consent-popup.bottom-right {
  bottom: 20px;
  right: 20px;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(20px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.custom-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  margin-bottom: 10px;
}

.custom-setting {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.save-button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
}
`

const COOKIE_NAME = 'cookieConsent';

const CookieConsentBanner = ({
  style = 'light',
  rejectButton = 'show',
  acceptButtonColor = '#003099',
  acceptButtonTextColor = '#FFFFFF',
  position = 'bottom-right',
  customizable = true,
  gtmId,
}) => {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false,
    functionality: false,
    personalization: false,
    security: false,
  });

  useEffect(() => {
    const setDefaultConsentState = () => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };

      window.gtag('consent', 'default', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied',
        'functionality_storage': 'denied',
        'personalization_storage': 'denied',
        'security_storage': 'denied',
        'wait_for_update': 500,
      });
    };

    const initializeGTM = () => {
      if (!gtmId) return;

      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      };
    };

    const getCookieValues = (name) => {
      const cookieValue = document.cookie.split('; ').find(row => row.startsWith(name + '='));
      return cookieValue ? JSON.parse(decodeURIComponent(cookieValue.split('=')[1])) : undefined;
    };

    const onUserConsent = (consent) => {
      const consentModeStates = {
        ad_storage: consent.marketing ? 'granted' : 'denied',
        ad_user_data: consent.marketing ? 'granted' : 'denied',
        ad_personalization: consent.marketing ? 'granted' : 'denied',
        analytics_storage: consent.analytics ? 'granted' : 'denied',
        functionality_storage: consent.functionality ? 'granted' : 'denied',
        personalization_storage: consent.personalization ? 'granted' : 'denied',
        security_storage: consent.security ? 'granted' : 'denied',
      };
      window.gtag('consent', 'update', consentModeStates);
    };

    const initializeConsentManagement = () => {
      const settings = getCookieValues(COOKIE_NAME);
      if (typeof settings !== 'undefined') {
        onUserConsent(settings);
      }
    };

    // Set default consent state as early as possible
    setDefaultConsentState();
    // Initialize consent management
    initializeConsentManagement();

    // Wait for default consent state to be set before initializing GTM
    setTimeout(initializeGTM, 1000);

    const consentCookie = document.cookie.split('; ').find(row => row.startsWith('cookieConsent='));
    if (!consentCookie) {
      setVisible(true);
    }
  }, [gtmId]);

  const handleAccept = () => {
    setVisible(false);
    document.cookie = `cookieConsent=${JSON.stringify({
      analytics: true,
      marketing: true,
      functionality: true,
      personalization: true,
      security: true,
    })}; path=/; max-age=31536000`; // 1 year
    allConsentGranted();
  };

  const handleReject = () => {
    setVisible(false);
    document.cookie = "cookieConsent=rejected; path=/; max-age=31536000"; // 1 year
    updateGtagConsent({
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'denied',
    });
  };

  const handleCustomize = () => {
    setShowCustomize(true);
  };

  const handleSavePreferences = (newPreferences) => {
    setPreferences(newPreferences);
    document.cookie = `cookieConsent=${JSON.stringify(newPreferences)}; path=/; max-age=31536000`;
    setShowCustomize(false);
    setVisible(false);
    updateGtagConsent(newPreferences);
  };

  const updateGtagConsent = (preferences) => {
    window.gtag('consent', 'update', {
      'ad_storage': preferences.marketing ? 'granted' : 'denied',
      'ad_user_data': preferences.marketing ? 'granted' : 'denied',
      'ad_personalization': preferences.marketing ? 'granted' : 'denied',
      'analytics_storage': preferences.analytics ? 'granted' : 'denied',
      'functionality_storage': preferences.functionality ? 'granted' : 'denied',
      'personalization_storage': preferences.personalization ? 'granted' : 'denied',
      'security_storage': preferences.security ? 'granted' : 'denied',
    });
  };

  const allConsentGranted = () => {
    window.gtag('consent', 'update', {
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted',
      'analytics_storage': 'granted',
      'functionality_storage': 'granted',
      'personalization_storage': 'granted',
      'security_storage': 'granted'
    });
  };

  if (!visible) return null;

  return (
    <div className={`cookie-consent-popup ${style} ${position}`}>
      <style>{inlineStyles}</style>
      {!showCustomize ? (
        <>
          <div className={`cookie-consent-header ${style}`}>
            <svg className='cookie-icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.9998 16.3541L15.3538 16.0001M9.99979 17.3541L10.3538 17.0001M7.99979 8.35412L8.3538 8.00012M6.99979 13.3541L7.3538 13.0001M11.9998 12.3541L12.3538 12.0001M12.0028 21.0001C14.3307 21 16.5681 20.0982 18.2455 18.4839C19.9228 16.8696 20.9096 14.6683 20.9988 12.3421C21.0048 12.1891 20.8388 12.0921 20.7008 12.1611C18.2248 13.4081 16.6948 12.0841 16.9438 10.3071C16.948 10.2728 16.9445 10.2379 16.9334 10.2052C16.9223 10.1724 16.904 10.1426 16.8798 10.1179C16.8555 10.0932 16.8261 10.0742 16.7935 10.0625C16.761 10.0508 16.7262 10.0465 16.6918 10.0501C14.5208 10.3531 13.6058 9.03612 13.9478 7.24612C13.9529 7.21563 13.9516 7.18442 13.9441 7.15444C13.9366 7.12446 13.923 7.09634 13.9041 7.07186C13.8853 7.04737 13.8616 7.02703 13.8345 7.0121C13.8074 6.99718 13.7776 6.98799 13.7468 6.98512C11.7038 6.80312 11.5348 4.44512 11.8858 3.29512C11.9288 3.15312 11.8268 2.99512 11.6788 3.00012C9.32148 3.08621 7.09212 4.09405 5.47021 5.80687C3.84829 7.51969 2.9634 9.80064 3.00585 12.1591C3.04831 14.5176 4.01471 16.7653 5.69722 18.4186C7.37972 20.072 9.64391 20.9989 12.0028 21.0001Z" stroke={acceptButtonColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2 className={`cookie-head ${style}`}>Your Data, Your Choice</h2>
          </div>
          <p className={`p-cookies ${style}`}>We use cookies to improve our services. Please select your preferences:</p>
          <div className="cookie-consent-buttons">
            <button onClick={handleAccept} style={{ backgroundColor: acceptButtonColor, color: acceptButtonTextColor }}>
              Accept All
            </button>
            {customizable && <button onClick={handleCustomize} className="customize-button">Customize</button>}
            {rejectButton !== 'none' && <button onClick={handleReject} className="customize-button">Reject</button>}
          </div>
        </>
      ) : (
        <CookieCustomize
          preferences={preferences}
          onSave={handleSavePreferences}
          acceptButtonColor={acceptButtonColor}
          acceptButtonTextColor={acceptButtonTextColor}
          style={style}
        />
      )}
    </div>
  );
};

CookieConsentBanner.propTypes = {
  style: PropTypes.string,
  rejectButton: PropTypes.string,
  acceptButtonColor: PropTypes.string,
  acceptButtonTextColor: PropTypes.string,
  position: PropTypes.string,
  customizable: PropTypes.bool,
  gtmId: PropTypes.string.isRequired,
};

export default CookieConsentBanner;