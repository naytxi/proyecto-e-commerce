'use strict'
const { Model } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
static associate(models) {
  User.hasMany(models.Pedido, {
    foreignKey: 'usersId',
    as: 'pedidos'
  });

  User.hasMany(models.Review, {
    foreignKey: 'userId',
    as: 'reviews'
  });

  User.hasMany(models.Token, {
    foreignKey: 'userId',
    as: 'tokens'
  });
}

  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El nombre es obligatorio' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Debe ser un email válido' },
        notEmpty: { msg: 'El email no puede estar vacío' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 100],
          msg: 'La contraseña debe tener al menos 6 caracteres'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
      validate: {
        isIn: {
          args: [['user', 'admin']],
          msg: 'El rol debe ser user o admin'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user) => {
        const hash = await bcrypt.hash(user.password, 10)
        user.password = hash
      }
    }
  })

  return User
}
