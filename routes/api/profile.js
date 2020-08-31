const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const { body, validationResult } = require('express-validator')

// @route:      GET api/profile/me
// @desc:       Get current users profile
// @access:     Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
    if (!profile) {
      return res.status(400).json({ msg: 'Pas de profil trouvé pour cet utilisateur' })
    }

    res.json(profile)
  } catch (err) {
    console.error(err.message)
    return status(500).json({ error: 'Erreur serveur' })
  }
})

// @route:      POST api/profile
// @desc:       Create or update users profile
// @access:     Private
router.post(
  '/',
  [auth, [body('status', 'Requis').not().isEmpty(), body('skills', 'Requis').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    // Build profile object
    const {
      company,
      website,
      location,
      bio,
      status,
      githubUsername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body
    const profileFields = {}
    profileFields.user = req.user.id
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (githubUsername) profileFields.githubUsername = githubUsername
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim())
    }

    // Build social object
    profileFields.social = {}
    if (twitter) profileFields.social.twitter = twitter
    if (youtube) profileFields.social.youtube = youtube
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (instagram) profileFields.social.instagram = instagram

    try {
      let profile = await Profile.findOne({ user: req.user.id })
      if (profile) {
        // Update users profile
        profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
        return res.json(profile)
      }

      // Create users profile
      profile = new Profile(profileFields)
      await profile.save()
      return res.json(profile)
    } catch (err) {
      console.error(err.message)
      return res.status(500).json({ error: 'Erreur serveur' })
    }
  }
)

// @route:      GET api/profile
// @desc:       Get all profiles
// @access:     Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    res.json(profiles)
  } catch (err) {
    console.error(err.message)
    return status(500).json({ error: 'Erreur serveur' })
  }
})

// @route:      GET api/profile/user/:user_id
// @desc:       Get profile by user ID
// @access:     Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'])
    if (!profile) {
      return res.status(400).json({ msg: 'Pas de profil trouvé pour cet utilisateur' })
    }
    return res.json(profile)
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Pas de profil trouvé pour cet utilisateur' })
    }
    return status(500).json({ error: 'Erreur serveur' })
  }
})

module.exports = router
