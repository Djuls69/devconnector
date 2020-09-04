import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../redux/actions/postActions'

const CommentForm = ({ addComment, postId }) => {
  const [text, setText] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    addComment(postId, { text })
    setText('')
  }

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Créez un commentaire</h3>
      </div>
      <form className='form my-1' onSubmit={handleSubmit}>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Votre commentaire'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Envoyer' />
      </form>
    </div>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
}

export default connect(null, { addComment })(CommentForm)
