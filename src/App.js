// src/App.js
import React from 'react';
import CookieConsentBanner from './components/CookieConsentBanner';

const App = ({
  style,
  rejectButton,
  acceptButtonColor,
  acceptButtonTextColor,
  position,
  customizable,
  gtmId,
}) => {
  return (
    <div>
      <CookieConsentBanner
        style={style}
        rejectButton={rejectButton}
        acceptButtonColor={acceptButtonColor}
        acceptButtonTextColor={acceptButtonTextColor}
        position={position}
        customizable={customizable}
        gtmId={gtmId}
      />
    </div>
  );
};

export default App;