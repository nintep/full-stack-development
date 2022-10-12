const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs, blogsInDb
}