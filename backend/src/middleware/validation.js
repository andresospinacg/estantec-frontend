const Joi = require('joi');

// Validation schemas
const loginSchema = Joi.object({
  usuario: Joi.string().min(3).max(50).required(),
  contrasena: Joi.string().min(6).required()
});

const marcaSchema = Joi.object({
  nombre: Joi.string().min(1).max(100).required(),
  url_logo: Joi.string().uri().allow('').optional(),
  descripcion: Joi.string().max(1000).allow('').optional()
});

const marcaUpdateSchema = Joi.object({
  nombre: Joi.string().min(1).max(100).optional(),
  url_logo: Joi.string().uri().allow('').optional(),
  descripcion: Joi.string().max(1000).allow('').optional()
});

const categoriaSchema = Joi.object({
  nombre: Joi.string().min(1).max(100).required(),
  descripcion: Joi.string().max(1000).allow('').optional()
});

const dispositivoSchema = Joi.object({
  nomre: Joi.string().min(1).max(200).required(),
  modelo: Joi.string().max(100).allow('').optional(),
  id_marca: Joi.number().integer().positive().required(),
  id_categoria: Joi.number().integer().positive().required(),
  precio: Joi.number().positive().precision(2).required(),
  descripcion: Joi.string().max(2000).allow('').optional(),
  especificaciones: Joi.string().max(5000).allow('').optional(),
  url_imagen: Joi.string().uri().allow('').optional(),
  imagenes_galeria: Joi.string().allow('').optional(), // JSON string
  fecha_actualizacion: Joi.date().iso().allow('').optional(),
  cantidad_stock: Joi.number().integer().min(0).default(0)
});

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        error: 'Datos de entrada inválidos',
        message: 'Por favor verifica los datos enviados',
        details: errors
      });
    }

    next();
  };
};

module.exports = {
  validate,
  schemas: {
    login: loginSchema,
    marca: marcaSchema,
    marcaUpdate: marcaUpdateSchema,
    categoria: categoriaSchema,
    dispositivo: dispositivoSchema
  }
};