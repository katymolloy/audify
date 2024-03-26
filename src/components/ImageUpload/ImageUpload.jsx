import React, { useState } from 'react';
import { BsPersonCircle } from "react-icons/bs";
import firebase from 'firebase/app';
import 'firebase/storage';

import "./ImageUpload.scss";

/**
 * Renders the component for uploading images.
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.currentUser - The current user object.
 * @returns {JSX.Element} ImageUpload component.
 */
const ImageUpload = ({ currentUser }) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  /**
   * Handles changes in the selected image file.
   * @param {Object} e - The event object representing the file input change.
   */
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="imageUpload">
      <input type="file" onChange={handleImageChange} id="uploadBtn" />
      <label for="uploadBtn">
        <BsPersonCircle /> Upload Img
      </label>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded"
          style={{ width: "300px", height: "auto" }}
        />
      )}
    </div>
  );
};

export default ImageUpload;