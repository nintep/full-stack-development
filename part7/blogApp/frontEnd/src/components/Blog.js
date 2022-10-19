import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export const BlogDetails = ({ blog, visible, likeBlog, removeBlog, own }) => {
  if (!visible) return null

  const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'

  const style = {
    padding: 3,
    margin: 5,
  }

  return (
    <div style={style}>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes{' '}
        <button onClick={() => likeBlog(blog.id)}>like</button>
      </div>
      {addedBy}
      {own && <button onClick={() => removeBlog(blog.id)}>remove</button>}
    </div>
  )
}

const Blog = ({ blog }) => {
  return (
    <div className="blog">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} by {blog.author}
      </Link>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
}

export default Blog
