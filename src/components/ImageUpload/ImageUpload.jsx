import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';

const ImageUpload = ({ currentUser }) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button >Upload Image</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: '300px', height: 'auto' }} />}
    
    </div>
  );
};

export default ImageUpload;