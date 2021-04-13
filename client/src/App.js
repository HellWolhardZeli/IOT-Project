import React from 'react';
import FileUpload from './components/FileUpload';
import VideoUpload from './components/VideoUpload';
import Match from './components/Match';
import './App.css';

const App = () => (
  <div className='container mt-4'>
    <FileUpload />
    <VideoUpload></VideoUpload>
    <Match></Match>
  </div>
);

export default App;
