import React, { Fragment, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import axios from 'axios';

import { Card, Icon, Image, Button } from 'semantic-ui-react';

import styles from './FileUpload.module.css';

const VideoUpload = () => {
  const [previewFiles, setPreviewFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [toBeUploaded, setToBeUploaded] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      setToBeUploaded((toBeUploaded) => [...toBeUploaded, file]);
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        setPreviewFiles((previewFiles) => [...previewFiles, reader.result]);
      };

      reader.readAsDataURL(file);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // toBeUploaded.forEach((file) => {
    formData.append('video', toBeUploaded[0]);
    // });
    try {
      const res = await axios.post(
        'http://localhost:5000/upload/video',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const { fileName, filePath } = res.data;
      setUploadedFiles({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        console.log('Error in Server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <section className={styles.container}>
      <div {...getRootProps({ className: styles.dropzone })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <Button type='submit' onClick={onSubmit}>
        Submit
      </Button>
      
      {toBeUploaded.map((videoFile) => {
        return (
          <div>
          <video className= {styles.video} width='400' controls>
            <source src={URL.createObjectURL(videoFile)} />
          </video>
          </div>
        );
      })}{' '}
    </section>
  );
};

export default VideoUpload;
