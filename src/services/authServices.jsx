import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { API } from '../constants/constants';

const authService = {
    login : async (email, password) => {
        const response = await axios.post(`${API.URL}/auth/login`, { email, password });
        return response.data.data;
    },
    logout: () => {
        localStorage.removeItem('jwtToken');
    },
    getUsername: () => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const payload = jwtDecode(token);
          return payload.name;
        }
        return null;
    },
    getUserGUID: () => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        const payload = jwtDecode(token);
        return payload.nameIdentifier;
      }
      return null;
  }

}

export default authService;

/*const login = async (email, password) => {
  const response = await axios.post('https://localhost:7211/api/auth/login', { email, password });
  return response.data.token;
};

const logout = () => {
  localStorage.removeItem('jwtToken');
};

const getUsername = () => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    const payload = jwt_decode(token);
    return payload.sub;
  }
  return null;
};*/

//export default { login, logout, getUsername };
