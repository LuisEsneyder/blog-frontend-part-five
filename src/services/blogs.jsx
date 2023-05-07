import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const create = async (newBlog) => {
  const config = {
    headers: { authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};
const update = async (id, blogUpdate) => {
  const config = {
    headers: { authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, blogUpdate, config);
  return response.data;
};
const delet = async (id) => {
  const config = {
    headers: { authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};
export default { getAll, setToken, create, update, delet };
