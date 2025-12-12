import axios from 'axios';

const API_URL = 'http://localhost:5000/api/budget';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Get all budget entries
export const getAllBudgets = async () => {
    const response = await api.get('/');
    return response.data;
};

// Create a new budget entry
export const createBudget = async (budgetData) => {
    const response = await api.post('/', budgetData);
    return response.data;
};

// Update a budget entry
export const updateBudget = async (id, budgetData) => {
    const response = await api.put(`/${id}`, budgetData);
    return response.data;
};

// Delete a budget entry
export const deleteBudget = async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data;
};

// Get budget statistics
export const getBudgetStats = async () => {
    const response = await api.get('/stats');
    return response.data;
};

export default api;
