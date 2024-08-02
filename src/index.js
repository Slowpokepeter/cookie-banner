// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './App.css';

// Function to get attributes from the script tag
function getScriptAttributes() {
  const script = document.querySelector('script[src*="main"]'); // Select script by src
  return {
    style: script ? script.getAttribute('data-style') || 'light' : 'light',
    rejectButton: script ? script.getAttribute('data-reject-button') || 'show' : 'show',
    acceptButtonColor: script ? script.getAttribute('data-accept-button-color') || '#003099' : '#003099',
    acceptButtonTextColor: script ? script.getAttribute('data-accept-button-text-color') || '#FFFFFF' : '#FFFFFF',
    position: script ? script.getAttribute('data-position') || 'bottom-right' : 'bottom-right',
    customizable: script ? script.getAttribute('data-customizable') === 'true' : true,
    gtmId: script ? script.getAttribute('data-gtm-id') : null,
  };
}

// Ensure the DOM is fully loaded before rendering
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('cookie-consent-banner-root');
  if (rootElement) {
    const attributes = getScriptAttributes();
    ReactDOM.render(
      <React.StrictMode>
        <App {...attributes} />
      </React.StrictMode>,
      rootElement
    );
  }
});