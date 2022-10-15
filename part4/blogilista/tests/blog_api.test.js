const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

let token = "bearer "

beforeAll(async () =>  {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', name: 'root', passwordHash })

  await user.save()

  const loginInfo =
  {
    username: 'root',
    password: 'sekret'
  }
  //Get user info
  const loginResponse = await api.post('/api/login').send(loginInfo)
  token += loginResponse.body.token
})

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
    .set('authorization', token)
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

test('blog creation fails without a token', async () => {
  
  const newBlog = {
    title: "Hedgehog tips",
    author: "Siili Piip",
    url: "www.leavesandworms.com",
    likes: 22
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('default value for likes is 0', async () => {
  const newBlog = {
    title: "Hedgehog tips",
    author: "Siili Piip",
    url: "www.leavesandworms.com"
  }

  await api
    .post('/api/blogs')
    .set('authorization', token)
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
    .set('authorization', token)
    .send(newBlog)
    .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blog without url cannot be added', async () => {
  const newBlog = {
    title: "Hedgehog tips",
    author: "Siili Piip",
  }

  await api
    .post('/api/blogs')
    .set('authorization', token)
    .send(newBlog)
    .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('deletion of a blog succeeds with status code 204 if id and token are valid', async () => {
  const newBlog = {
    title: "Hedgehog tips",
    author: "Siili Piip",
    url: "www.leavesandworms.com",
    likes: 22
  }

  await api
    .post('/api/blogs')
    .set('authorization', token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  //Blog was added, try to delete it

  const blogsAtStart = await helper.blogsInDb()

  await api
    .delete(`/api/blogs/${blogsAtStart[blogsAtStart.length - 1].id}`)
    .set('authorization', token)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    blogsAtStart.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(newBlog.title)
})

test('deletion of a blog fails with status code 400 if id is not valid', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const fakeId = await helper.nonExistingId()

  await api
    .delete(`/api/blogs/${fakeId}`)
    .set('authorization', token)
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
    .set('authorization', token)
    .send(blogToUpdate)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd[0].likes).toEqual(likeAmountAtStart + 10)

})

afterAll(() => {
  mongoose.connection.close()
})