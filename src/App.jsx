import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Blogs from "./components/Blogs/listBlogs";
import Login from "./components/login/login";
import HeadBlog from "./components/Blogs/HeadBlog";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
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
      setUser(user);
      console.log("hola");
    }
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedAppBlog", JSON.stringify(user));
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
          <Blogs blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default App;
