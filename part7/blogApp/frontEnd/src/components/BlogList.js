import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  addLikeToBLog,
  initializeBlogs,
  deleteBlog,
} from '../reducers/blogReducer'
import Blog from './Blog'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => {
    return state.blogs
  })
  const user = useSelector((state) => {
    return state.user
  })

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const removeBlog = (id) => {
    const toRemove = blogs.find((b) => b.id === id)

    const ok = window.confirm(
      `remove '${toRemove.title}' by ${toRemove.author}?`
    )

    if (!ok) {
      return
    }

    dispatch(deleteBlog(id))
  }

  const likeBlog = async (id) => {
    const toLike = blogs.find((b) => b.id === id)
    dispatch(addLikeToBLog(toLike))
  }

  return (
    <div id="blogs">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          removeBlog={removeBlog}
          user={user}
        />
      ))}
    </div>
  )
}

export default BlogList
