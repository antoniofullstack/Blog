// frontend/src/components/Register.jsx
import { useState } from 'react';
import { registerUser } from '../api';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerUser(formData);
    console.log(result);
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
