const { Marca } = require('../models');

const getAllMarcas = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {
      activo: true
    };

    if (search) {
      whereClause.nombre = {
        [require('sequelize').Op.like]: `%${search}%`
      };
    }

    const { count, rows: marcas } = await Marca.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['nombre', 'ASC']]
    });

    res.json({
      marcas,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get all marcas error:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al obtener las marcas'
    });
  }
};

const getMarcaById = async (req, res) => {
  try {
    const { id } = req.params;

    const marca = await Marca.findOne({
      where: {
        id: id,
        activo: true
      }
    });

    if (!marca) {
      return res.status(404).json({
        error: 'Marca no encontrada',
        message: 'La marca solicitada no existe'
      });
    }

    res.json({ marca });

  } catch (error) {
    console.error('Get marca by id error:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al obtener la marca'
    });
  }
};

const createMarca = async (req, res) => {
  try {
    const { nombre, url_logo, descripcion } = req.body;

    // Check if marca already exists
    const existingMarca = await Marca.findOne({
      where: { nombre: nombre }
    });

    if (existingMarca) {
      return res.status(400).json({
        error: 'Marca ya existe',
        message: 'Ya existe una marca con ese nombre'
      });
    }

    const nuevaMarca = await Marca.create({
      nombre,
      url_logo,
      descripcion
    });

    res.status(201).json({
      message: 'Marca creada exitosamente',
      marca: nuevaMarca
    });

  } catch (error) {
    console.error('Create marca error:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al crear la marca'
    });
  }
};

const updateMarca = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, url_logo, descripcion } = req.body;

    const marca = await Marca.findOne({
      where: {
        id: id,
        activo: true
      }
    });

    if (!marca) {
      return res.status(404).json({
        error: 'Marca no encontrada',
        message: 'La marca a actualizar no existe'
      });
    }

    // Check if new name conflicts with another marca
    if (nombre && nombre !== marca.nombre) {
      const existingMarca = await Marca.findOne({
        where: { nombre: nombre }
      });

      if (existingMarca) {
        return res.status(400).json({
          error: 'Nombre ya existe',
          message: 'Ya existe otra marca con ese nombre'
        });
      }
    }

    await marca.update({
      nombre: nombre || marca.nombre,
      url_logo: url_logo !== undefined ? url_logo : marca.url_logo,
      descripcion: descripcion !== undefined ? descripcion : marca.descripcion,
      fecha_modificacion: new Date()
    });

    res.json({
      message: 'Marca actualizada exitosamente',
      marca
    });

  } catch (error) {
    console.error('Update marca error:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al actualizar la marca'
    });
  }
};

const deleteMarca = async (req, res) => {
  try {
    const { id } = req.params;

    const marca = await Marca.findOne({
      where: {
        id: id,
        activo: true
      }
    });

    if (!marca) {
      return res.status(404).json({
        error: 'Marca no encontrada',
        message: 'La marca a eliminar no existe'
      });
    }

    // Soft delete
    await marca.update({
      activo: false,
      fecha_modificacion: new Date()
    });

    res.json({
      message: 'Marca eliminada exitosamente'
    });

  } catch (error) {
    console.error('Delete marca error:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al eliminar la marca'
    });
  }
};

module.exports = {
  getAllMarcas,
  getMarcaById,
  createMarca,
  updateMarca,
  deleteMarca
};