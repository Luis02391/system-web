/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBar.jsx';
import { db, auth } from '../credentials.js';

const CreatePost = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description) {
      alert('Por favor, añade una descripción.');
      return;
    }

    try {
      const postsRef = ref(db, 'posts');
      await push(postsRef, {
        description,
        image: image || '',
        userEmail: auth.currentUser.email,
        createdAt: Date.now(),
      });

      alert('Publicación creada con éxito!');
      navigate('/');
    } catch (error) {
      console.error('Error al crear la publicación:', error);
      alert('Hubo un error al crear la publicación. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="home-background">
      <Navbar /> 
      <div className="create-post-wrapper">
        <h2 className="text-center mb-4">Crear Nueva Publicación</h2>
        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Descripción</label>
            <textarea
              className="form-control"
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Escribe tu descripción aquí..."
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Seleccionar Imagen (Opcional)</label>
            <input
              type="file"
              className="form-control"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          {image && (
            <div className="mb-3">
              <h5>Vista previa de la imagen</h5>
              <img 
                src={image} 
                alt="Vista previa" 
                style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'cover' }} 
              />
            </div>
          )}
          <div className="text-center">
            <button type="submit" className="btn btn-primary">Crear Publicación</button>
          </div>
        </form>
      </div>

      <style>{`
        .create-post-wrapper {
          padding: 2rem 3rem;
          max-width: 800px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .create-post-wrapper h2 {
          font-size: 2rem;
          font-weight: bold;
          color: #003366;
        }

        .create-post-form .form-control {
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 1px solid #ddd;
        }

        .create-post-form .form-label {
          font-size: 1.1rem;
          color: #003366;
          font-weight: 500;
        }

        .create-post-form button {
          padding: 0.75rem 2rem;
          font-size: 1.1rem;
          font-weight: bold;
          background-color: #005f73;
          border: none;
          border-radius: 30px;
          color: #fff;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .create-post-form button:hover {
          background-color: #00424a;
        }

        .create-post-form .form-control:focus {
          border-color: #005f73;
          box-shadow: 0 0 10px rgba(0, 95, 115, 0.3);
        }

        .create-post-form img {
          margin-top: 15px;
          border-radius: 10px;
        }

        .create-post-form .text-center {
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

export default CreatePost;
