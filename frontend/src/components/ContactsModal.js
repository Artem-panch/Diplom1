import React from 'react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import '../index.css';

export default function ContactsModal({ onClose }) {
  return (
    <div className="auth-modal">
      <div className="auth-content contacts-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Контакти</h2>

        <p><strong>Повідомити про проблему:</strong> <a href="mailto:support@example.com" className="contact-link">support@example.com</a></p>

        <p><strong>Контактний номер:</strong> <a href="tel:0998887766" className="contact-link">099-888-77-66</a></p>

        <p><strong>Робочий час:</strong></p>
        <ul className="working-hours">
          <li>Понеділок-Пʼятниця: 08:00 – 19:00</li>
          <li>Субота-Неділя: 09:00 – 17:00</li>
        </ul>

        <div className="social-buttons">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn">
            <FaInstagram size={30} />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn">
            <FaFacebook size={30} />
          </a>
        </div>
      </div>
    </div>
  );
}