import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Blog } from '../../types/type';
import {  Typography,  Box,  Card,
  CardContent,
  Grid,
  Divider,
} from '@mui/material';

import { Comment as CommentType } from '../../types/type';
import CommentInput from '../Comment/CommentInput.tsx';
import Comment from '../Comment/Comment.tsx';

const BlogDetail = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const storedBlogs = localStorage.getItem('blogs');
    if (storedBlogs) {
      const blogs: Blog[] = JSON.parse(storedBlogs);
      const selectedBlog = blogs.find((blog) => blog.id === blogId);

      if (selectedBlog) {
        setBlog(selectedBlog);
      } else {
        console.log('Blog not found.');
      }
    }

    const storedComments = localStorage.getItem(`comments_${blogId}`);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, [blogId]);

  const handleAddComment = (content: string, parentId: string | null) => {
    const newComment: CommentType = {
      id: `${new Date().getTime()}`,
      parentId,
      author: 'User',
      content,
      date: new Date().toLocaleString(),
      replies: [],
    };

    let updatedComments;
    if (parentId) {
      updatedComments = comments.map((comment) =>
        comment.id === parentId
          ? { ...comment, replies: [...comment.replies, newComment] }
          : comment
      );
    } else {
      updatedComments = [...comments, newComment];
    }

    setComments(updatedComments);
    localStorage.setItem(`comments_${blogId}`, JSON.stringify(updatedComments));
  };

  if (!blog) return <Typography>Loading...</Typography>;

  return (
    <Box p={2} m={2} sx={{ maxWidth: '800px', margin: '0 auto' }}>
      <Card elevation={3}>
        <CardContent>
          <Typography
            variant="h4"
            sx={{ textAlign: 'center', fontWeight: 'bold', mb: 2 }}
          >
            {blog.title}
          </Typography>  

          {blog.image && (
            <Box component="img" src={blog.image} alt={blog.title} sx={{ width: '100%', maxHeight: '400px',objectFit: 'cover',borderRadius: 2,mb: 2,}}/>
          )}
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }} color="text.secondary">
            {blog.description}
          </Typography> 

          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right' }}>
            By {blog.author} on {blog.date}
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ marginTop: '30px' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
          Comments
        </Typography>
        <CommentInput onAddComment={handleAddComment} parentId={null} />
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {comments.map((comment) => (
            <Grid item xs={12} key={comment.id}>
              {blogId && <Comment comment={comment} onAddComment={handleAddComment} blogId={blogId} />}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default BlogDetail;
