const HeadBlog = ({ user, loged }) => {
  return (
    <div>
      <h2>Blogs</h2>
      {user.username} logged in <button onClick={loged}>logout</button>
    </div>
  );
};
export default HeadBlog;
