import { useState } from "react";
const Blog = ({ blog, update, user, delet }) => {
  const [visible, setVisible] = useState(false);
  const hideBlogDetail = { display: visible ? "none" : "" };
  const showBlogDetail = { display: visible ? "" : "none" };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWdth: 1,
    marginBottom: 5,
  };
  const togglableVisible = () => {
    setVisible(!visible);
  };
  const blogUpdate = () => {
    const blogUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    update(blog.id, blogUpdate);
  };
  const del = () => {
    if (window.confirm(`Removed blog ${blog.title} by ${blog.author}`)) {
      delet(blog.id);
    }
  };
  return (
    <div style={blogStyle}>
      <div style={hideBlogDetail}>
        {blog.title}
        <button onClick={togglableVisible}>view</button>
      </div>
      <div style={showBlogDetail}>
        {blog.title}
        <button onClick={togglableVisible}>hide</button>
        <p>{blog.url}</p>
        <p>
          likes: {blog.likes} <button onClick={blogUpdate}>like</button>
        </p>
        <p>{blog.author}</p>
        <p>{user.id === blog.user && <button onClick={del}>remove</button>}</p>
      </div>
    </div>
  );
};
export default Blog;
