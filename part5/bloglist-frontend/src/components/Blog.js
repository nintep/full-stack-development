import { useState } from 'react'

const Blog = ({ blog, likeClicked }) => {

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const OnLike = () => {
    likeClicked(blog.id)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      { visible ?
        <div>
          {blog.url} <br />
          {blog.likes} <button onClick={OnLike}>like</button><br />
          {blog.user.name} <br />
        </div> : 
        <div>
        </div>
      }
    </div>
  )
}

export default Blog