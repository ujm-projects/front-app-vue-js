import axios from 'axios';
import { API_HOST } from '../config';
export default {
    get: function (path) {
        return axios.get(`${API_HOST}${path}`);
        // let windows = response.data;
        // return windows;
    }
}