const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const auth = require('../../middlewares/auth')
const Profile = require('../../models/Profile')
const Post = require('../../models/Post')
const User = require('../../models/User')

// @route:      POST api/posts
// @desc:       Create a post
// @access:     Private
router.post('/', [auth, [body('text', 'Le message est requis').not().isEmpty()]], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() })
  }

  try {
    const user = await User.findById(req.user.id).select('-password')

    const newPost = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    }

    const post = await new Post(newPost).save()
    return res.json(post)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ error: 'Erreur serveur' })
  }
})

// @route:      GET api/posts
// @desc:       Get all posts
// @access:     Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 })
    res.json(posts)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ error: 'Erreur serveur' })
  }
})

// @route:      GET api/posts/:id
// @desc:       Get one post by ID
// @access:     Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ error: 'Post introuvable' })
    }

    res.json(post)
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Post introuvable' })
    }
    return res.status(500).json({ error: 'Erreur serveur' })
  }
})

// @route:      DELETE api/posts/:id
// @desc:       Delete post by ID
// @access:     Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ error: 'Post introuvable' })
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Non autorisé' })
    }

    await post.remove()
    res.json({ msg: 'Post bien supprimé' })
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Post introuvable' })
    }
    return res.status(500).json({ error: 'Erreur serveur' })
  }
})

// @route:      POST api/posts/like/:id
// @desc:       Like a post
// @access:     Private
router.post('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    // Check if the post has already been liked
    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Une fois seulement' })
    }

    post.likes.unshift({ user: req.user.id })
    await post.save()
    return res.json(post.likes)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ error: 'Erreur serveur' })
  }
})

// @route:      POST api/posts/unlike/:id
// @desc:       Like a post
// @access:     Private
router.post('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    // Check if the post has already been liked
    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg: 'Opération impossible' })
    }

    // Get remove index
    post.likes = post.likes.filter(like => like.user.toString() !== req.user.id)

    await post.save()
    return res.json(post.likes)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ error: 'Erreur serveur' })
  }
})

// @route:      POST api/posts/comment/:id
// @desc:       Comment on a post
// @access:     Private
router.post('/comment/:id', [auth, [body('text', 'Le message est requis').not().isEmpty()]], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() })
  }

  try {
    const user = await User.findById(req.user.id).select('-password')
    const post = await Post.findById(req.params.id)

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    }

    post.comments.unshift(newComment)
    await post.save()
    return res.json(post.comments)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ error: 'Erreur serveur' })
  }
})

// @route:      DELETE api/posts/comment/:id/:comment_id
// @desc:       Delete a comment
// @access:     Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const comment = post.comments.find(comm => comm.id.toString() === req.params.comment_id)
    if (!comment) {
      return res.status(404).json({ error: 'Commentaire introuvable' })
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Non autorisé' })
    }

    post.comments = post.comments.filter(comm => comm.id.toString() !== req.params.comment_id)
    await post.save()
    res.json(post.comments)
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Post introuvable' })
    }
    return res.status(500).json({ error: 'Erreur serveur' })
  }
})

module.exports = router
