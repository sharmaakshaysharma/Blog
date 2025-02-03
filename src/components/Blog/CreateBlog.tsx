import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Blog } from '../../types/type';
import { TextField, Button, Typography, Card, CardContent, Box, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from '@mui/material';
import TextArea from '@mui/joy/Textarea';
import './CreateBlog.scss';

interface CreateBlogProps {
  addBlog: (blog: Blog) => void;
}

export default function CreateBlog({ addBlog }: CreateBlogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState<string[]>([]);
  const [image, setImage] = useState<string>('');
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    author: false,
    image: false,
    category: false,
  });

  const navigate = useNavigate();

  const categories = ['Technology', 'Health', 'Lifestyle', 'Business', 'Travel',  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prevErrors) => ({ ...prevErrors, image: true }));
        return;
      }

      if (!file.type.startsWith('image/')) {
        setErrors((prevErrors) => ({ ...prevErrors, image: true }));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
      setErrors((prevErrors) => ({ ...prevErrors, image: false }));
    }
  };

  const validateFields = () => {
    const newErrors = {
      title: title.trim() === '',
      description: description.trim() === '',
      author: author.trim() === '',
      image: image === '',
      category: category.length === 0,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = () => {
    if (validateFields()) {
      const newBlog: Blog = {
        id: Date.now().toString(),
        title,
        description,
        category: category.join(', '),
        author,
        date: new Date().toLocaleDateString(),
        image,
        comments: [],
      };
      addBlog(newBlog);
      navigate('/');
    }
  };

  return (
    <Box className="create-blog-container">
      <Card className="create-blog-card" elevation={3}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" gutterBottom>
              Add New Blog
            </Typography>
            <Button variant="text" color="secondary" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </Box>
          <Box className="form-group" mb={2}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              error={errors.title}
              helperText={errors.title ? 'Title is required' : ''}
            />
          </Box>
          
          <Box className="form-group" mb={2}>
            <TextField
              fullWidth
              label="Author"
              variant="outlined"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              error={errors.author}
              helperText={errors.author ? 'Author is required' : ''}
            />
          </Box>
          <Box className="form-group" mb={2}>
            <FormControl fullWidth error={errors.category}>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                multiple
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                renderValue={(selected) => selected.join(', ')}
              >
                {categories.map((categoryName) => (
                  <MenuItem key={categoryName} value={categoryName}>
                    <Checkbox checked={category.indexOf(categoryName) > -1} />
                    <ListItemText primary={categoryName} />
                  </MenuItem>
                ))}
              </Select>
              {errors.category && (
                <Typography color="error" variant="body2">
                  Category is required
                </Typography>
              )}
            </FormControl>
          </Box>
          <Box className="form-group" mb={2}  sx={{ resize: 'vertical', overflow: 'auto' }}>
            <TextArea
              placeholder="Write here..."
              required
              minRows={4}
              sx={{ width: '100%' }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={errors.description ? 'error' : ''}
            />
            {errors.description && (
              <Typography color="error" variant="body2">
                Content is required
              </Typography>
            )}
          </Box>
          <Box className="form-group" mb={2}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              color={errors.image ? 'error' : 'default'}
            >
              Upload Image
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>
            {errors.image && (
              <Typography color="error" variant="body2">
                Image is required
              </Typography>
            )}
          </Box>
          {image && (
            <Box mb={2}>
              <img src={image} alt="Preview" className="image-preview" />
            </Box>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            sx={{ backgroundColor: '#676fe0' }}
          >
            Create Blog
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
