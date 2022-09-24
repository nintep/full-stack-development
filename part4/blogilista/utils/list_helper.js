const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.forEach(blog => {
    sum += blog.likes
  });

  return sum
}

const favoriteBlog = (blogs) => {

  if (blogs.length === 0){
    return null
  }

  let best = blogs[0]
  blogs.forEach(blog => {
    if (blog.likes > best.likes){
      best = blog
    }
  });

  return best
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0){
    return null
  }

  let authors = []
  let blogAmounts = []

  blogs.forEach(blog => {
    const index = authors.indexOf(blog.author)
    if (index === -1){
      authors = authors.concat(blog.author)
      blogAmounts = blogAmounts.concat(1)
    } else {
      blogAmounts[index] += 1
    }
  });

  const max = Math.max(...blogAmounts);
  const index = blogAmounts.indexOf(max);

  return {
    author: authors[index],
    blogs: blogAmounts[index]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0){
    return null
  }
  
  let authors = []
  let likeAmounts = []

  blogs.forEach(blog => {
    const index = authors.indexOf(blog.author)
    if (index === -1){
      authors = authors.concat(blog.author)
      likeAmounts = likeAmounts.concat(blog.likes)
    } else {
      likeAmounts[index] += blog.likes
    }
  });

  const max = Math.max(...likeAmounts);
  const index = likeAmounts.indexOf(max);

  return {
    author: authors[index],
    likes: likeAmounts[index]
  }
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}