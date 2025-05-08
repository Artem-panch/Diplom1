import React, { useState } from 'react';
import '../index.css';

export default function CheckoutModal({ onClose }) {
  const [formData, setFormData] = useState({
    surname: '',
    name: '',
    city: '',
    post: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Простенька перевірка
    if (
      !formData.surname.trim() ||
      !formData.name.trim() ||
      !formData.city.trim() ||
      !formData.post.trim() ||
      !formData.phone.trim()
    ) {
      alert('Будь ласка, заповніть всі поля');
      return;
    }

    onClose(); // Закрити модалку
    alert('Ваше замовлення в обробці');

    // (опційно) Тут можна відправити formData на бекенд
    console.log('Дані замовлення:', formData);
  };

  return (
    <div className="auth-modal">
      <div className="auth-content auth-extension">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2 className='placing-an-order-head'>Оформлення замовлення</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="surname"
            placeholder="Прізвище"
            value={formData.surname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Ім'я"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="Місто"
            value={formData.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="post"
            placeholder="Відділення Нової Пошти"
            value={formData.post}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Номер телефону"
            value={formData.phone}
            onChange={handleChange}
          />
          <button type="submit" className="submit-btn">Оформити</button>
        </form>
      </div>
    </div>
  );
}