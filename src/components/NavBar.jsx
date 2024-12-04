/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../credentials.js';

const Navbar = () => {
  const styles = {
    navbar: {
      backgroundColor: '#1a1a2e',
      color: '#fff',
      padding: '1rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    },
    navbarBrand: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#00a8cc',
      textDecoration: 'none',
    },
    navbarLinks: {
      display: 'flex',
      gap: '1.5rem',
    },
    navLink: {
      color: '#fff',
      textDecoration: 'none',
      fontSize: '1.2rem',
      fontWeight: '500',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      border: '2px solid transparent',
      transition: 'all 0.3s ease',
    },
    navLinkHover: {
      backgroundColor: '#00a8cc',
      color: '#fff',
      border: '2px solid #00a8cc',
    },
    btnLogout: {
      backgroundColor: '#e53935',
      border: '2px solid transparent',
      borderRadius: '20px',
      padding: '0.6rem 1.4rem',
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#fff',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    btnLogoutHover: {
      backgroundColor: 'transparent',
      color: '#e53935',
      border: '2px solid #e53935',
    },
  };

  return (
    <nav style={styles.navbar}>
      {/* Brand Logo */}
      <Link style={styles.navbarBrand} to="/">
        Inicio
      </Link>

      {/* Navigation Links */}
      <div style={styles.navbarLinks}>
        <Link
          to="/create-post"
          style={styles.navLink}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = styles.navLinkHover.backgroundColor;
            e.target.style.color = styles.navLinkHover.color;
            e.target.style.border = styles.navLinkHover.border;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = styles.navLink.color;
            e.target.style.border = '2px solid transparent';
          }}
        >
          Crear Publicación
        </Link>
      </div>

      {/* Logout Button */}
      <div>
        <button
          style={styles.btnLogout}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = styles.btnLogoutHover.backgroundColor;
            e.target.style.color = styles.btnLogoutHover.color;
            e.target.style.border = styles.btnLogoutHover.border;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = styles.btnLogout.backgroundColor;
            e.target.style.color = styles.btnLogout.color;
            e.target.style.border = styles.btnLogout.border;
          }}
          onClick={() => signOut(auth)}
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
