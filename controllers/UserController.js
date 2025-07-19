const { User, Pedido, Producto, Token } = require('../models'); // Importa Pedido y Token
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = 'secreto123'; // ¡Recuerda usar variables de entorno para esto!

const UserController = {
  // Función para registrar un nuevo usuario
  async registrar(req, res) {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
      const userExistente = await User.findOne({ where: { email } });
      if (userExistente) {
        return res.status(409).json({ error: 'El email ya está en uso' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const nuevoUsuario = await User.create({
        name,
        email,
        password: hashedPassword,
        role
      });

      res.status(201).json({ mensaje: 'Usuario creado correctamente', userId: nuevoUsuario.id });
    } catch (err) {
      console.error('Error en registrar:', err);
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  },

  // Función para iniciar sesión
  async login(req, res) {
    const { email, password } = req.body;
    console.log('Intento de login para email:', email); // Log para depuración

    try {
      const usuario = await User.findOne({ where: { email } });

      if (!usuario) {
        console.log('Usuario no encontrado para email:', email); // Log para depuración
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      console.log('Usuario encontrado. Comparando contraseñas...'); // Log para depuración
      // console.log('Contraseña recibida:', password); // Cuidado con loguear contraseñas en producción

      const isMatch = await bcrypt.compare(password, usuario.password);

      if (!isMatch) {
        console.log('Contraseña incorrecta para usuario:', email); // Log para depuración
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      console.log('Login exitoso para usuario:', email); // Log para depuración

      const token = jwt.sign(
        { id: usuario.id, email: usuario.email, role: usuario.role },
        SECRET,
        { expiresIn: '1h' }
      );

      // Guardamos el token en la tabla Tokens (si es necesario para gestión de sesiones)
      // await Token.create({ userId: usuario.id, token }); // Descomenta si usas la tabla Token

      res.json({ mensaje: 'Login exitoso', token, user: { id: usuario.id, name: usuario.name, email: usuario.email, role: usuario.role } });
    } catch (err) {
      console.error('Error durante el login:', err);
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  },

  // Función para obtener el perfil del usuario autenticado (ruta /user/me)
  async obtenerPerfil(req, res) {
    try {
      // req.user.id viene del middleware de autenticación (auth.js)
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: 'Usuario no autenticado o ID no disponible' });
      }

      const usuario = await User.findByPk(req.user.id, {
        attributes: ['id', 'name', 'email', 'role'],
        include: [
          {
            model: Pedido, // Asegúrate de que este es el nombre correcto del modelo (singular)
            as: 'pedidos',
            include: {
              model: Producto,
              through: { attributes: ['cantidad'] },
              as: 'productos' // Asegúrate de que esta asociación también es correcta en Pedido
            }
          }
        ]
      });

      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.json(usuario);
    } catch (err) {
      console.error('Error al obtener el perfil:', err);
      res.status(500).json({ error: 'Error al obtener el perfil' });
    }
  },

  // Función para cerrar sesión (si usas la tabla Token, esto la limpiaría)
  async logout(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(400).json({ message: 'Token no proporcionado' });
      }

      // Si estás gestionando tokens en DB, descomenta la siguiente línea
      // const deleted = await Token.destroy({ where: { token } });

      // if (deleted) {
      //   res.json({ message: 'Sesión cerrada correctamente' });
      // } else {
      //   res.status(404).json({ message: 'Token no encontrado o ya eliminado' });
      // }

      // Si solo gestionas el token en el cliente (localStorage), esta es suficiente:
      res.json({ mensaje: 'Logout exitoso.' });

    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      res.status(500).json({ message: 'Error al cerrar sesión', error: error.message });
    }
  },

  // Función para obtener todos los usuarios
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'role', 'createdAt']
      });
      res.json(users);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
  },

  // Función para obtener un usuario por ID
  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id, {
        attributes: ['id', 'name', 'email', 'role']
      });
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error al obtener usuario por ID:', error);
      res.status(500).json({ error: 'Error al obtener el usuario por ID' });
    }
  },

  // Función para actualizar un usuario
  async updateUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      await user.update(req.body);
      res.json({ mensaje: 'Usuario actualizado', user });
    } catch (err) {
      console.error('Error al actualizar usuario:', err);
      res.status(500).json({ error: 'Error al actualizar usuario' });
    }
  },

  // Función para eliminar un usuario
  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      await user.destroy();
      res.json({ mensaje: 'Usuario eliminado' });
    } catch (err) {
      console.error('Error al eliminar usuario:', err);
      res.status(500).json({ error: 'Error al eliminar usuario' });
    }
  }
};

module.exports = UserController;


