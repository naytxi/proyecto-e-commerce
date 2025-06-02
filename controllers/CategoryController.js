const { Category, Producto } = require('../models');

const CategoryController = {
  async create(req, res) {
    try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'El campo "name" es obligatorio' });
    }

    const existente = await Category.findOne({ where: { name } });
    if (existente) {
      return res.status(400).json({ message: 'La categoría ya existe' });
    }

    const newCategory = await Category.create({ name });
    res.status(201).json({ message: 'Categoría creada', newCategory });

  } catch (error) {
    res.status(500).json({ message: 'Error al crear categoría', error: error.message });
  }
},

  async getAll(req, res) {
    try {
      const categories = await Category.findAll({
        include: [{ model: Producto, as: 'productos' }]
      });
      res.send(categories);
    } catch (error) {
      console.error(error); 
      res.status(500).send({ message: 'Error al obtener categorías', error });
    }
  },

  async getById(req, res) {
    try {
      const oneCategory = await Category.findByPk(req.params.id, {
        include: [{ model: Producto, as: 'productos' }]
      });
      if (!oneCategory) return res.status(404).send({ message: 'No encontrada' });
      res.send(oneCategory);
    } catch (error) {
      res.status(500).send({ message: 'Error al buscar categoría', error });
    }
  },

  async getByName(req, res) {
    try {
      const results = await Category.findAll({
        where: { name: req.params.name },
        include: [{ model: Producto, as: 'productos' }]
      });
      res.send(results);
    } catch (error) {
      res.status(500).send({ message: 'Error al buscar por nombre', error });
    }
  },

  async update(req, res) {
    try {
      await Category.update(req.body, { where: { id: req.params.id } });
      res.send('Categoría actualizada');
    } catch (error) {
      res.status(500).send({ message: 'Error al actualizar', error });
    }
  },

  async delete(req, res) {
    try {
      await Category.destroy({ where: { id: req.params.id } });
      res.send('Categoría eliminada');
    } catch (error) {
      res.status(500).send({ message: 'Error al eliminar', error });
    }
  }
};

module.exports = CategoryController;
