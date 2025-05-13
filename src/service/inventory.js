import apiClient from './api';

export const getInventory = () => apiClient.get('/inventory');
