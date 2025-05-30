const { Category, Producto } = require('../models');

const CategoryController = {
  async create(req, res) {
    try {
      const newCategory = await Category.create(req.body);
      res.status(201).send({ message: 'Categoría creada', newCategory });
    } catch (error) {
      res.status(500).send({ message: 'Error al crear categoría', error });
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
      const oneCategory = await category.findByPk(req.params.id, {
        include: [{ model: producto, as: 'productos' }]
      });
      if (!oneCategory) return res.status(404).send({ message: 'No encontrada' });
      res.send(oneCategory);
    } catch (error) {
      res.status(500).send({ message: 'Error al buscar categoría', error });
    }
  },

  async getByName(req, res) {
    try {
      const results = await category.findAll({
        where: { name: req.params.name },
        include: [{ model: producto, as: 'productos' }]
      });
      res.send(results);
    } catch (error) {
      res.status(500).send({ message: 'Error al buscar por nombre', error });
    }
  },

  async update(req, res) {
    try {
      await category.update(req.body, { where: { id: req.params.id } });
      res.send('Categoría actualizada');
    } catch (error) {
      res.status(500).send({ message: 'Error al actualizar', error });
    }
  },

  async delete(req, res) {
    try {
      await category.destroy({ where: { id: req.params.id } });
      res.send('Categoría eliminada');
    } catch (error) {
      res.status(500).send({ message: 'Error al eliminar', error });
    }
  }
};

module.exports = CategoryController;
