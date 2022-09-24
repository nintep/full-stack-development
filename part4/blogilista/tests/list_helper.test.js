const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const blog = {
      title: "Frog Tips",
      author: "Sampsa",
      url: "www.frog.frog",
      likes: 8
    }
    
    expect(listHelper.totalLikes([blog])).toBe(8)
  })

  test('of a bigger list is calculated right', () => {
    const blog1 = {
      title: "Frog Tips",
      author: "Sampsa",
      url: "www.frog.frog",
      likes: 8
    }
    const blog2 = {
      title: "Bird Tips",
      author: "Tii",
      url: "www.bird.gov",
      likes: 100
    }
    const blog3 = {
      title: "Bird Tips",
      author: "tii",
      url: "www.bidr.gov",
      likes: 2
    }
    const blog4 = {
      title: "Worm Tips",
      author: "C",
      url: "www.underground.society",
      likes: 5
    }
    expect(listHelper.totalLikes([blog1, blog2, blog3, blog4])).toBe(115)
  })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    expect(listHelper.favoriteBlog([])).toEqual(null)
  })

  test('when list has only one blog equals that blog', () => {
    const blog = {
      title: "Frog Tips",
      author: "Sampsa",
      url: "www.frog.frog",
      likes: 8
    }
    
    expect(listHelper.favoriteBlog([blog])).toEqual(blog)
  })

  test('of a bigger list is calculated right', () => {
    const blog1 = {
      title: "Frog Tips",
      author: "Sampsa",
      url: "www.frog.frog",
      likes: 8
    }
    const blog2 = {
      title: "Bird Tips",
      author: "Tii",
      url: "www.bird.gov",
      likes: 100
    }
    const blog3 = {
      title: "Bird Tips",
      author: "tii",
      url: "www.bidr.gov",
      likes: 2
    }
    const blog4 = {
      title: "Worm Tips",
      author: "C",
      url: "www.underground.society",
      likes: 5
    }
    expect(listHelper.favoriteBlog([blog1, blog2, blog3, blog4])).toEqual(blog2)
  })
})

describe('most blogs', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostBlogs([])).toEqual(null)
  })

  test('when list has only one blog equals author of that blog', () => {
    const blog = {
      title: "Frog Tips",
      author: "Sampsa",
      url: "www.frog.frog",
      likes: 8
    }

    const expected = {
      author: "Sampsa",
      blogs: 1
    }
    
    expect(listHelper.mostBlogs([blog])).toEqual(expected)
  })

  test('of a bigger list is calculated right', () => {
    const blog1 = {
      title: "Frog Tips",
      author: "Sampsa",
      url: "www.frog.frog",
      likes: 8
    }
    const blog2 = {
      title: "Bird Tips",
      author: "Tii",
      url: "www.bird.gov",
      likes: 100
    }
    const blog3 = {
      title: "Bird Tips",
      author: "tii",
      url: "www.bidr.gov",
      likes: 2
    }
    const blog4 = {
      title: "Worm Tips",
      author: "C",
      url: "www.underground.society",
      likes: 5
    }
    const blog5 = {
      title: "Frog Tips",
      author: "Sampsa",
      url: "www.frog.frog",
      likes: 8
    }
    const blog6 = {
      title: "Worm Tips",
      author: "C",
      url: "www.underground.society",
      likes: 5
    }
    const blog7 = {
      title: "Worm Tips",
      author: "C",
      url: "www.underground.society",
      likes: 5
    }

    const expected = {
      author: "C",
      blogs: 3
    }


    expect(listHelper.mostBlogs([blog1, blog2, blog3, blog4, blog5, blog6, blog7])).toEqual(expected)
  })
})

describe('most likes', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostLikes([])).toEqual(null)
  })

  test('when list has only one blog equals author of that blog', () => {
    const blog = {
      title: "Frog Tips",
      author: "Sampsa",
      url: "www.frog.frog",
      likes: 8
    }

    const expected = {
      author: "Sampsa",
      likes: 8
    }
    
    expect(listHelper.mostLikes([blog])).toEqual(expected)
  })

  test('of a bigger list is calculated right', () => {
    const blog1 = {
      title: "Frog Tips",
      author: "Sampsa",
      url: "www.frog.frog",
      likes: 8
    }
    const blog2 = {
      title: "Bird Tips",
      author: "Tii",
      url: "www.bird.gov",
      likes: 100
    }
    const blog3 = {
      title: "Bird Tips",
      author: "tii",
      url: "www.bidr.gov",
      likes: 2
    }
    const blog4 = {
      title: "Worm Tips",
      author: "C",
      url: "www.underground.society",
      likes: 5
    }
    const blog5 = {
      title: "Frog Tips",
      author: "Sampsa",
      url: "www.frog.frog",
      likes: 8
    }
    const blog6 = {
      title: "Worm Tips",
      author: "C",
      url: "www.underground.society",
      likes: 5
    }
    const blog7 = {
      title: "Worm Tips",
      author: "C",
      url: "www.underground.society",
      likes: 5
    }

    const expected = {
      author: "Tii",
      likes: 100
    }


    expect(listHelper.mostLikes([blog1, blog2, blog3, blog4, blog5, blog6, blog7])).toEqual(expected)
  })
})
