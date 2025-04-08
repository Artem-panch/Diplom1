import React, { useState } from 'react';

export default function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className='auth-modal'>
      <div className='auth-content'>
        <button className='close-btn' onClick={onClose}>×</button>
        <div className='auth-tabs'>
          <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>Увійти</button>
          <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>Реєстрація</button>
        </div>

        {isLogin ? (
          <form className='auth-form'>
            <input type='email' placeholder='Email' required />
            <input type='password' placeholder='Пароль' required />
            <button type='submit'>Увійти</button>
          </form>
        ) : (
          <form className='auth-form'>
            <input type='text' placeholder="Ім'я" required />
            <input type='email' placeholder='Email' required />
            <input type='password' placeholder='Пароль' required />
            <button type='submit'>Зареєструватися</button>
          </form>
        )}
      </div>
    </div>
  );
}