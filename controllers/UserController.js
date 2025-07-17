const { User, Pedidos, Producto } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = 'secreto123';


const registrar = async (req, res) => {
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
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await User.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: usuario.id, role: usuario.role }, SECRET, { expiresIn: '1h' });
    res.json({ mensaje: 'Login exitoso', token });
  } catch (err) {
    res.status(500).json({ error: 'Error en el login' });
  }
};


const obtenerPerfil = async (req, res) => {
  try {
    const usuario = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'role'],
      include: {
        model: Pedidos,
        as: 'pedidos',
        include: {
          model: Producto,
          through: { attributes: ['cantidad'] }
        }
      }
    });

    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json(usuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el perfil' });
  }
};


const logout = (req, res) => {
  res.json({ mensaje: 'Logout exitoso.' });
};


const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};


const getUserById = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(user);
};


const createUser = registrar;


const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

  await user.update(req.body);
  res.json({ mensaje: 'Usuario actualizado', user });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

  await user.destroy();
  res.json({ mensaje: 'Usuario eliminado' });
};

module.exports = {
  registrar,
  login,
  obtenerPerfil,
  logout,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
