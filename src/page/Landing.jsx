import Card from '../component/Card';
import './Landing.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Landing() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/Login');
  };

  useEffect(() => {
    // fetch('http://localhost:3000/api/people')
    fetch(`${process.env.REACT_APP_API_URL}/api/people`)
      .then((response) => response.json())
      .then((data) => {
        setContacts(
          Array.isArray(data) ? data : data.data ?? data.people ?? []
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='landing-container'>
      <div className='top-bar'>
        <button className='add-member'>+ Add New member</button>
        <div className='top-bar-right'>
          <span className='profile-icon'>👤</span>
          <button className='logout-btn' onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className='content'>
        <h1>Network</h1>
        <h2>Contact list</h2>

        <div className='search-box'>
          <input placeholder='Searching' />
        </div>

        {loading ? (
          <p>Loading contacts...</p>
        ) : (
          <p className='people-count'>{contacts.length} people</p>
        )}

        <div className='card-list'>
          {contacts.map((contact) => (
            /* 2. Wrap Card with Link using the dynamic ID */
            <Link
              to={`/member/${contact._id}`}
              key={contact._id}
              style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card
                name={contact.name}
                name_th={contact.name_th}
                project={contact.project}
                location={contact.location}
                tags={contact.tags}
                email={contact.email}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Landing;
