import axios from 'axios';
import { API } from '../constants/constants';

const getAuthHeaders = () => {
    const token = localStorage.getItem('jwtToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
};  

const userService = {
    getUsers: async () => {
        const response = await axios.get(`${API.URL}/users/list`, {
            headers: getAuthHeaders()
        });
        return response.data.data;
    },
    addUser: async (user) => {
        await axios.post(`${API.URL}/users/add`, user, {
            headers: getAuthHeaders()
        });
    },
    updateUser: async (user) => {
        await axios.put(`${API.URL}/users/update/${user.guid}`, user, {
            headers: getAuthHeaders()
        });
    },
    deleteUser: async (userGUID) => {
        await axios.delete(`${API.URL}/users/delete/${userGUID}`, {
            headers: getAuthHeaders()
        });
    }
}

export default userService;
