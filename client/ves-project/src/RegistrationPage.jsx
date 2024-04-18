import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom if you're using React Router

const RegistrationPage = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const { username, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      };
      const response = await fetch('http://localhost:5000/register', requestOptions);

      if (!response.ok) {
        throw new Error('Registration failed');
      }
      
      console.log('User registered successfully');
      navigate('/space');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={e => onSubmit(e)}>
        <input type="text" placeholder="Username" name="username" value={username} onChange={e => onChange(e)} required />
        <input type="email" placeholder="Email" name="email" value={email} onChange={e => onChange(e)} required />
        <input type="password" placeholder="Password" name="password" value={password} onChange={e => onChange(e)} required />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p> {/* Link to the login page */}
    </div>
  );
};

export default RegistrationPage;
