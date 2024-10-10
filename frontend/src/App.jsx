import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home/Home';
import Post from './pages/Post';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/posts' element={<Post />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
