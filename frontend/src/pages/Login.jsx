// frontend/src/components/Login.jsx
import { useState } from 'react';
import { loginUser } from '../api.js';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token } = await loginUser(formData);
    login(token);
    setFormData({ email: '', password: '' });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        name='email'
        placeholder='Email'
        onChange={handleChange}
      />
      <input
        type='password'
        name='password'
        placeholder='Password'
        onChange={handleChange}
      />
      <button type='submit'>Login</button>
    </form>
  );
}

export default Login;
