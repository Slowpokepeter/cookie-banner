// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './App.css';

// Function to get attributes from the script tag
function getScriptAttributes() {
  const script = document.currentScript;
  return {
    style: script.getAttribute('data-style') || 'light',
    rejectButton: script.getAttribute('data-reject-button') || 'none',
    acceptButtonColor: script.getAttribute('data-accept-button-color') || '#030712',
    acceptButtonTextColor: script.getAttribute('data-accept-button-text-color') || '#FFFFFF',
    position: script.getAttribute('data-position') || 'bottom-right',
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
