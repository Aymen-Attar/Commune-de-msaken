import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import 'firebase/auth'; // If you need authentication
import 'firebase/storage'; // If you need file storage
import 'firebase/database'; // If you need Realtime Database

import App from './App';
import Addmin from './Components/admin/AdminSidebar';
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

initializeApp(firebaseConfig);

i18next.init({
  interpolation: { escapeValue: false }, // React already escapes the values
  lng: 'fr', // Default language
  resources: {
    fr: {
      translation: require('./locales/fr.json')
    },
    ar: {
      translation: require('./locales/ar.json')
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
