import axios from "axios";
import { Todo } from "../interfaces/interfaces";

const BASE_URL = "http://localhost:5220/api"; // Asegúrate de usar tu URL correcta

export const TaskService = {
  getAllTasks: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/TaskModel`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTaskById: async (id: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/TaskModel/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createTask: async (task: Todo) => {
    try {
      const response = await axios.post(`${BASE_URL}/TaskModel`, task);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateTask: async (id: string, task: Todo) => {
    try {
      const response = await axios.put(`${BASE_URL}/TaskModel/${id}`, task);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteTask: async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/TaskModel/${id}`);
    } catch (error) {
      throw error;
    }
  },
};
