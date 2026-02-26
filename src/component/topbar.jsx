import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './TopBar.css';
import ConfirmModal from './ConfirmModal';

const TopBar = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('role') === 'admin';
  const name = localStorage.getItem('name') || '';
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    navigate('/Login');
  };

  const closeMenu = () => setMenuOpen(false);

  const navLinkClass = ({ isActive }) =>
    `navbar-link${isActive ? ' navbar-link--active' : ''}`;

  return (
    <nav className='navbar' role='navigation' aria-label='Main navigation'>
      {/* Brand */}
      <NavLink to='/' className='navbar-brand' onClick={closeMenu}>
        Network App
      </NavLink>

      {/* Hamburger toggle (mobile) */}
      <button
        className={`navbar-hamburger${menuOpen ? ' is-open' : ''}`}
        onClick={() => setMenuOpen((o) => !o)}
        aria-label='Toggle menu'
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Menu */}
      <div className={`navbar-menu${menuOpen ? ' is-open' : ''}`}>
        {/* Nav links */}
        <ul className='navbar-links' role='list'>
          <li>
            <NavLink to='/' className={navLinkClass} end onClick={closeMenu}>
              Network
            </NavLink>
          </li>
          <li>
            <NavLink to='/addmember' className={navLinkClass} onClick={closeMenu}>
              + Add Member
            </NavLink>
          </li>
          {isAdmin && (
            <li>
              <NavLink to='/requirements' className={navLinkClass} onClick={closeMenu}>
                Requirements
              </NavLink>
            </li>
          )}
          {isAdmin && (
            <li>
              <NavLink to='/admin' className={navLinkClass} onClick={closeMenu}>
                Admin
              </NavLink>
            </li>
          )}
        </ul>

        {/* User section */}
        <div className='navbar-user'>
          {name && (
            <span className='navbar-username' title={isAdmin ? 'Admin' : 'User'}>
              <svg width='15' height='15' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                <circle cx='12' cy='7' r='4' stroke='currentColor' strokeWidth='2' />
              </svg>
              {name}
              {isAdmin && <span className='navbar-badge'>Admin</span>}
            </span>
          )}
          <button className='navbar-logout' onClick={() => setShowLogoutModal(true)}>
            Log out
          </button>
        </div>
      </div>

      {/* Logout confirmation modal */}
      {showLogoutModal && (
        <ConfirmModal
          title='Log out?'
          message='Are you sure you want to log out?'
          confirmLabel='Log out'
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </nav>
  );
};

export default TopBar;
