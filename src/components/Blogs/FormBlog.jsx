import { useState } from "react";
const FormBlog = ({ handleAddBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAutor] = useState("");
  const [url, setUrl] = useState("");
  const addBlog = (e) => {
    e.preventDefault();
    const objecBlog = {
      title,
      author,
      url,
    };
    handleAddBlog(objecBlog);
    setAutor("");
    setTitle("");
    setUrl("");
  };
  return (
    <div>
      <h3>Create new blog</h3>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAutor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  );
};
export default FormBlog;
