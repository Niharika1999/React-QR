// CameraPopup.js
import React, { useState, useEffect, useRef } from 'react';
import './camera.css';

const CameraPopup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (videoRef.current) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  useEffect(() => {
    if (isModalOpen && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
        })
        .catch(err => {
          console.error("Error accessing camera: ", err);
        });
    }
  }, [isModalOpen]);

  return (
    <div>
      <button onClick={openModal}>Open Camera</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <video ref={videoRef} autoPlay />
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraPopup;
