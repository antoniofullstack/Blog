// frontend/src/components/Header.jsx
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importe o hook de contexto
import './Header.css';

const Header = () => {
  const { pathname } = useLocation();
  const { auth, logout } = useAuth(); // Use o hook para acessar o contexto

  const getPathname = (path) => {
    return pathname === path ? 'active' : '';
  };

  return (
    <header>
      <nav>
        <Link to='/' className={getPathname('/')}>
          Home
        </Link>
        {!auth.isAuthenticated ? (
          <>
            <Link to='/register' className={getPathname('/register')}>
              Register
            </Link>
            <Link to='/login' className={getPathname('/login')}>
              Login
            </Link>
          </>
        ) : (
          <>
            <Link to='/posts' className={getPathname('/posts')}>
              Posts
            </Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
