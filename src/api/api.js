import axios from "axios";

export const BASE_URL =
  "https://doctor-api-backend-gj8y2zhv5-mohamedghanem2002s-projects.vercel.app";

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token from localStorage to each request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ========== USER ROUTES ==========

// Register a new user
export const registerUser = (data) => api.post("/user/register", data);

// User login
export const loginUser = (data) => api.post("/user/signin", data);

// ========== DOCTOR ROUTES ==========

// Add a new doctor (admin only)
export const addDoctor = (formData) =>
  api.post("/doctors/addDoctors", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Get all doctors
export const getAllDoctors = () => api.get("/doctors/allDoctors");

// Get total count of doctors
export const getDoctorsCount = () => api.get("/doctors/count");

// Get doctors by specialty
export const getDoctorsBySpecialty = (specialty) =>
  api.get(`/doctors/bySpecialty/${specialty}`);

// Get a specific doctor by ID
export const getDoctorById = (id) => api.get(`/doctors/${id}`);

// Delete a doctor (admin only)
export const deleteDoctor = (id) => api.delete(`/doctors/${id}`);

// ========== DEPARTMENT ROUTES ==========

// Add a new department (admin only)
export const addDepartment = (formData) =>
  api.post("/departments/addDepartments", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Get all departments
export const getAllDepartments = () => api.get("/departments/allDepartments");

// Get total count of departments
export const getDepartmentsCount = () => api.get("/departments/count");

// Delete a department (admin only)
export const deleteDepartment = (id) => api.delete(`/departments/${id}`);

// ========== APPOINTMENT ROUTES ==========

// Create a new appointment
export const createAppointment = (data) =>
  api.post("/appointments/createAppointment", data);

// Get all appointments for the current user
export const getMyAppointments = () => api.get("/appointments/myAppointments");

// Delete an appointment by ID
export const deleteAppointment = (id) =>
  api.delete(`/appointments/deleteAppointment/${id}`);

// ========== SERVER STATUS ==========

// Check if the backend server is running
export const checkServer = () => api.get("/");
