import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
// We don't import App.css here because it's imported directly in App.tsx
// If you had global styles, you'd import them here.

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);