import React from 'react';
import '../index.css';

export default function AboutModal({ onClose }) {
  return (
    <div className="auth-modal">
      <div className="auth-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Про нас</h2>
        <p>Тут буде інформація про компанію</p>
      </div>
    </div>
  );
}
