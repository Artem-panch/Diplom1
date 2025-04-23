import React, { useState } from 'react';

export default function AuthModal({ onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:3001/login' : 'http://localhost:3001/register';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();

      if (response.ok && result.user) {
        onLoginSuccess(result.user); // Успішний вхід
      } else {
        setMessage(result.message || result.error);
      }
    } catch (error) {
      setMessage('Помилка запиту');
    }
  };

  return (
    <div className='auth-modal'>
      <div className='auth-content'>
        <button className='close-btn' onClick={onClose}>×</button>
        <div className='auth-tabs'>
          <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>Увійти</button>
          <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>Реєстрація</button>
        </div>

        <form className='auth-form' onSubmit={handleSubmit}>
          {!isLogin && (
            <input type='text' name='name' placeholder="Ім'я" required onChange={handleChange} />
          )}
          <input type='email' name='email' placeholder='Email' required onChange={handleChange} />
          <input type='password' name='password' placeholder='Пароль' required onChange={handleChange} />
          <button type='submit'>{isLogin ? 'Увійти' : 'Зареєструватися'}</button>
          {message && <p className='auth-message'>{message}</p>}
        </form>
      </div>
    </div>
  );
}