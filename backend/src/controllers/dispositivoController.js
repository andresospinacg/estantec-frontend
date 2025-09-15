const { Dispositivo, Marca, Categoria, Resena } = require('../models');
const { sequelize } = require('../config/database');

const getAllDispositivos = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      marca = '',
      categoria = '',
      precio_min = '',
      precio_max = '',
      sort_by = 'fecha_actualizacion',
      sort_order = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;

    const whereClause = {
      estado_activo: true
    };

    // Search filter
    if (search) {
      whereClause[require('sequelize').Op.or] = [
        { nomre: { [require('sequelize').Op.like]: `%${search}%` } },
        { modelo: { [require('sequelize').Op.like]: `%${search}%` } }
      ];
    }

    // Marca filter
    if (marca) {
      whereClause.id_marca = marca;
    }

    // Categoria filter
    if (categoria) {
      whereClause.id_categoria = categoria;
    }

    // Price filters
    if (precio_min) {
      whereClause.precio = {
        ...whereClause.precio,
        [require('sequelize').Op.gte]: parseFloat(precio_min)
      };
    }

    if (precio_max) {
      whereClause.precio = {
        ...whereClause.precio,
        [require('sequelize').Op.lte]: parseFloat(precio_max)
      };
    }

    const { count, rows: dispositivos } = await Dispositivo.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Marca,
          as: 'marca',
          where: { activo: true },
          required: true
        },
        {
          model: Categoria,
          as: 'categoria',
          where: { activo: true },
          required: true
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sort_by, sort_order.toUpperCase()]]
    });

    res.json({
      dispositivos,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get all dispositivos error:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al obtener los dispositivos'
    });
  }
};

const getDispositivoById = async (req, res) => {
  try {
    const { id } = req.params;

    const dispositivo = await Dispositivo.findOne({
      where: {
        id: id,
        estado_activo: true
      },
      include: [
        {
          model: Marca,
          as: 'marca',
          where: { activo: true },
          required: true
        },
        {
          model: Categoria,
          as: 'categoria',
          where: { activo: true },
          required: true
        },
        {
          model: Resena,
          as: 'resenas',
          where: { activo: true },
          required: false,
          include: [{
            model: require('../models').Usuario,
            as: 'usuario',
            where: { activo: true },
            required: true
          }]
        }
      ]
    });

    if (!dispositivo) {
      return res.status(404).json({
        error: 'Dispositivo no encontrado',
        message: 'El dispositivo solicitado no existe'
      });
    }

    res.json({ dispositivo });

  } catch (error) {
    console.error('Get dispositivo by id error:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al obtener el dispositivo'
    });
  }
};

const createDispositivo = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      nomre,
      modelo,
      id_marca,
      id_categoria,
      precio,
      descripcion,
      especificaciones,
      url_imagen,
      imagenes_galeria,
      fecha_actualizacion,
      cantidad_stock
    } = req.body;

    // Validate foreign keys
    const marca = await Marca.findOne({
      where: { id: id_marca, activo: true },
      transaction
    });

    if (!marca) {
      await transaction.rollback();
      return res.status(400).json({
        error: 'Marca inválida',
        message: 'La marca especificada no existe'
      });
    }

    const categoria = await Categoria.findOne({
      where: { id: id_categoria, activo: true },
      transaction
    });

    if (!categoria) {
      await transaction.rollback();
      return res.status(400).json({
        error: 'Categoría inválida',
        message: 'La categoría especificada no existe'
      });
    }

    const nuevoDispositivo = await Dispositivo.create({
      nomre,
      modelo,
      id_marca,
      id_categoria,
      precio: parseFloat(precio),
      descripcion,
      especificaciones,
      url_imagen,
      imagenes_galeria: imagenes_galeria ? JSON.parse(imagenes_galeria) : null,
      fecha_actualizacion,
      cantidad_stock: parseInt(cantidad_stock) || 0
    }, { transaction });

    await transaction.commit();

    // Fetch the created dispositivo with associations
    const dispositivoCompleto = await Dispositivo.findByPk(nuevoDispositivo.id, {
      include: [
        { model: Marca, as: 'marca' },
        { model: Categoria, as: 'categoria' }
      ]
    });

    res.status(201).json({
      message: 'Dispositivo creado exitosamente',
      dispositivo: dispositivoCompleto
    });

  } catch (error) {
    await transaction.rollback();
    console.error('Create dispositivo error:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al crear el dispositivo'
    });
  }
};

const updateDispositivo = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const updateData = req.body;

    const dispositivo = await Dispositivo.findOne({
      where: {
        id: id,
        estado_activo: true
      },
      transaction
    });

    if (!dispositivo) {
      await transaction.rollback();
      return res.status(404).json({
        error: 'Dispositivo no encontrado',
        message: 'El dispositivo a actualizar no existe'
      });
    }

    // Validate foreign keys if they're being updated
    if (updateData.id_marca) {
      const marca = await Marca.findOne({
        where: { id: updateData.id_marca, activo: true },
        transaction
      });

      if (!marca) {
        await transaction.rollback();
        return res.status(400).json({
          error: 'Marca inválida',
          message: 'La marca especificada no existe'
        });
      }
    }

    if (updateData.id_categoria) {
      const categoria = await Categoria.findOne({
        where: { id: updateData.id_categoria, activo: true },
        transaction
      });

      if (!categoria) {
        await transaction.rollback();
        return res.status(400).json({
          error: 'Categoría inválida',
          message: 'La categoría especificada no existe'
        });
      }
    }

    // Prepare update data
    const dataToUpdate = {
      ...updateData,
      fecha_modificacion: new Date()
    };

    if (dataToUpdate.imagenes_galeria) {
      dataToUpdate.imagenes_galeria = JSON.parse(dataToUpdate.imagenes_galeria);
    }

    if (dataToUpdate.precio) {
      dataToUpdate.precio = parseFloat(dataToUpdate.precio);
    }

    if (dataToUpdate.cantidad_stock) {
      dataToUpdate.cantidad_stock = parseInt(dataToUpdate.cantidad_stock);
    }

    await dispositivo.update(dataToUpdate, { transaction });

    await transaction.commit();

    // Fetch updated dispositivo with associations
    const dispositivoActualizado = await Dispositivo.findByPk(id, {
      include: [
        { model: Marca, as: 'marca' },
        { model: Categoria, as: 'categoria' }
      ]
    });

    res.json({
      message: 'Dispositivo actualizado exitosamente',
      dispositivo: dispositivoActualizado
    });

  } catch (error) {
    await transaction.rollback();
    console.error('Update dispositivo error:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al actualizar el dispositivo'
    });
  }
};

const deleteDispositivo = async (req, res) => {
  try {
    const { id } = req.params;

    const dispositivo = await Dispositivo.findOne({
      where: {
        id: id,
        estado_activo: true
      }
    });

    if (!dispositivo) {
      return res.status(404).json({
        error: 'Dispositivo no encontrado',
        message: 'El dispositivo a eliminar no existe'
      });
    }

    // Soft delete
    await dispositivo.update({
      estado_activo: false,
      fecha_modificacion: new Date()
    });

    res.json({
      message: 'Dispositivo eliminado exitosamente'
    });

  } catch (error) {
    console.error('Delete dispositivo error:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Error al eliminar el dispositivo'
    });
  }
};

module.exports = {
  getAllDispositivos,
  getDispositivoById,
  createDispositivo,
  updateDispositivo,
  deleteDispositivo
};