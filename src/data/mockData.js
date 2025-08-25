// Datos simulados basados en el diagrama entidad relación que se adjunta junto a este proyecto

// Tabla ADM_Usuarios
export const mockAdmUsuarios = [
  {
    id: 1,
    usuario: "admin_estantec",
    correo: "admin@estantec.com",
    contraseña: "contraseña_admin",
    rol: "super_admin",
    fecha_creacion: "2025-01-01T08:00:00",
    fecha_modificacion: "2025-01-01T08:00:00"
  },
  {
    id: 2,
    usuario: "inventario_estantec",
    correo: "inventario@estantec.com",
    contraseña: "contraseña_inventario",
    rol: "manager_inventario",
    fecha_creacion: "2025-01-15T10:30:00",
    fecha_modificacion: "2025-01-15T10:30:00"
  }
];

// Tabla Marcas
export const mockMarcas = [
  {
    id: 1,
    nombre: "Apple",
    url_logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    descripcion: "Empresa líder en tecnología con productos innovadores y diseño premium",
    fecha_creacion: "2025-01-01T08:00:00",
    fecha_modificacion: "2025-01-01T08:00:00"
  },
  {
    id: 2,
    nombre: "Samsung",
    url_logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
    descripcion: "Empresa surcoreana líder en electrónica de consumo y tecnología móvil",
    fecha_creacion: "2025-01-01T08:00:00",
    fecha_modificacion: "2025-01-01T08:00:00"
  },
  {
    id: 3,
    nombre: "Dell",
    url_logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg",
    descripcion: "Empresa estadounidense especializada en computadoras y tecnología empresarial",
    fecha_creacion: "2025-01-01T08:00:00",
    fecha_modificacion: "2025-01-01T08:00:00"
  },
  {
    id: 4,
    nombre: "Lenovo",
    url_logo: "https://upload.wikimedia.org/wikipedia/commons/8/85/Lenovo_logo_2015.svg",
    descripcion: "Empresa multinacional de tecnología con sede en China",
    fecha_creacion: "2025-01-01T08:00:00",
    fecha_modificacion: "2025-01-01T08:00:00"
  },
  {
    id: 5,
    nombre: "HP",
    url_logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg",
    descripcion: "Hewlett-Packard, empresa líder en impresoras y computadoras",
    fecha_creacion: "2025-01-01T08:00:00",
    fecha_modificacion: "2025-01-01T08:00:00"
  },
  {
    id: 6,
    nombre: "Sony",
    url_logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Sony_logo.svg",
    descripcion: "Empresa japonesa líder en electrónica de consumo y entretenimiento",
    fecha_creacion: "2025-01-01T08:00:00",
    fecha_modificacion: "2025-01-01T08:00:00"
  }
];

// Tabla Categorías
export const mockCategorias = [
  {
    id: 1,
    nombre: "Smartphones",
    descripcion: "Teléfonos inteligentes de última generación",
    fecha_creacion: "2025-01-01T08:00:00",
    fecha_modificacion: "2025-01-01T08:00:00"
  },
  {
    id: 2,
    nombre: "Laptops",
    descripcion: "Computadoras portátiles para trabajo y gaming",
    fecha_creacion: "2025-01-01T08:00:00",
    fecha_modificacion: "2025-01-01T08:00:00"
  },
  {
    id: 3,
    nombre: "Tablets",
    descripcion: "Tablets y dispositivos táctiles",
    fecha_creacion: "2025-01-01T08:00:00",
    fecha_modificacion: "2025-01-01T08:00:00"
  },
  {
    id: 4,
    nombre: "Audio",
    descripcion: "Auriculares, altavoces y dispositivos de audio",
    fecha_creacion: "2025-01-01T08:00:00",
    fecha_modificacion: "2025-01-01T08:00:00"
  },
  {
    id: 5,
    nombre: "Accesorios",
    descripcion: "Accesorios y complementos para dispositivos",
    fecha_creacion: "2025-01-01T08:00:00",
    fecha_modificacion: "2025-01-01T08:00:00"
  }
];

// Tabla Dispositivos
export const mockDispositivos = [
  {
    id: 1,
    nomre: "iPhone 15 Pro", // Según el diagrama entidad relación
    modelo: "15 Pro",
    id_marca: 1, // FK a Marcas.id (Apple)
    id_categoria: 1, // FK a Categorías.id (Smartphones)
    precio: 6999.99,
    descripcion: "El iPhone más avanzado con chip A17 Pro y sistema de cámaras profesional.",
    especificaciones: "Procesador: A17 Pro\nRAM: 8GB\nAlmacenamiento: 128GB/256GB/512GB/1TB\nPantalla: 6.1'' Super Retina XDR\nCámara: 48MP Principal + 12MP Ultra Angular + 12MP Teleobjetivo\nBatería: Hasta 23 horas de video\nOS: iOS 17",
    url_imagen: "https://plus.unsplash.com/premium_photo-1680985551009-05107cd2752c?w=500&h=500&fit=crop",
    imagenes_galeria: [      
      "https://plus.unsplash.com/premium_photo-1680985551009-05107cd2752c?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1710023038502-ba80a70a9f53?w=500&h=500&fit=crop"
    ],
    fecha_actualizacion: "2024-01-15",
    cantidad_stock: 50,
    estado_activo: true,
    calificacion_promedio: 4.8,
    total_reseñas: 245,
    fecha_creacion: "2024-01-15T10:00:00",
    fecha_modificacion: "2024-01-15T10:00:00"
  },
  {
    id: 2,
    nomre: "MacBook Pro M3",
    modelo: "M3 Pro",
    id_marca: 1, // Apple
    id_categoria: 2, // Laptops
    precio: 7599.99,
    descripcion: "Potencia profesional con el revolucionario chip M3 para los creadores más exigentes.",
    especificaciones: "Procesador: Apple M3\nRAM: 8GB/16GB/32GB\nAlmacenamiento: 512GB/1TB/2TB SSD\nPantalla: 14'' Liquid Retina XDR\nGPU: Integrada de 10 núcleos\nBatería: Hasta 18 horas\nPuertos: 3x Thunderbolt 4, HDMI, SD",
    url_imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
    imagenes_galeria: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop"
    ],
    fecha_actualizacion: "2024-02-01",
    cantidad_stock: 25,
    estado_activo: true,
    calificacion_promedio: 4.9,
    total_reseñas: 189,
    fecha_creacion: "2024-02-01T09:00:00",
    fecha_modificacion: "2024-02-01T09:00:00"
  },
  {
    id: 3,
    nomre: "Samsung Galaxy S24 Ultra",
    modelo: "S24 Ultra",
    id_marca: 2, // Samsung
    id_categoria: 1, // Smartphones
    precio: 6199.99,
    descripcion: "El smartphone Android más avanzado con S Pen integrado y cámaras de 200MP.",
    especificaciones: "Procesador: Snapdragon 8 Gen 3\nRAM: 12GB/16GB\nAlmacenamiento: 256GB/512GB/1TB\nPantalla: 6.8'' Dynamic AMOLED 2X\nCámara: 200MP Principal + 50MP Periscopio + 12MP Ultra Angular + 10MP Teleobjetivo\nBatería: 5000mAh\nOS: Android 14",
    url_imagen: "https://images.unsplash.com/photo-1709744722656-9b850470293f?w=300&h=300&fit=crop",
    imagenes_galeria: [
        "https://images.unsplash.com/photo-1709744722656-9b850470293f?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1705585174953-9b2aa8afc174?w=500&h=500&fit=crop"
      
    ],
    fecha_actualizacion: "2024-01-24",
    cantidad_stock: 40,
    estado_activo: true,
    calificacion_promedio: 4.7,
    total_reseñas: 312,
    fecha_creacion: "2024-01-24T11:00:00",
    fecha_modificacion: "2024-01-24T11:00:00"
  },
  {
    id: 4,
    nomre: "Dell XPS 13",
    modelo: "XPS 13 Plus",
    id_marca: 3, // Dell
    id_categoria: 2, // Laptops
    precio: 1099.99,
    descripcion: "Ultrabook premium con diseño infinito y rendimiento excepcional.",
    especificaciones: "Procesador: Intel Core i7-1360P\nRAM: 16GB\nAlmacenamiento: 512GB SSD\nPantalla: 13.4'' FHD+\nGPU: Intel Iris Xe\nBatería: Hasta 12 horas\nPeso: 1.24kg",
    url_imagen: "https://images.unsplash.com/photo-1622118757715-90fc40a1d68f?w=300&h=300&fit=crop",
    imagenes_galeria: [
      "https://images.unsplash.com/photo-1622118757715-90fc40a1d68f?w=500&h=500&fit=crop"
    ],
    fecha_actualizacion: "2023-12-15",
    cantidad_stock: 30,
    estado_activo: true,
    calificacion_promedio: 4.6,
    total_reseñas: 156,
    fecha_creacion: "2023-12-15T14:00:00",
    fecha_modificacion: "2023-12-15T14:00:00"
  },
  {
    id: 5,
    nomre: "iPad Pro M2",
    modelo: "iPad Pro 11''",
    id_marca: 1, // Apple
    id_categoria: 3, // Tablets
    precio: 1799.99,
    descripcion: "La tablet más avanzada con chip M2 y compatibilidad con Apple Pencil.",
    especificaciones: "Procesador: Apple M2\nRAM: 8GB/16GB\nAlmacenamiento: 128GB/256GB/512GB/1TB/2TB\nPantalla: 11'' Liquid Retina\nCámara: 12MP Principal + 10MP Ultra Angular\nBatería: Hasta 10 horas\nConectividad: Wi-Fi 6E + 5G",
    url_imagen: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop",
    imagenes_galeria: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop"
    ],
    fecha_actualizacion: "2023-11-20",
    cantidad_stock: 35,
    estado_activo: true,
    calificacion_promedio: 4.8,
    total_reseñas: 98,
    fecha_creacion: "2023-11-20T16:00:00",
    fecha_modificacion: "2023-11-20T16:00:00"
  },
  {
    id: 6,
    nomre: "AirPods Pro 2",
    modelo: "AirPods Pro 2da Gen",
    id_marca: 1, // Apple
    id_categoria: 4, // Audio
    precio: 249.99,
    descripcion: "Auriculares inalámbricos con cancelación de ruido adaptativa de siguiente nivel.",
    especificaciones: "Driver: Personalizado de Apple\nChip: H2\nANC: Cancelación de ruido adaptativa\nBatería: 6h (30h con estuche)\nConectividad: Bluetooth 5.3\nCaracterísticas: Audio Espacial, Transparencia Adaptativa\nResistencia: IPX4",
    url_imagen: "https://images.unsplash.com/photo-1610438235354-a6ae5528385c?w=300&h=300&fit=crop",
    imagenes_galeria: [
      "https://images.unsplash.com/photo-1610438235354-a6ae5528385c?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1644746770655-de4a1a3d5fd0?w=500&h=500&fit=crop"
    ],
    fecha_actualizacion: "2023-10-10",
    cantidad_stock: 100,
    estado_activo: true,
    calificacion_promedio: 4.7,
    total_reseñas: 423,
    fecha_creacion: "2023-10-10T12:00:00",
    fecha_modificacion: "2023-10-10T12:00:00"
  }
];

// Tabla Usuarios
export const mockUsuarios = [
  {
    id: 1,
    usuario: "maria_garcia",
    correo: "maria.garcia@email.com",
    contraseña: "contraseña789",
    nombre_completo: "María García",
    telefono: "+57 300 123 4567",
    fecha_creacion: "2024-01-10T15:30:00",
    fecha_modificacion: "2024-01-10T15:30:00"
  },
  {
    id: 2,
    usuario: "carlos_lopez",
    correo: "carlos.lopez@email.com",
    contraseña: "contraseña101",
    nombre_completo: "Carlos López",
    telefono: "+57 310 987 6543",
    fecha_creacion: "2024-01-12T09:15:00",
    fecha_modificacion: "2024-01-12T09:15:00"
  },
  {
    id: 3,
    usuario: "ana_rodriguez",
    correo: "ana.rodriguez@email.com",
    contraseña: "contraseña112",
    nombre_completo: "Ana Rodríguez",
    telefono: "+57 315 456 7890",
    fecha_creacion: "2024-01-15T11:45:00",
    fecha_modificacion: "2024-01-15T11:45:00"
  },
  {
    id: 4,
    usuario: "luis_martin",
    correo: "luis.martin@email.com",
    contraseña: "contraseña131",
    nombre_completo: "Luis Martín",
    telefono: "+57 320 111 2222",
    fecha_creacion: "2024-01-18T14:20:00",
    fecha_modificacion: "2024-01-18T14:20:00"
  },
  {
    id: 5,
    usuario: "sofia_herrera",
    correo: "sofia.herrera@email.com",
    contraseña: "contraseña415",
    nombre_completo: "Sofia Herrera",
    telefono: "+57 325 333 4444",
    fecha_creacion: "2024-01-20T16:10:00",
    fecha_modificacion: "2024-01-20T16:10:00"
  }
];

// Tabla Reseñas
export const mockResenas = [
  {
    id: 1,
    id_dispositivo: 1, // FK a Dispositivos.id (iPhone 15 Pro)
    id_usuario: 1, // FK a Usuarios.id (María García)
    calificacion: 5,
    titulo: "Excelente calidad de cámara y rendimiento",
    comentario: "Excelente calidad de cámara y rendimiento. Vale cada peso. La batería dura todo el día y las fotos son impresionantes.",
    fecha_creacion: "2024-03-15T10:30:00",
    fecha_modificacion: "2024-03-15T10:30:00"
  },
  {
    id: 2,
    id_dispositivo: 1, // iPhone 15 Pro
    id_usuario: 2, // Carlos López
    calificacion: 4,
    titulo: "Muy bueno pero un poco costoso",
    comentario: "Muy bueno pero un poco costoso. La batería dura todo el día y el rendimiento es excelente.",
    fecha_creacion: "2024-03-10T14:20:00",
    fecha_modificacion: "2024-03-10T14:20:00"
  },
  {
    id: 3,
    id_dispositivo: 2, // MacBook Pro M3
    id_usuario: 3, // Ana Rodríguez
    calificacion: 5,
    titulo: "Perfecta para diseño gráfico",
    comentario: "Perfecta para diseño gráfico. El chip M3 es increíblemente rápido y la pantalla es espectacular.",
    fecha_creacion: "2024-03-12T09:45:00",
    fecha_modificacion: "2024-03-12T09:45:00"
  },
  {
    id: 4,
    id_dispositivo: 3, // Samsung Galaxy S24 Ultra
    id_usuario: 4, // Luis Martín
    calificacion: 5,
    titulo: "El mejor Android que he tenido",
    comentario: "El mejor Android que he tenido. La cámara es impresionante y el S Pen es muy útil.",
    fecha_creacion: "2024-03-08T16:15:00",
    fecha_modificacion: "2024-03-08T16:15:00"
  },
  {
    id: 5,
    id_dispositivo: 4, // Dell XPS 13
    id_usuario: 5, // Sofia Herrera
    calificacion: 4,
    titulo: "Excelente para trabajo y estudio",
    comentario: "Excelente para trabajo y estudio. Muy ligera y elegante. El rendimiento es muy bueno.",
    fecha_creacion: "2024-03-05T11:30:00",
    fecha_modificacion: "2024-03-05T11:30:00"
  }
];

// Funciones helper para obtener datos relacionados
export const getMarcaById = (id) => {
  return mockMarcas.find(marca => marca.id === id);
};

export const getCategoriaById = (id) => {
  return mockCategorias.find(categoria => categoria.id === id);
};

export const getUsuarioById = (id) => {
  return mockUsuarios.find(usuario => usuario.id === id);
};

export const getResenasByDispositivoId = (dispositivoId) => {
  return mockResenas.filter(resena => resena.id_dispositivo === dispositivoId);
};

// Función para obtener dispositivo con datos relacionados
export const getDispositivoCompleto = (dispositivo) => {
  const marca = getMarcaById(dispositivo.id_marca);
  const categoria = getCategoriaById(dispositivo.id_categoria);
  const resenas = getResenasByDispositivoId(dispositivo.id);
  
  return {
    ...dispositivo,
    marca: marca,
    categoria: categoria,
    resenas: resenas
  };
};
