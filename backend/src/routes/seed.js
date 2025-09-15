const express = require('express');
const { AdmUsuario, Marca, Categoria, Dispositivo, Usuario, Resena } = require('../models');
const { hashPassword } = require('../utils/jwt');

const router = express.Router();

// Seed database with test data
router.post('/seed', async (req, res) => {
  try {
    console.log('🌱 Starting database seeding...');

    // Seed ADM_Usuarios
    console.log('Creating admin users...');
    const hashedPassword = await hashPassword('contraseña_admin');
    const hashedPasswordInventario = await hashPassword('contraseña_inventario');

    await AdmUsuario.bulkCreate([
      {
        id: 1,
        usuario: 'admin_estantec',
        correo: 'admin@estantec.com',
        contrasena: 'contraseña_admin', // Plain text for now
        rol: 'super_admin',
        fecha_creacion: new Date('2025-01-01T08:00:00'),
        fecha_modificación: new Date('2025-01-01T08:00:00'),
        activo: true
      },
      {
        id: 2,
        usuario: 'inventario_estantec',
        correo: 'inventario@estantec.com',
        contrasena: 'contraseña_inventario', // Plain text for now
        rol: 'manager_inventario',
        fecha_creacion: new Date('2025-01-15T10:30:00'),
        fecha_modificación: new Date('2025-01-15T10:30:00'),
        activo: true
      }
    ], { ignoreDuplicates: true });

    // Seed Marcas
    console.log('Creating brands...');
    await Marca.bulkCreate([
      {
        id: 1,
        nombre: 'Apple',
        url_logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
        descripcion: 'Empresa líder en tecnología con productos innovadores y diseño premium',
        fecha_creacion: new Date('2025-01-01T08:00:00'),
        fecha_modificación: new Date('2025-01-01T08:00:00'),
        activo: true
      },
      {
        id: 2,
        nombre: 'Samsung',
        url_logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
        descripcion: 'Empresa surcoreana líder en electrónica de consumo y tecnología móvil',
        fecha_creacion: new Date('2025-01-01T08:00:00'),
        fecha_modificación: new Date('2025-01-01T08:00:00'),
        activo: true
      },
      {
        id: 3,
        nombre: 'Dell',
        url_logo: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg',
        descripcion: 'Empresa estadounidense especializada en computadoras y tecnología empresarial',
        fecha_creacion: new Date('2025-01-01T08:00:00'),
        fecha_modificación: new Date('2025-01-01T08:00:00'),
        activo: true
      },
      {
        id: 4,
        nombre: 'Lenovo',
        url_logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg',
        descripcion: 'Empresa china líder en computadoras portátiles y soluciones empresariales',
        fecha_creacion: new Date('2025-01-01T08:00:00'),
        fecha_modificación: new Date('2025-01-01T08:00:00'),
        activo: true
      },
      {
        id: 5,
        nombre: 'HP',
        url_logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/HP_New_Logo_2D.svg',
        descripcion: 'Hewlett-Packard, empresa estadounidense especializada en impresión y computadoras',
        fecha_creacion: new Date('2025-01-01T08:00:00'),
        fecha_modificación: new Date('2025-01-01T08:00:00'),
        activo: true
      },
      {
        id: 6,
        nombre: 'ASUS',
        url_logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg',
        descripcion: 'Empresa taiwanesa especializada en hardware de computadoras y electrónica',
        fecha_creacion: new Date('2025-01-01T08:00:00'),
        fecha_modificación: new Date('2025-01-01T08:00:00'),
        activo: true
      },
      {
        id: 7,
        nombre: 'Acer',
        url_logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Acer_2011.svg',
        descripcion: 'Empresa taiwanesa fabricante de computadoras y electrónica de consumo',
        fecha_creacion: new Date('2025-01-01T08:00:00'),
        fecha_modificación: new Date('2025-01-01T08:00:00'),
        activo: true
      },
      {
        id: 8,
        nombre: 'Sony',
        url_logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg',
        descripcion: 'Empresa japonesa multinacional en entretenimiento y electrónica',
        fecha_creacion: new Date('2025-01-01T08:00:00'),
        fecha_modificación: new Date('2025-01-01T08:00:00'),
        activo: true
      },
      {
        id: 9,
        nombre: 'MSI',
        url_logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/MSI_Logo.svg',
        descripcion: 'Empresa taiwanesa especializada en hardware para gaming y computadoras',
        fecha_creacion: new Date('2025-01-01T08:00:00'),
        fecha_modificación: new Date('2025-01-01T08:00:00'),
        activo: true
      },
      {
        id: 10,
        nombre: 'Huawei',
        url_logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Huawei_Logo.svg',
        descripcion: 'Empresa china líder en telecomunicaciones y dispositivos móviles',
        fecha_creacion: new Date('2025-01-01T08:00:00'),
        fecha_modificación: new Date('2025-01-01T08:00:00'),
        activo: true
      }
    ], { ignoreDuplicates: true });

    // Seed Categorias
    console.log('Creating categories...');
    await Categoria.bulkCreate([
      {
        id: 1,
        nombre: 'Smartphones',
        descripcion: 'Teléfonos inteligentes de última generación',
        fecha_creacion: new Date('2025-01-01T08:00:00'),
        fecha_modificación: new Date('2025-01-01T08:00:00'),
        activo: true
      },
      {
        id: 2,
        nombre: 'Laptops',
        descripcion: 'Computadoras portátiles para trabajo y gaming',
        fecha_creacion: new Date('2025-01-01T08:00:00'),
        fecha_modificación: new Date('2025-01-01T08:00:00'),
        activo: true
      },
      {
        id: 3,
        nombre: 'Tablets',
        descripcion: 'Tablets y dispositivos táctiles',
        fecha_creacion: new Date('2025-01-01T08:00:00'),
        fecha_modificación: new Date('2025-01-01T08:00:00'),
        activo: true
      }
    ], { ignoreDuplicates: true });

    // Seed Dispositivos
    console.log('Creating devices...');
    await Dispositivo.bulkCreate([
      {
        id: 1,
        nomre: 'iPhone 15 Pro',
        modelo: '15 Pro',
        id_marca: 1,
        id_categoria: 1,
        precio: 6999.99,
        descripcion: 'El iPhone más avanzado con chip A17 Pro y sistema de cámaras profesional.',
        especificaciones: 'Procesador: A17 Pro\nRAM: 8GB\nAlmacenamiento: 128GB/256GB/512GB/1TB\nPantalla: 6.1\'\' Super Retina XDR\nCámara: 48MP Principal + 12MP Ultra Angular + 12MP Teleobjetivo\nBatería: Hasta 23 horas de video\nOS: iOS 17',
        url_imagen: 'https://plus.unsplash.com/premium_photo-1680985551009-05107cd2752c?w=500&h=500&fit=crop',
        imagenes_galeria: JSON.stringify([
          'https://plus.unsplash.com/premium_photo-1680985551009-05107cd2752c?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1710023038502-ba80a70a9f53?w=500&h=500&fit=crop'
        ]),
        fecha_actualizacion: '2024-01-15',
        cantidad_stock: 50,
        estado_activo: true,
        calificacion_promedio: 4.8,
        total_reseñas: 245,
        fecha_creacion: new Date('2024-01-15T10:00:00'),
        fecha_modificación: new Date('2024-01-15T10:00:00')
      },
      {
        id: 2,
        nomre: 'MacBook Pro M3',
        modelo: 'M3 Pro',
        id_marca: 1,
        id_categoria: 2,
        precio: 7599.99,
        descripcion: 'Potencia profesional con el revolucionario chip M3 para los creadores más exigentes.',
        especificaciones: 'Procesador: Apple M3\nRAM: 8GB/16GB/32GB\nAlmacenamiento: 512GB/1TB/2TB SSD\nPantalla: 14\'\' Liquid Retina XDR\nGPU: Integrada de 10 núcleos\nBatería: Hasta 18 horas\nPuertos: 3x Thunderbolt 4, HDMI, SD',
        url_imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
        imagenes_galeria: JSON.stringify([
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop'
        ]),
        fecha_actualizacion: '2024-02-01',
        cantidad_stock: 25,
        estado_activo: true,
        calificacion_promedio: 4.9,
        total_reseñas: 189,
        fecha_creacion: new Date('2024-02-01T09:00:00'),
        fecha_modificación: new Date('2024-02-01T09:00:00')
      }
    ], { ignoreDuplicates: true });

    // Seed Usuarios
    console.log('Creating regular users...');
    const hashedUserPassword1 = await hashPassword('usuario123');
    const hashedUserPassword2 = await hashPassword('usuario456');

    await Usuario.bulkCreate([
      {
        id: 1,
        usuario: 'usuario1',
        correo: 'usuario1@example.com',
        contraseña: hashedUserPassword1,
        nombre_completo: 'Juan Pérez',
        telefono: '+57 300 123 4567',
        fecha_creacion: new Date('2025-01-20T12:00:00'),
        activo: true
      },
      {
        id: 2,
        usuario: 'usuario2',
        correo: 'usuario2@example.com',
        contraseña: hashedUserPassword2,
        nombre_completo: 'María García',
        telefono: '+57 301 987 6543',
        fecha_creacion: new Date('2025-01-25T14:30:00'),
        activo: true
      }
    ], { ignoreDuplicates: true });

    console.log('✅ Database seeded successfully!');
    res.json({
      message: 'Base de datos poblada exitosamente',
      data: {
        admin_users: 2,
        brands: 3,
        categories: 3,
        devices: 2,
        users: 2
      }
    });

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al poblar la base de datos',
      details: error.message
    });
  }
});

module.exports = router;