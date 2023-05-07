import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import ListBlogs from "./components/Blogs/listBlogs";
import Login from "./components/login/login";
import HeadBlog from "./components/Blogs/HeadBlog";
import FormBlog from "./components/Blogs/FormBlog";
import Error from "./components/Error";
import Notificacion from "./components/Notificacion";
import Togglable from "./components/Togglable";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notificacion, setNotificacion] = useState(null);
  const [error, setError] = useState(null);
  const refBlogForm = useRef();
  useEffect(() => {
    const getAllBlog = async () => {
      const response = await blogService.getAll();
      setBlogs(response);
      return response;
    };
    try {
      getAllBlog();
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError(null);
      }, 5000);
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
  const handleLogin = async (objectLogin) => {
    try {
      const user = await loginService.login(objectLogin);
      window.localStorage.setItem("loggedAppBlog", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };
  const logout = () => {
    window.localStorage.removeItem("loggedAppBlog");
    setUser(null);
  };
  const handleAddBlog = async (objectBlog) => {
    try {
      refBlogForm.current.togglableVisible();
      const addBlog = await blogService.create(objectBlog);
      setBlogs(blogs.concat(addBlog));
      setNotificacion(`a new blog ${addBlog.title} by ${addBlog.author}`);
      setTimeout(() => {
        setNotificacion(null);
      }, 5000);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };
  const likeSumaBlog = async (id, object) => {
    try {
      const blogUpdate = await blogService.update(id, object);
      setBlogs(blogs.map((ele) => (ele.id !== id ? ele : blogUpdate)));
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };
  const delet = async (id) => {
    try {
      await blogService.delet(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      setNotificacion(`remove blog`);
      setTimeout(() => {
        setNotificacion(null);
      }, 5000);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };
  return (
    <div>
      <Notificacion mensaje={notificacion} />
      <Error mensaje={error} />
      {!user && (
        <div>
          <h2>log in to application</h2>
          <Togglable buttonLabel="log in">
            <Login handleLogin={handleLogin} />
          </Togglable>
        </div>
      )}
      {user && (
        <div>
          <HeadBlog user={user} loged={logout} />
          <Togglable buttonLabel="new blog" ref={refBlogForm}>
            <FormBlog handleAddBlog={handleAddBlog} />
          </Togglable>
          <ListBlogs
            blogs={blogs.sort((a, b) => b.likes - a.likes)}
            update={likeSumaBlog}
            user={user}
            delet={delet}
          />
        </div>
      )}
    </div>
  );
};

export default App;
