import { createPost } from '../api';

const Post = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const title = e.target[0].value;
    const content = e.target[1].value;
    createPost({ title, content }, token);
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
