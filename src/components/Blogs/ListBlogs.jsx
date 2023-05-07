import Blog from "./blog";
const ListBlogs = ({ blogs, update, user, delet }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          blog={blog}
          update={update}
          key={blog.id}
          user={user}
          delet={delet}
        />
      ))}
    </div>
  );
};
export default ListBlogs;
