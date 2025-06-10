// hooks/useAuth.ts
// import api from '@/lib/api';

// export const login = async (email: string, password: string) => {
//   try {
//     const response = await api.post('/login', { email, password });

//     const token = response.data.token;
//     localStorage.setItem('token', token); // Save token to localStorage

//     return { success: true };
//   } catch (error: any) {
//     console.error('Login failed:', error.response?.data);
//     return { success: false, message: error.response?.data.message || 'Login failed' };
//   }
// };
import { login as apiLogin } from '@/lib/api';

export const login = async (email: string, password: string) => {
  try {
    const data = await apiLogin(email, password);
    return { success: true, data };
  } catch (error: any) {
    console.error('Login failed:', error.response?.data || error.message);
    return { success: false, message: error.response?.data?.message || 'Login failed' };
  }
};