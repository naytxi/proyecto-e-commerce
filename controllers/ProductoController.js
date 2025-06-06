const { Producto, Category, Review, User } = require('../models')
const { Op } = require('sequelize')

const ProductoController = {

 async create(req, res) {
  const { name, price, categoryIds } = req.body
  const image = req.file ? req.file.filename : null

  if (!name || !price || !categoryIds) {
    return res.status(400).json({
      message: 'Todos los campos son obligatorios.'
    });
  }

  try {
    const producto = await Producto.create({ name, price, image })
    await producto.addCategories(categoryIds)

    const productoConCategorias = await Producto.findByPk(producto.id, {
      include: { model: Category, as: 'categories' }
    })

    res.status(201).json(productoConCategorias)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto', error: error.message })
  }
}
,

 async update(req, res) {
  const { id } = req.params
  const { name, price, categoryIds } = req.body
  const image = req.file ? req.file.filename : null

  try {
    const producto = await Producto.findByPk(id)
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' })

    await producto.update({ name, price, image: image || producto.image })

    if (Array.isArray(categoryIds)) {
      await producto.setCategories(categoryIds)
    }

    const productoConCategorias = await Producto.findByPk(id, {
      include: { model: Category, as: 'categories' }
    })

    res.json(productoConCategorias)
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar producto', error: error.message })
  }
}
,

  async delete(req, res) {
    const { id } = req.params

    try {
      const producto = await Producto.findByPk(id)
      if (!producto) return res.status(404).json({ message: 'Producto no encontrado' })

      await producto.destroy()
      res.json({ message: 'Producto eliminado correctamente' })
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar producto', error: error.message })
    }
  },

  async getAll(req, res) {
    const { name, price, orden } = req.query
    let where = {}

    if (name) where.name = { [Op.like]: `%${name}%` }
    if (price) where.price = price

    try {
      const productos = await Producto.findAll({
        where,
        include: [
           { model: Category, as: 'categories' },
           { model: Review, as: 'reviews', include: { model: User, as: 'user', attributes: ['id', 'name'] } }
      ],
        order: orden === 'desc' ? [['price', 'DESC']] : orden === 'asc' ? [['price', 'ASC']] : undefined
      })

      res.json(productos)
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener productos', error: error.message })
    }
  },

  async getById(req, res) {
    const { id } = req.params

    try {
      const producto = await Producto.findByPk(id, {
        include: [
           { model: Category, as: 'categories' },
           { model: Review, as: 'reviews', include: { model: User, as: 'user', attributes: ['id', 'name'] } }
      ]
      });

      res.json(producto)
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener producto', error: error.message })
    }
  }
}

module.exports = ProductoController
