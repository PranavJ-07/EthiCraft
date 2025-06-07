import axios from 'axios';

const API_BASE = "http://localhost:8080"; // Spring Boot server base URL

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Get all students
export const getStudents = async () => {
  try {
    const response = await api.get("/students");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};

// Get a single student by roll number
export const getStudent = async (rollNo) => {
  try {
    const response = await api.get(`/student/${rollNo}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching student with roll no ${rollNo}:`, error);
    throw error;
  }
};

// Add a new student (expects JSON body)
export const addStudent = async (student) => {
  try {
    const response = await api.post("/student", student);
    return response.data;
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
};

// Update existing student
export const updateStudent = async (student) => {
  try {
    const response = await api.put("/student", student);
    return response.data;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

// Delete student by roll number
export const deleteStudent = async (rollNo) => {
  try {
    const response = await api.delete(`/student/${rollNo}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting student with roll no ${rollNo}:`, error);
    throw error;
  }
};
