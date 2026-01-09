import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Replace with your actual API base URL
const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid - logout user
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userData');
            // TODO: Navigate to login screen
        }
        return Promise.reject(error);
    }
);

// API Service Functions
export const apiService = {
    // Auth APIs
    auth: {
        login: (email, password) => api.post('/auth/login', { email, password }),
        register: (userData) => api.post('/auth/register', userData),
        logout: () => api.post('/auth/logout'),
    },

    // Site APIs
    sites: {
        getAll: () => api.get('/sites'),
        getById: (id) => api.get(`/sites/${id}`),
        create: (siteData) => api.post('/sites', siteData),
        update: (id, siteData) => api.put(`/sites/${id}`, siteData),
        delete: (id) => api.delete(`/sites/${id}`),
    },

    // Attendance APIs
    attendance: {
        getAll: (siteId, date) => api.get(`/attendance?siteId=${siteId}&date=${date}`),
        create: (attendanceData) => api.post('/attendance', attendanceData),
        update: (id, attendanceData) => api.put(`/attendance/${id}`, attendanceData),
        getMonthly: (siteId, month, year) =>
            api.get(`/attendance/monthly?siteId=${siteId}&month=${month}&year=${year}`),
    },

    // Expense APIs
    expenses: {
        getAll: (siteId, date) => api.get(`/expenses?siteId=${siteId}&date=${date}`),
        create: (expenseData) => api.post('/expenses', expenseData),
        update: (id, expenseData) => api.put(`/expenses/${id}`, expenseData),
        delete: (id) => api.delete(`/expenses/${id}`),
        getTotal: (siteId, startDate, endDate) =>
            api.get(`/expenses/total?siteId=${siteId}&startDate=${startDate}&endDate=${endDate}`),
    },

    // Material APIs
    materials: {
        getAll: (siteId) => api.get(`/materials?siteId=${siteId}`),
        create: (materialData) => api.post('/materials', materialData),
        update: (id, materialData) => api.put(`/materials/${id}`, materialData),
        delete: (id) => api.delete(`/materials/${id}`),
        getStock: (siteId) => api.get(`/materials/stock?siteId=${siteId}`),
    },

    // Labour Work APIs
    labour: {
        getAll: (siteId) => api.get(`/labour?siteId=${siteId}`),
        create: (labourData) => api.post('/labour', labourData),
        update: (id, labourData) => api.put(`/labour/${id}`, labourData),
        delete: (id) => api.delete(`/labour/${id}`),
        getTotal: (siteId, startDate, endDate) =>
            api.get(`/labour/total?siteId=${siteId}&startDate=${startDate}&endDate=${endDate}`),
    },

    // Measurement APIs
    measurements: {
        getAll: (siteId) => api.get(`/measurements?siteId=${siteId}`),
        create: (measurementData) => api.post('/measurements', measurementData),
        update: (id, measurementData) => api.put(`/measurements/${id}`, measurementData),
        delete: (id) => api.delete(`/measurements/${id}`),
    },

    // Billing APIs
    billing: {
        createInvoice: (invoiceData) => api.post('/billing/invoice', invoiceData),
        createAbstract: (abstractData) => api.post('/billing/abstract', abstractData),
        createMainBill: (billData) => api.post('/billing/main', billData),
        getInvoices: (siteId) => api.get(`/billing/invoices?siteId=${siteId}`),
        getById: (id) => api.get(`/billing/${id}`),
    },

    // Payment APIs
    payments: {
        getAll: (siteId) => api.get(`/payments?siteId=${siteId}`),
        create: (paymentData) => api.post('/payments', paymentData),
        getBalance: (siteId) => api.get(`/payments/balance?siteId=${siteId}`),
    },

    // Machine APIs
    machines: {
        getAll: (siteId) => api.get(`/machines?siteId=${siteId}`),
        create: (machineData) => api.post('/machines', machineData),
        update: (id, machineData) => api.put(`/machines/${id}`, machineData),
        delete: (id) => api.delete(`/machines/${id}`),
        getRentTotal: (siteId, startDate, endDate) =>
            api.get(`/machines/rent?siteId=${siteId}&startDate=${startDate}&endDate=${endDate}`),
    },

    // Dashboard APIs
    dashboard: {
        getMetrics: () => api.get('/dashboard/metrics'),
        getSiteMetrics: (siteId) => api.get(`/dashboard/site/${siteId}`),
    },
};

export default api;
