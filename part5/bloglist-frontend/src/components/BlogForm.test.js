import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('creating a blog sends the right information', async () => {

  const mockCreate = jest.fn()
  render(<BlogForm createBlog={mockCreate} />)

  const user = userEvent.setup()

  const titleInput = screen.getByPlaceholderText('write here blog title')
  const authorInput = screen.getByPlaceholderText('write here blog author')
  const urlInput = screen.getByPlaceholderText('write here blog url')
  const createButton = screen.getByText(
    'create', { exact: false }
  )

  await user.type(titleInput, 'Cool Tips for Small Birds')
  await user.type(authorInput, 'One Small Bird')
  await user.type(urlInput, 'www.birdtips.org')
  await user.click(createButton)

  expect(mockCreate.mock.calls).toHaveLength(1)
  expect(mockCreate.mock.calls[0][0].title).toBe('Cool Tips for Small Birds')
  expect(mockCreate.mock.calls[0][0].author).toBe('One Small Bird')
  expect(mockCreate.mock.calls[0][0].url).toBe('www.birdtips.org')
})
