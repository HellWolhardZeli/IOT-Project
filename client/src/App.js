import React from 'react';
import FileUpload from './components/FileUpload';
import VideoUpload from './components/VideoUpload';
import Match from './components/Match';
import './App.css';
// // import styles from './App.css';
// import styles from "../src/App.css"
const App = () => (
  <div className='container mt-4' >
    <div id="left">
      <FileUpload />
      <VideoUpload></VideoUpload>
    </div>
    <div id="right">
      <Match></Match>
    </div>
  </div>
);

export default App;
