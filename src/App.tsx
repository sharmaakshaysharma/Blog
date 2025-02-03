import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Header/Navbar.tsx';
import { Route, Routes } from 'react-router-dom';
import CreateBlog from './components/Blog/CreateBlog.tsx';
import { Blog } from './types/type.ts';
import Home from './components/Home/Home.tsx';
import BlogDetail from './components/BlogDetail/BlogDetail.tsx';


const App = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const savedBlogs = localStorage.getItem('blogs');
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    }
  }, []);

  const addBlog = (blog: Blog) => {
    const updatedBlogs = [...blogs, blog];
    setBlogs(updatedBlogs);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/addblog" element={<CreateBlog addBlog={addBlog} />} />
        <Route path="/" element={<Home blogs={blogs} />}/>
        <Route path="/blog/:blogId" element={<BlogDetail />} />
      </Routes>
    </div>

  );
};

export default App;
