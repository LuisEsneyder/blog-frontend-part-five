import Blog from "./blog";
const Blogs = ({ blogs, update }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog blog={blog} update={update} key={blog.id} />
      ))}
    </div>
  );
};
export default Blogs;
