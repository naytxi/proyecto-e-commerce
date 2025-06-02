const jwt = require('jsonwebtoken')

const isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, 'secreto123') // usa .env más adelante
    req.user = decoded // ← guarda el usuario decodificado para usarlo luego
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' })
  }
}

module.exports = isAuth
