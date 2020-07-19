import axios from 'axios';
import { CHAT_API_URL } from '../utils/api-settings';

const userToken = localStorage.getItem('user');

export default axios.create({
  baseURL: CHAT_API_URL,
  headers: { authorization: userToken },
});
