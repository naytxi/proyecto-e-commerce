const { Review, Producto, User } = require('../models');

const ReviewController = {
  async create(req, res) {
    const { comentario, puntuacion, productoId } = req.body;

    if (!comentario || !puntuacion || !productoId) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    try {
      const review = await Review.create({
        comentario,
        puntuacion,
        productoId,
        userId: req.user.id 
      });

      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear review', detalle: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const reviews = await Review.findAll({
        include: [
          { model: User, as: 'user', attributes: ['id', 'name'] },
          { model: Producto, as: 'producto', attributes: ['id', 'name'] }
        ]
      });
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener reviews', detalle: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const review = await Review.findByPk(id);
      if (!review) return res.status(404).json({ error: 'Review no encontrada' });

      await review.destroy();
      res.json({ message: 'Review eliminada' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar review' });
    }
  }
};

module.exports = ReviewController;
