const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('right number of blogs is returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('field for blog id is called id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Hedgehog tips",
    author: "Siili Piip",
    url: "www.leavesandworms.com",
    likes: 22
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain(
    'Hedgehog tips'
  )

})

test('default value for likes is 0', async () => {
  const newBlog = {
    title: "Hedgehog tips",
    author: "Siili Piip",
    url: "www.leavesandworms.com"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const likes = blogsAtEnd.map(n => n.likes)
  expect(likes[helper.initialBlogs.length]).toEqual(0)

})

test('blog without title cannot be added', async () => {
  const newBlog = {
    author: "Siili Piip",
    url: "www.leavesandworms.com"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('blog without url cannot be added', async () => {
  const newBlog = {
    title: "Hedgehog tips",
    author: "Siili Piip",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('deletion of a blog succeeds with status code 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    blogsAtStart.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('deletion of a blog fails with status code 400 if id is not valid', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const fakeId = await helper.nonExistingId()

  await api
    .delete(`/api/blogs/${fakeId}`)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    blogsAtStart.length
  )

})

test('blog likes can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const likeAmountAtStart = blogToUpdate.likes
  blogToUpdate.likes += 10

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd[0].likes).toEqual(likeAmountAtStart + 10)

})

afterAll(() => {
  mongoose.connection.close()
})