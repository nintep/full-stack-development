import { useState } from "react"

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')

  }

  return (
    <form onSubmit={ addBlog }>
      <h2>Add a new blog</h2>
      Title <input
        type="text"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        />
      <br />
      Author <input
        type="text"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
        />
      <br />
      URL <input
        type="text"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
        />
      <br />
      <button type="submit">create</button>
    </form>  
  )

}

export default BlogForm