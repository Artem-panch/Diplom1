import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Order from './Order';
import AuthModal from './AuthModal';
import AboutModal from './AboutModal';
import ContactsModal from './ContactsModal';

export default function Header(props) {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactsOpen, setContactsOpen] = useState(false);
  const [user, setUser] = useState(null); // Стан користувача

  const handleLoginSuccess = (userData) => {
    setUser(userData); // Зберігаємо користувача
    setAuthOpen(false); // Закриваємо модалку
    alert('Вхід успішний!'); // Повідомлення
  };

  return (
    <header>
      <div>
        <span className='logo'>House staff</span>
        <ul className='nav'>
          <li onClick={() => setAboutOpen(true)}>Про нас</li>
          <li onClick={() => setContactsOpen(true)}>Контакти</li>
          <li className='cabinet' onClick={() => setAuthOpen(true)}>
            {user ? user.name : 'Кабінет'}
          </li>
        </ul>
        <FaShoppingCart
          onClick={() => setCartOpen(!cartOpen)}
          className={`shop-cart-button ${cartOpen ? 'active' : ''}`}
        />

        {cartOpen && (
          <div className='shop-cart'>
            {props.orders.length > 0 ? (
              props.orders.map(el => (
                <Order onDelete={props.onDelete} key={el.id} item={el} />
              ))
            ) : (
              <div className='empty'><h2>Товарів немає</h2></div>
            )}
          </div>
        )}
      </div>
      <div className='presentation'></div>
      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}
      {contactsOpen && <ContactsModal onClose={() => setContactsOpen(false)} />}
    </header>
  );
}
