import React, { useState } from 'react';
import '../index.css';

export default function CheckoutModal({ onClose, orders }) {
  const [formData, setFormData] = useState({
    surname: '',
    name: '',
    city: '',
    post: '',
    phone: '',
  });

  const totalPrice = orders.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { surname, name, city, post, phone } = formData;

    if (!surname || !name || !city || !post || !phone) {
      alert('Будь ласка, заповніть всі поля');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          surname,
          name,
          city,
          post,
          phone,
          items: orders,
          totalPrice
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Замовлення успішно оформлене!');
        onClose();
      } else {
        alert(data.error || 'Помилка при оформленні замовлення');
      }
    } catch (err) {
      console.error(err);
      alert('Помилка зʼєднання з сервером');
    }
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
          <p>Оплата при отриманні замовлення.</p>
          <p>Сума замовлення: {totalPrice.toFixed(2)} $</p>
          <button type="submit" className="submit-btn">Оформити</button>
        </form>
      </div>
    </div>
  );
}
