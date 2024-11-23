import React from 'react';
import "./LanguageSwitch.css"
import { useTranslation } from 'react-i18next';
import { FiFlag } from 'react-icons/fi';

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switch">
      <button className="language-button" onClick={() => changeLanguage('fr')}> 🇫🇷 Français</button>
      <button className="language-button" onClick={() => changeLanguage('ar')}> 🇹🇳 العربية </button>
    </div>
  );
};

export default LanguageSwitch;
