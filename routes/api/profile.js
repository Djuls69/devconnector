const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const { body, validationResult } = require('express-validator')
const axios = require('axios')
const config = require('config')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Post = require('../../models/Post')

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
  [auth, [body('status', 'Status est requis').not().isEmpty(), body('skills', 'Compétences requises').not().isEmpty()]],
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

// @route:      DELETE api/profile
// @desc:       Delete profile, user & posts
// @access:     Private
router.delete('/', auth, async (req, res) => {
  try {
    // remove users posts
    await Post.deleteMany({ user: req.user.id })

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id })

    // Remove user
    await User.findOneAndRemove({ _id: req.user.id })

    return res.json({ msg: 'Utilisateur supprimé' })
  } catch (err) {
    console.error(err.message)
    return status(500).json({ error: 'Erreur serveur' })
  }
})

// @route:      POST api/profile/experiences
// @desc:       Add profile experiences
// @access:     Private
router.post(
  '/experiences',
  [
    auth,
    [
      body('title', 'Requis').not().isEmpty(),
      body('company', 'Requis').not().isEmpty(),
      body('from', 'Requis').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { title, company, location, from, to, current, description } = req.body
    const newExp = { title, company, location, from, to, current, description }

    try {
      const profile = await Profile.findOne({ user: req.user.id })
      profile.experience.unshift(newExp)
      await profile.save()
      res.json(profile)
    } catch (err) {
      console.error(err.message)
      return status(500).json({ error: 'Erreur serveur' })
    }
  }
)

// @route:      DELETE api/profile/experiences/:exp_id
// @desc:       Delete profile experiences
// @access:     Private
router.delete('/experiences/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    // Get remove index
    const removeIndex = profile.experience.filter(exp => exp.id === req.params.exp_id)
    profile.experience.splice(removeIndex, 1)

    await profile.save()
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    return status(500).json({ error: 'Erreur serveur' })
  }
})

// @route:      POST api/profile/education
// @desc:       Add profile education
// @access:     Private
router.post(
  '/education',
  [
    auth,
    [
      body('school', 'Requis').not().isEmpty(),
      body('degree', 'Requis').not().isEmpty(),
      body('fieldOfStudy', 'Requis').not().isEmpty(),
      body('from', 'Requis').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { school, degree, fieldOfStudy, from, to, current, description } = req.body
    const newEdu = { school, degree, fieldOfStudy, from, to, current, description }

    try {
      const profile = await Profile.findOne({ user: req.user.id })
      profile.education.unshift(newEdu)
      await profile.save()
      res.json(profile)
    } catch (err) {
      console.error(err.message)
      return status(500).json({ error: 'Erreur serveur' })
    }
  }
)

// @route:      DELETE api/profile/education/:edu_id
// @desc:       Delete profile education
// @access:     Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    // Get remove index
    const removeIndex = profile.education.filter(edu => edu.id === req.params.edu_id)
    profile.education.splice(removeIndex, 1)

    await profile.save()
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    return status(500).json({ error: 'Erreur serveur' })
  }
})

// @route:      GET api/profile/github/:username
// @desc:       Get github repos
// @access:     Public
router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      url: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get(
        'githubSecret'
      )}`,
      method: 'get',
      headers: { 'user-agent': 'node.js' }
    }

    const response = await axios(options)
    if (response.status !== 200) {
      return res.status(404).json({ msg: 'Impossible de trouver cet utilisateur Github' })
    }
    res.json(response.data)
  } catch (err) {
    console.error(err.message)
    if (res.status(404)) {
      return res.status(404).json({ msg: 'Impossible de trouver cet utilisateur Github' })
    }
    return res.status(500).json({ error: 'Erreur serveur' })
  }
})

module.exports = router
