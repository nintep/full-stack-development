import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('by default renders pnly blog title and author', () => {
  const blog = {
    title: 'Cool Tips for Small Birds',
    author: 'One Small Bird',
    url: 'www.birdtips.org',
    likes: 10,
    user: {
      name: 'bird',
      username: 'smallbird'
    }
  }

  const mockLike = jest.fn()
  const mockRemove = jest.fn()

  render(<Blog
    blog={blog}
    currentUser={'smallbird'}
    likeClicked={mockLike}
    removeClicked={mockRemove}/>)

  const titleElement = screen.getByText(
    'Cool Tips for Small Birds', { exact: false }
  )
  expect(titleElement).toBeDefined()

  const authorElement = screen.getByText(
    'One Small Bird', { exact: false }
  )
  expect(authorElement).toBeDefined()

  const urlElement = screen.queryByText(
    'www.birdtips.org', { exact: false }
  )
  expect(urlElement).toBeNull()

  const likeElement = screen.queryByText(
    '10', { exact: false }
  )
  expect(likeElement).toBeNull()
})

test('renders url and likes after pressing view button', async () => {
  const blog = {
    title: 'Cool Tips for Small Birds',
    author: 'One Small Bird',
    url: 'www.birdtips.org',
    likes: 10,
    user: {
      name: 'bird',
      username: 'smallbird'
    }
  }

  const mockLike = jest.fn()
  const mockRemove = jest.fn()

  render(<Blog
    blog={blog}
    currentUser={'smallbird'}
    likeClicked={mockLike}
    removeClicked={mockRemove}/>)

  const user = userEvent.setup()
  const button = screen.getByText(
    'view', { exact: false }
  )
  await user.click(button)

  const titleElement = screen.getByText(
    'Cool Tips for Small Birds', { exact: false }
  )
  expect(titleElement).toBeDefined()

  const authorElement = screen.getByText(
    'One Small Bird', { exact: false }
  )
  expect(authorElement).toBeDefined()

  const urlElement = screen.queryByText(
    'www.birdtips.org', { exact: false }
  )
  expect(urlElement).toBeDefined()

  const likeElement = screen.queryByText(
    '10', { exact: false }
  )
  expect(likeElement).toBeDefined()
})

test('like event is called twice when pressing like button twice', async () => {
  const blog = {
    title: 'Cool Tips for Small Birds',
    author: 'One Small Bird',
    url: 'www.birdtips.org',
    likes: 10,
    user: {
      name: 'bird',
      username: 'smallbird'
    }
  }

  const mockLike = jest.fn()
  const mockRemove = jest.fn()

  render(<Blog
    blog={blog}
    currentUser={'smallbird'}
    likeClicked={mockLike}
    removeClicked={mockRemove}/>)

  const user = userEvent.setup()
  const viewButton = screen.getByText(
    'view', { exact: false }
  )
  await user.click(viewButton)

  const likeButton = screen.getByText(
    'like', { exact: false }
  )
  await user.click(likeButton)
  expect(mockLike.mock.calls).toHaveLength(1)

  await user.click(likeButton)
  expect(mockLike.mock.calls).toHaveLength(2)
})