import { useState, useEffect } from 'react';
import { listAllPosts } from '../../api';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    listAllPosts().then((data) => {
      setPosts(data);
    });
  };

  const formatarData = (data) => {
    return format(new Date(data), "dd 'de' MMMM 'de' yyyy HH:mm", {
      locale: ptBR,
    });
  };

  return (
    <div>
      <h1>Blog</h1>
      {posts.map((post) => (
        <div key={post.id} className='post'>
          <h2 className='post__title'>{post.title}</h2>
          <p className='post__content'>{post.content}</p>
          <p className='post__author'>{post.author}</p>
          <p className='post__date'>{formatarData(post.created_at)}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
