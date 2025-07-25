import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: '',
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const { username, email, phone, dob } = formData;

  if (!username) {
    alert('Please fill out the username.');
    return;
  }

  if (email && !email.includes('@')) {
    alert('Invalid email. Please check your email address.');
    return;
  }

  if (!email) {
    alert('Please fill out the email.');
    return;
  }

  if (phone && !/^\d{10}$/.test(phone)) {
    alert('Invalid phone number. Please enter a 10-digit phone number.');
    return;
  }

  if (!phone) {
    alert('Please fill out the phone number.');
    return;
  }

  if (dob) {
    const selectedDate = new Date(dob);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    if (selectedDate > today) {
      alert('Invalid date of birth. Please enter a valid date.');
      return;
    }
  }

  if (!dob) {
    alert('Please fill out the date of birth.');
    return;
  }

  setFormData({
    username: '',
    email: '',
    phone: '',
    dob: '',
  });

  handleCloseModal();
};


  return (
    <div className="App">
      <button onClick={handleOpenModal}>Open Form</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <h2>User Form</h2>
            <form onSubmit={handleSubmit}>
              <input id="username" placeholder="Username" value={formData.username} onChange={handleChange} />
              <input id="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              <input id="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
              <input id="dob" type="date" value={formData.dob} onChange={handleChange} />
              <button type="submit" className="submit-button">Submit</button>
            </form>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
