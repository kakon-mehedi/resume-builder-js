import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
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

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// CV API calls
export const cvApi = {
  // Get all CVs
  getAll: async (userId = 'anonymous') => {
    try {
      const response = await api.get(`/cv?userId=${userId}`);
      return response.data;
    } catch (error) {
      toast.error('Failed to fetch CVs');
      throw error;
    }
  },

  // Get CV by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/cv/${id}`);
      return response.data;
    } catch (error) {
      toast.error('Failed to fetch CV');
      throw error;
    }
  },

  // Create new CV
  create: async (cvData) => {
    try {
      const response = await api.post('/cv', cvData);
      toast.success('CV saved successfully!');
      return response.data;
    } catch (error) {
      toast.error('Failed to save CV');
      throw error;
    }
  },

  // Update CV
  update: async (id, cvData) => {
    try {
      const response = await api.put(`/cv/${id}`, cvData);
      toast.success('CV updated successfully!');
      return response.data;
    } catch (error) {
      toast.error('Failed to update CV');
      throw error;
    }
  },

  // Delete CV
  delete: async (id) => {
    try {
      await api.delete(`/cv/${id}`);
      toast.success('CV deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete CV');
      throw error;
    }
  },

  // Duplicate CV
  duplicate: async (id) => {
    try {
      const response = await api.post(`/cv/${id}/duplicate`);
      toast.success('CV duplicated successfully!');
      return response.data;
    } catch (error) {
      toast.error('Failed to duplicate CV');
      throw error;
    }
  }
};

// PDF API calls
export const pdfApi = {
  // Generate PDF
  generatePDF: async (cvData, template = 'modern') => {
    try {
      const response = await api.post('/pdf/generate', 
        { cvData, template }, 
        { responseType: 'blob' }
      );
      
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${cvData.personalInfo.name || 'CV'}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('PDF generated successfully!');
    } catch (error) {
      toast.error('Failed to generate PDF');
      throw error;
    }
  }
};

export default api;