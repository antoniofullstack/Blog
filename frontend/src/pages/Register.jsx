import { useState } from 'react';
import { registerUser } from '../api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerUser(formData);
    console.log(result);
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='name'
        placeholder='Name'
        onChange={handleChange}
      />
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
      <button type='submit'>Register</button>
    </form>
  );
}

export default Register;
