import React, { useState, useEffect } from 'react';
import { Blog } from '../../types/type';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './Home.scss';


interface HomeProps {
  blogs: Blog[];
}

const Home = ({ blogs = [] }: HomeProps) => {
  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem('selectedCategory') || 'All categories'
  );

  const categories = [
    'All categories',
    'Technology',
    'Health',
    'Lifestyle',
    'Business',
    'Travel'
  ];


  useEffect(() => {
    localStorage.setItem('selectedCategory', selectedCategory);
  }, [selectedCategory]);


  const filteredBlogs = blogs.filter((blog) => {
    if (selectedCategory === 'All categories') return true;


    return (
      blog.category &&
      blog.category
        .split(', ')
        .some((cat) => cat === selectedCategory)
    );
  });

  return (
    <Box className="home-container" p={2} m={2}>
      <Typography variant="h3" gutterBottom className="header">
        Blogs
      </Typography>
      <Link to="/addBlog">
        <Button variant="contained" color="primary" className="add-blog-btn">
          Add New Blog
        </Button>
      </Link>

      <Box
        className="category-buttons"
        mb={3}
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        gap={2}
      >
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            sx={{
              borderRadius: '9999px',
              paddingX: { xs: 2, sm: 3 },
              paddingY: 1,
              textTransform: 'none',
              fontSize: { xs: '0.8rem', sm: '1rem' },
              ...(selectedCategory === category && {
                backgroundColor: 'gray',
                color: 'black',
              }),
              '&:hover': {
                backgroundColor: selectedCategory === category ? 'gray' : 'lightgray',
              },
            }}
          >
            {category}
          </Button>
        ))}
      </Box>

      {filteredBlogs.length === 0 ? (
        <Typography>No blogs available</Typography>
      ) : (
        <Box className="blog-grid">
          {filteredBlogs.map((blog) => (
            <Link to={`/blog/${blog.id}`} key={blog.id} className="blog-link">
              <Card className="blog-card" elevation={3}>
                <CardContent className="blog-card-content">
                  <Typography variant="h5" className="blog-title">
                    {blog.title}
                  </Typography>
                  
                  <Box className="blog-content">
                    {blog.image && (
                      <img src={blog.image} alt="Blog" className="blog-image" />
                    )}
                  </Box>
                  
                  <Box className="description-container">
                    <Typography variant="body1" className="blog-description">
                      {blog.description.length > 300
                        ? `${blog.description.slice(0, 300)}...`
                        : blog.description}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary" className="blog-meta" m={2}>
                    By {blog.author} on {blog.date}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Home;
