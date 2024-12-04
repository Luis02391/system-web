/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import Navbar from './NavBar.jsx';
import { db } from '../credentials.js';

const Home = ({ correoUsuario }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsRef = ref(db, 'posts');
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const postsList = Object.entries(data).map(([id, post]) => ({
          id,
          ...post,
        }));
        setPosts(postsList.reverse());
      } else {
        setPosts([]);
      }
    });
  }, []);

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem',
      backgroundColor: '#f7f9fc',
    },
    title: {
      textAlign: 'center',
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#003366',
      marginBottom: '3rem',
    },
    postsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '2rem',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    },
    cardHeader: {
      backgroundColor: '#003366',
      color: '#fff',
      padding: '1.5rem',
      fontSize: '1.3rem',
      fontWeight: '600',
    },
    cardBody: {
      padding: '1.5rem',
      color: '#333',
      fontSize: '1rem',
    },
    cardText: {
      marginBottom: '1rem',
      lineHeight: '1.6',
    },
    cardFooter: {
      padding: '1rem 1.5rem',
      backgroundColor: '#f1f5f9',
      color: '#666',
      fontStyle: 'italic',
      textAlign: 'right',
    },
    cardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    },
    cardImage: {
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px',
    },
  };

  return (
    <div style={{ backgroundColor: '#f7f9fc', minHeight: '100vh' }}>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.title}>Publicaciones Recientes</h2>
        <div style={styles.postsGrid}>
          {posts.map((post) => (
            <div
              key={post.id}
              style={styles.card}
              onMouseEnter={(e) => e.currentTarget.style.transform = styles.cardHover.transform}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
            >
              <div style={styles.cardHeader}>
                Publicación por {post.userEmail}
              </div>
              
              {/* Imagen de la publicación */}
              {post.image && (
                <img
                  src={post.image}
                  alt="Publicación"
                  style={styles.cardImage}
                />
              )}

              <div style={styles.cardBody}>
                <p style={styles.cardText}>{post.description}</p>
              </div>
              <div style={styles.cardFooter}>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
