import { createPost } from '../api';
import { useNavigate } from 'react-router-dom';

const Post = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const title = e.target[0].value;
    const content = e.target[1].value;
    createPost({ title, content }, token);
    navigate('/');
  };

  return (
    <div>
      <h1>Post</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Title' />
        <textarea name='' id='' cols='30' rows='10'></textarea>
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default Post;
