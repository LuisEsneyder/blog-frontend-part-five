const FormBlog = ({
  handleAddBlog,
  blogTitle,
  blogAuthor,
  blogUrl,
  handleBlogAutor,
  handleBlogTitle,
  handleBlogUrl,
}) => {
  return (
    <div>
      <h3>Create new blog</h3>
      <form onSubmit={handleAddBlog}>
        <div>
          title:
          <input type="text" value={blogTitle} onChange={handleBlogTitle} />
        </div>
        <div>
          author:
          <input type="text" value={blogAuthor} onChange={handleBlogAutor} />
        </div>
        <div>
          url:
          <input type="text" value={blogUrl} onChange={handleBlogUrl} />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  );
};
export default FormBlog;
