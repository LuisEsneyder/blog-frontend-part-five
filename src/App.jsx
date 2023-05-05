import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Blogs from "./components/Blogs/listBlogs";
import Login from "./components/login/login";
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
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setPassword("");
      setUsername("");
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <div>
      <Login
        username={username}
        password={password}
        handlePassword={({ target }) => setPassword(target.value)}
        handleUsername={({ target }) => setUsername(target.value)}
        handleLogin={handleLogin}
      />
      {user && (
        <div>
          <h2>Blogs</h2>
          <div>{user.username} logged in</div>
          <div>
            <Blogs blogs={blogs} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
