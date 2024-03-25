import React, { useState } from 'react';
import { BsPersonCircle } from "react-icons/bs";
import firebase from 'firebase/app';
import 'firebase/storage';

import "./ImageUpload.scss";

const ImageUpload = ({ currentUser }) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className='imageUpload'>
      <input type="file" onChange={handleImageChange} id='uploadBtn' />
      <label for="uploadBtn"><BsPersonCircle /> Upload Img</label>
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: '300px', height: 'auto' }} />}

    </div>
  );
};

export default ImageUpload;