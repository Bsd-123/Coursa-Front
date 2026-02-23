import  { type User}  from '../types/user.types';
import axios from './axios';

const url = 'login';

export type RegisterType = Omit<User & { password: string }, 'id'>;

export const register = async (user: RegisterType) => {
  const response = await axios.post(`${url}/register`, user);
  const data = response.data;
  return data;
};

export type LoginType = { email: string; password: string };

export const login = async (credentials: LoginType) => {
  const response = await axios.post(`${url}/login`, credentials);
  const data = response.data;
  return data;
};

export const loginByToken = async (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  const response = await axios.get(`${url}/getUserByToken`);
  const data = response.data;
  return data;
};

//קוד משופר של הצ'אט
/*
import { type User } from '../types/user.types';
import axios from './axios';

const url = 'auth';

export type RegisterType = Omit<User & { password: string }, 'id'>;
export type LoginType = { email: string; password: string };

export const register = async (user: RegisterType) => {
  try {
    const response = await axios.post(`${url}/register`, user);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const login = async (credentials: LoginType) => {
  try {
    const response = await axios.post(`${url}/login`, credentials);
    // בדרך כלל כאן תקבלי את ה-Token והמשתמש
    return response.data; 
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const loginByToken = async (token: string) => {
  try {
    // עדכון ה-Token לקריאה הנוכחית ולבאות אחריה
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const response = await axios.get(`${url}/getUserByToken`);
    return response.data;
  } catch (error) {
    console.error("Token login failed:", error);
    // אם ה-Token פג תוקף, כדאי למחוק אותו מה-Header
    delete axios.defaults.headers.common.Authorization;
    throw error;
  }
};
*/