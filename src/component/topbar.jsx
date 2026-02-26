import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopBar.css';

const TopBar = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('role') === 'admin';
  const name = localStorage.getItem('name') || '';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    navigate('/Login');
  };

  return (
    <div className='top-bar'>
      <button className='add-member' onClick={() => navigate('/addmember')}>
        + Add New member
      </button>
      <div className='top-bar-right'>
        {isAdmin && (
          <span
            className='profile-icon'
            onClick={() => navigate('/admin')}
            style={{ cursor: 'pointer' }}>
            👤 {name}
          </span>
        )}
        {!isAdmin && name && (
          <span className='user-name'>{name}</span>
        )}
        <button className='logout-btn' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopBar;
