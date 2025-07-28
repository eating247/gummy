import axios from 'axios';
import {
  ApiResponse,
  DumpsterType,
  MaterialType,
  ServiceArea,
} from '../types/api';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    throw error;
  }
);

export class GummyAPI {
  // Health check
  static async healthCheck(): Promise<ApiResponse> {
    const response = await apiClient.get<ApiResponse>('/health');
    return response.data;
  }

  // Get all dumpster types
  static async getDumpsterTypes(): Promise<DumpsterType[]> {
    const response = await apiClient.get<ApiResponse<DumpsterType[]>>(
      '/api/dumpster-types'
    );
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch dumpster types');
    }
    return response.data.data;
  }

  // Get all material types
  static async getMaterialTypes(): Promise<MaterialType[]> {
    const response = await apiClient.get<ApiResponse<MaterialType[]>>(
      '/api/material-types'
    );
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch material types');
    }
    return response.data.data;
  }

  // Get all service areas
  static async getServiceAreas(): Promise<ServiceArea[]> {
    const response =
      await apiClient.get<ApiResponse<ServiceArea[]>>('/api/service-areas');
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch service areas');
    }
    return response.data.data;
  }
}
