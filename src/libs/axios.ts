import axios from 'axios';

import { Env } from './env';

const axiosInstance = axios.create({
  baseURL: Env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
