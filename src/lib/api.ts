import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Adjust as needed
// const API_BASE_URL = 'https://staging.agilebeyond.net/api';

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withXSRFToken: true,
  withCredentials: true,  // VERY IMPORTANT: send cookies (CSRF token)
  headers: {
    Accept: "application/json",
  },
});


// Automatically attach token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Define the type for patient data
export interface PatientData {
  created_at?:   string | undefined;
  id?: number;
  user_id: number | null;
  dob: string;
  first_name: string;
  last_name: string;
  age: number;
  sex: string;
  address: string;
  telephone_number: string;
  chief_complaint: string;
  hpi: string;
  nos: string;
  pmhx: string;
  pe: string;
  lab_diagnostic: string;
  impression: string;
  treatment_plan: string;
  surgical_procedure: string;
  surgery_date: string;
  surgery_place: string;
  on_findings: string;
  histopath: string;
  anesthesiologist: string;
}

export const getCSRFToken = async () => {
  await axios.get(`http://localhost:8000/sanctum/csrf-cookie`, {
  // await axios.get(`https://staging.agilebeyond.net/sanctum/csrf-cookie`, {
    withCredentials: true,
  });
};
// Create new patient (token is automatically added)
export const createPatient = async (patientData: PatientData) => {
  await getCSRFToken();
  const response = await api.post('/patients', patientData);
  return response.data;
};

// Optional: login handler that stores token
export const login = async (email: string, password: string) => {
  await getCSRFToken();
  const response = await api.post('/login', { email, password });
  console.log("login", response.data);
  const {access_token, user} = response.data;
  localStorage.setItem('token', access_token);
  localStorage.setItem('user_id',user.id)
  return response.data;
};

export default api;
