import Card from '../component/Card';
import './Landing.css';
import React, { useState, useEffect } from "react"; 

function Landing() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/people')
      .then(response => response.json())
      .then(data => {
        setContacts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []); 

  return (
    <div className="landing-container">
      {/* Top bar */}
      <div className="top-bar">
        <button className="add-member">+ Add New member</button>
        <span className="profile-icon">👤</span>
      </div>

      {/* Content */}
      <div className="content">
        <h1>Network</h1>
        <h2>Contact list</h2>

        <div className="search-box">
          <input placeholder="Searching" />
        </div>

        {/* 4. Show loading state or count */}
        {loading ? (
          <p>Loading contacts...</p>
        ) : (
          <p className="people-count">{contacts.length} people</p>
        )}

        <div className="card-list">
          {contacts.map(contact => (
            <Card
              key={contact.id}
              name={contact.name}
              name_th={contact.name_th}
              project={contact.project}
              location={contact.location}
              tags={contact.tags}
              email={contact.email}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Landing;