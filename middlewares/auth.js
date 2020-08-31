const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization')

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'Token introuvable, opération non autorisé' })
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded.user
    next()
  } catch (err) {
    console.error(err.message)
    return res.status(401).json({ msg: 'Token non valide' })
  }
}
