const { Categoria } = require('../models');

const getAllCategorias = async (req, res) => {
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

    const { count, rows: categorias } = await Categoria.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['nombre', 'ASC']]
    });

    res.json({
      categorias,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get all categorias error:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al obtener las categorías'
    });
  }
};

const getCategoriaById = async (req, res) => {
  try {
    const { id } = req.params;

    const categoria = await Categoria.findOne({
      where: {
        id: id,
        activo: true
      }
    });

    if (!categoria) {
      return res.status(404).json({
        error: 'Categoría no encontrada',
        message: 'La categoría solicitada no existe'
      });
    }

    res.json({ categoria });

  } catch (error) {
    console.error('Get categoria by id error:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al obtener la categoría'
    });
  }
};

const createCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    // Check if categoria already exists
    const existingCategoria = await Categoria.findOne({
      where: { nombre: nombre }
    });

    if (existingCategoria) {
      return res.status(400).json({
        error: 'Categoría ya existe',
        message: 'Ya existe una categoría con ese nombre'
      });
    }

    const nuevaCategoria = await Categoria.create({
      nombre,
      descripcion
    });

    res.status(201).json({
      message: 'Categoría creada exitosamente',
      categoria: nuevaCategoria
    });

  } catch (error) {
    console.error('Create categoria error:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al crear la categoría'
    });
  }
};

const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const categoria = await Categoria.findOne({
      where: {
        id: id,
        activo: true
      }
    });

    if (!categoria) {
      return res.status(404).json({
        error: 'Categoría no encontrada',
        message: 'La categoría a actualizar no existe'
      });
    }

    // Check if new name conflicts with another categoria
    if (nombre && nombre !== categoria.nombre) {
      const existingCategoria = await Categoria.findOne({
        where: { nombre: nombre }
      });

      if (existingCategoria) {
        return res.status(400).json({
          error: 'Nombre ya existe',
          message: 'Ya existe otra categoría con ese nombre'
        });
      }
    }

    await categoria.update({
      nombre: nombre || categoria.nombre,
      descripcion: descripcion !== undefined ? descripcion : categoria.descripcion,
      fecha_modificacion: new Date()
    });

    res.json({
      message: 'Categoría actualizada exitosamente',
      categoria
    });

  } catch (error) {
    console.error('Update categoria error:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al actualizar la categoría'
    });
  }
};

const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const categoria = await Categoria.findOne({
      where: {
        id: id,
        activo: true
      }
    });

    if (!categoria) {
      return res.status(404).json({
        error: 'Categoría no encontrada',
        message: 'La categoría a eliminar no existe'
      });
    }

    // Soft delete
    await categoria.update({
      activo: false,
      fecha_modificacion: new Date()
    });

    res.json({
      message: 'Categoría eliminada exitosamente'
    });

  } catch (error) {
    console.error('Delete categoria error:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al eliminar la categoría'
    });
  }
};

module.exports = {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria
};