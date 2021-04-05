import React from 'react';
import FileUpload from './components/FileUpload';
import VideoUpload from './components/VideoUpload';
import './App.css';

const App = () => (
  <div className='container mt-4'>
    <FileUpload />
    <VideoUpload></VideoUpload>
  </div>
);

export default App;
