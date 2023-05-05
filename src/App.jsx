import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Blogs from "./components/Blogs/listBlogs";
import Login from "./components/login/login";
import HeadBlog from "./components/Blogs/HeadBlog";
import FormBlog from "./components/Blogs/FormBlog";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  useEffect(() => {
    const getAllBlog = async () => {
      const response = await blogService.getAll();
      setBlogs(response);
      return response;
    };
    try {
      getAllBlog();
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedAppBlog");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedAppBlog", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setPassword("");
      setUsername("");
    } catch (error) {
      console.log("error");
    }
  };
  const logout = () => {
    window.localStorage.removeItem("loggedAppBlog");
    setUser(null);
  };
  const handleAddBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title: blogTitle,
        url: blogUrl,
        author: blogAuthor,
      };
      const addBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(addBlog));
      setBlogAuthor("");
      setBlogTitle("");
      setBlogUrl("");
    } catch (error) {
      setBlogAuthor("");
      setBlogTitle("");
      setBlogUrl("");
    }
  };
  return (
    <div>
      {!user && (
        <div>
          <h2>log in to application</h2>
          <Login
            username={username}
            password={password}
            handlePassword={({ target }) => setPassword(target.value)}
            handleUsername={({ target }) => setUsername(target.value)}
            handleLogin={handleLogin}
          />
        </div>
      )}
      {user && (
        <div>
          <HeadBlog user={user} loged={logout} />
          <FormBlog
            blogTitle={blogTitle}
            blogUrl={blogUrl}
            blogAuthor={blogAuthor}
            handleBlogTitle={({ target }) => setBlogTitle(target.value)}
            handleBlogAutor={({ target }) => setBlogAuthor(target.value)}
            handleBlogUrl={({ target }) => setBlogUrl(target.value)}
            handleAddBlog={handleAddBlog}
          />
          <Blogs blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default App;
