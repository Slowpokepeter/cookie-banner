// src/App.js
import React from 'react';
import CookieConsentBanner from './components/CookieConsentBanner';

const App = ({
  style,
  rejectButton,
  acceptButtonColor,
  acceptButtonTextColor,
  position,
  onCustomize
}) => {
  return (
    <div>
      <CookieConsentBanner
        style={style}
        rejectButton={rejectButton}
        acceptButtonColor={acceptButtonColor}
        acceptButtonTextColor={acceptButtonTextColor}
        position={position}
        onCustomize={onCustomize}
      />
    </div>
  );
};

export default App;
