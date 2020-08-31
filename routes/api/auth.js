const express = require('express')
const router = express.Router()
const config = require('config')
const auth = require('../../middlewares/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const User = require('../../models/User')

// @route:      GET api/auth
// @desc:       Get user
// @access:     Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    return status(500).json({ error: 'Erreur serveur' })
  }
})

// @route:      POST api/auth
// @desc:       Authenticate user & get token
// @access:     Public
router.post(
  '/',
  [body('email', 'Email non valide').isEmail(), body('password', 'Requis').exists()],
  async (req, res) => {
    const { email, password } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      // Check if user exists
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Identifiants invalides' }] })
      }

      // Make sure password matches
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Identifiants invalides' }] })
      }

      // Return jwt
      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 60 * 60 * 24 }, (err, token) => {
        if (err) throw err
        res.json({ token })
      })
    } catch (err) {
      console.error(err.message)
      return status(500).json({ error: 'Erreur serveur' })
    }
  }
)

module.exports = router
