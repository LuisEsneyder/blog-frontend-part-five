import { useState, useEffect } from "react";
import axios from "axios";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const getAllBlog = async () => {
      const response = await axios.get("http://localhost:3003/api/blogs");
      setBlogs(response.data);
      return response;
    };
    try {
      getAllBlog();
    } catch (error) {
      console.error(error);
    }
  }, []);
  return <div>Hola, soy App</div>;
};

export default App;
