import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Order from './Order';
import AuthModal from './AuthModal';
import AboutModal from './AboutModal';
import ContactsModal from './ContactsModal';

const showOrders = (props) => {
  let summa = 0;
  props.orders.forEach(el => summa += Number.parseFloat(el.price));
  return (
    <div>
      {props.orders.map(el => (
        <Order onDelete={props.onDelete} key={el.id} item={el} />
      ))}
      <p className='summa'>Сума: {new Intl.NumberFormat().format(summa)}$</p>
    </div>
  );
};

const showNothing = () => (
  <div className='empty'>
    <h2>Товарів немає</h2>
  </div>
);

export default function Header(props) {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactsOpen, setContactsOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [hoverUser, setHoverUser] = useState(false);

  // ✅ Ця функція викликається після успішного входу
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setHoverUser(false); // <-- додано: не показує "Вийти" одразу
    localStorage.setItem('user', JSON.stringify(userData));
    setAuthOpen(false);
    alert('Вхід успішний!');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    alert('Ви вийшли з акаунту');
  };

  return (
    <header>
      <div>
        <span className='logo'>House staff</span>
        <ul className='nav'>
          <li onClick={() => setAboutOpen(true)}>Про нас</li>
          <li onClick={() => setContactsOpen(true)}>Контакти</li>

          {!user ? (
            <li className='cabinet' onClick={() => setAuthOpen(true)}>Кабінет</li>
          ) : (
            <li
              className='cabinet'
              onMouseEnter={() => setHoverUser(true)}
              onMouseLeave={() => setHoverUser(false)}
            >
              {hoverUser ? (
                <button onClick={handleLogout} className='logout-button'>Вийти</button>
              ) : (
                user.name
              )}
            </li>
          )}
        </ul>
        <FaShoppingCart
          onClick={() => setCartOpen(!cartOpen)}
          className={`shop-cart-button ${cartOpen ? 'active' : ''}`}
        />
        {cartOpen && (
          <div className='shop-cart'>
            {props.orders.length > 0 ? showOrders(props) : showNothing()}
          </div>
        )}
      </div>

      <div className='presentation'></div>

      
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} onLoginSuccess={handleLoginSuccess} />}
      {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}
      {contactsOpen && <ContactsModal onClose={() => setContactsOpen(false)} />}
    </header>
  );
}
