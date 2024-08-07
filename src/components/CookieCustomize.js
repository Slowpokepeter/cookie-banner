import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CookieConsentBanner.css';

const CookieCustomize = ({ preferences, onSave, acceptButtonColor, acceptButtonTextColor, style }) => {
  const [localPreferences, setLocalPreferences] = useState(preferences);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setLocalPreferences(prev => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    updateGtagConsent(localPreferences);
    onSave(localPreferences);
  };

  const updateGtagConsent = (preferences) => {
    window.gtag('consent', 'update', {
      'ad_storage': preferences.marketing ? 'granted' : 'denied',
      'analytics_storage': preferences.analytics ? 'granted' : 'denied',
      'functionality_storage': preferences.functionality ? 'granted' : 'denied',
      'personalization_storage': preferences.personalization ? 'granted' : 'denied',
      'security_storage': preferences.security ? 'granted' : 'denied',
    });
  };

  const sliderStyle = {
    backgroundColor: acceptButtonColor,
  };

  return (
    <div className={`cookie-customize ${style}`}>
      <h3 className={style}>Cookie Settings</h3>
      <p className={`p-cookies ${style}`}>We use cookies to enhance your experience, analyze traffic, and deliver personalized content.</p>
      <div className='custom-wrap'>
        <div className='custom-setting'>
          Analytics
          <label className='switch'>
            <input
              type="checkbox"
              name="analytics"
              checked={localPreferences.analytics}
              onChange={handleChange}
            />
            <span className={`slider round ${style}`} style={localPreferences.analytics ? sliderStyle : null}></span>
          </label>
        </div>
        <div className='custom-setting'>
          Marketing
          <label className='switch'>
            <input
              type="checkbox"
              name="marketing"
              checked={localPreferences.marketing}
              onChange={handleChange}
            />
            <span className={`slider round ${style}`} style={localPreferences.marketing ? sliderStyle : null}></span>
          </label>
        </div>
        <div className='custom-setting'>
          Functionality
          <label className='switch'>
            <input
              type="checkbox"
              name="functionality"
              checked={localPreferences.functionality}
              onChange={handleChange}
            />
            <span className={`slider round ${style}`} style={localPreferences.functionality ? sliderStyle : null}></span>
          </label>
        </div>
        <div className='custom-setting'>
          Personalization
          <label className='switch'>
            <input
              type="checkbox"
              name="personalization"
              checked={localPreferences.personalization}
              onChange={handleChange}
            />
            <span className={`slider round ${style}`} style={localPreferences.personalization ? sliderStyle : null}></span>
          </label>
        </div>
        <div className='custom-setting'>
          Security
          <label className='switch'>
            <input
              type="checkbox"
              name="security"
              checked={localPreferences.security}
              onChange={handleChange}
            />
            <span className={`slider round ${style}`} style={localPreferences.security ? sliderStyle : null}></span>
          </label>
        </div>
      </div>
      <button onClick={handleSave} className="save-button" style={{ backgroundColor: acceptButtonColor, color: acceptButtonTextColor }}>
        Save Preferences
      </button>
    </div>
  );
};

CookieCustomize.propTypes = {
  preferences: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  acceptButtonColor: PropTypes.string.isRequired,
  acceptButtonTextColor: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
};

export default CookieCustomize;