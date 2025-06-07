import axios from 'axios';

const API_BASE = "http://localhost:8080"; // Spring Boot server

const api = axios.create({
  baseURL: API_BASE
});

// Get all students
export const getStudents = async () => {
  const response = await api.get("/students");
  return Array.isArray(response.data) ? response.data : []; // Always return an array
};

// Get a single student
export const getStudent = async (rollNo) => {
  const response = await api.get(`/student/${rollNo}`);
  return response.data;
};

// Add a new student
export const addStudent = async (student) => {
  const response = await api.post("/student", student);
  return response.data;
};

// Update student
export const updateStudent = async (student) => {
  const response = await api.put("/student", student);
  return response.data;
};

// Delete student
export const deleteStudent = async (rollNo) => {
  const response = await api.delete(`/student/${rollNo}`);
  return response.data; // could be a message string
};
