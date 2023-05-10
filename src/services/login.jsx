import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentiales) => {
  const response = await axios.post(baseUrl, credentiales);
  return response.data;
};
export default { login };
