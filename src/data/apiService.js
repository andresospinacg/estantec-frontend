// API Service for EstanTec e-commerce
const API_BASE_URL = '/api';

// Helper function to get auth token from localStorage (if implemented later)
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Marcas API
export const marcasAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/marcas${queryString ? `?${queryString}` : ''}`);
  },

  getById: (id) => apiRequest(`/marcas/${id}`),

  create: (marca) => apiRequest('/marcas', {
    method: 'POST',
    body: JSON.stringify(marca),
  }),

  update: (id, marca) => apiRequest(`/marcas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(marca),
  }),

  delete: (id) => apiRequest(`/marcas/${id}`, {
    method: 'DELETE',
  }),
};

// Categorías API
export const categoriasAPI = {
  getAll: () => apiRequest('/categorias'),
  getById: (id) => apiRequest(`/categorias/${id}`),
  create: (categoria) => apiRequest('/categorias', {
    method: 'POST',
    body: JSON.stringify(categoria),
  }),
  update: (id, categoria) => apiRequest(`/categorias/${id}`, {
    method: 'PUT',
    body: JSON.stringify(categoria),
  }),
  delete: (id) => apiRequest(`/categorias/${id}`, {
    method: 'DELETE',
  }),
};

// Dispositivos API
export const dispositivosAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/dispositivos${queryString ? `?${queryString}` : ''}`);
  },

  getById: (id) => apiRequest(`/dispositivos/${id}`),

  create: (dispositivo) => apiRequest('/dispositivos', {
    method: 'POST',
    body: JSON.stringify(dispositivo),
  }),

  update: (id, dispositivo) => apiRequest(`/dispositivos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dispositivo),
  }),

  delete: (id) => apiRequest(`/dispositivos/${id}`, {
    method: 'DELETE',
  }),
};

// Auth API (for future implementation)
export const authAPI = {
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),

  logout: () => apiRequest('/auth/logout', {
    method: 'POST',
  }),

  refreshToken: (refreshToken) => apiRequest('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refresh_token: refreshToken }),
  }),

  getProfile: () => apiRequest('/auth/profile'),
};

// Helper functions to transform API data to match frontend expectations
export const transformDispositivoFromAPI = (dispositivo) => {
  let imagenes_galeria = [];

  try {
    // Handle Sequelize JSON serialization
    if (typeof dispositivo.imagenes_galeria === 'string') {
      // The field comes as a JSON string from Sequelize, parse it
      imagenes_galeria = JSON.parse(dispositivo.imagenes_galeria);
    } else if (Array.isArray(dispositivo.imagenes_galeria)) {
      imagenes_galeria = dispositivo.imagenes_galeria;
    }
  } catch (error) {
    console.warn('Error parsing imagenes_galeria:', error, dispositivo.imagenes_galeria);
    imagenes_galeria = [];
  }

  return {
    ...dispositivo,
    // Ensure imagenes_galeria is an array
    imagenes_galeria,
    // Map nomre to name for consistency
    name: dispositivo.nomre,
    rating: dispositivo.calificacion_promedio,
  };
};

export const transformMarcaFromAPI = (marca) => marca;

export const transformCategoriaFromAPI = (categoria) => categoria;