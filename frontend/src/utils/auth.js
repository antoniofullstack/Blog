// utils/auth.js
export const logout = () => {
  localStorage.removeItem('token'); // Remove o token de autenticação
  window.location.href = '/login'; // Redireciona para a página de login
};
