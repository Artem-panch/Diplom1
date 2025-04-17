import React from 'react';
import '../index.css';

export default function ContactsModal({ onClose }) {
  return (
    <div className="auth-modal">
      <div className="auth-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Контакти</h2>
        <p>Тут буде інформація про контакти.</p>
      </div>
    </div>
  );
}
