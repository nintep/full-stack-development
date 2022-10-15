const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "Frog Tips",
    author: "Sampsa",
    url: "www.frog.frog",
    likes: 8
  },
  {
    title: "Bird Tips",
    author: "Tii",
    url: "www.bird.gov",
    likes: 100
  },
  {
    title: "Bird Tips",
    author: "tii",
    url: "www.bidr.gov",
    likes: 2
  },
  {
    title: "Worm Tips",
    author: "C",
    url: "www.underground.society",
    likes: 5
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url: "fake.com" })
  await blog.save()
  await blog.remove()

  return blog.id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, 
  blogsInDb, 
  nonExistingId,
  usersInDb,
}