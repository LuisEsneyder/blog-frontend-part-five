import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import Blogs from "./components/Blogs/listBlogs";
const App = () => {
  const [blogs, setBlogs] = useState([]);
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
  return (
    <div>
      <Blogs blogs={blogs} />
    </div>
  );
};

export default App;
