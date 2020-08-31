const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../../models/User')

// @route:      POST api/users
// @desc:       Register user
// @access:     Public
router.post(
  '/',
  [
    body('name', 'Requis').not().isEmpty(),
    body('email', 'Email non valide').isEmail(),
    body('password', 'Minimum 6 caractères').isLength({ min: 6 })
  ],
  async (req, res) => {
    const { name, email, password } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      // Check if user exists
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'Email déjà utilisé' }] })
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'x',
        d: 'mm'
      })

      user = new User({ name, email, password, avatar })

      // Encrypt password
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      // Save user
      await user.save()

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
