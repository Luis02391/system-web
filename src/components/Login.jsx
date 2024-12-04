/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import appFirebase from '../credentials.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(appFirebase);

const Login = () => {
  const [registrando, setRegistrando] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const functAutenticacion = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;

    if (registrando) {
      try {
        await createUserWithEmailAndPassword(auth, correo, contraseña);
      } catch (error) {
        alert("Asegúrese de que la contraseña tenga más de 8 caracteres.");
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, correo, contraseña);
      } catch (error) {
        alert("El correo o la contraseña son incorrectos.");
        setEmail("");
        setPassword("");
      }
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f4f8',
    },
    card: {
      backgroundColor: '#fff',
      padding: '2rem',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
    },
    title: {
      textAlign: 'center',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#003366',
    },
    input: {
      width: '100%',
      padding: '0.8rem',
      marginBottom: '1rem',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '1rem',
    },
    button: {
      width: '100%',
      padding: '0.8rem',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#003366',
      color: '#fff',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#002244',
    },
    toggleText: {
      textAlign: 'center',
      marginTop: '1rem',
      color: '#333',
      fontSize: '1rem',
    },
    toggleLink: {
      color: '#003366',
      fontWeight: 'bold',
      cursor: 'pointer',
      textDecoration: 'none',
      marginLeft: '0.5rem',
    },
    toggleLinkHover: {
      textDecoration: 'underline',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>{registrando ? "Regístrate" : "Inicia Sesión"}</h1>
        <form onSubmit={functAutenticacion}>
          <input
            type="email"
            id="email"
            style={styles.input}
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            {registrando ? "Registrarse" : "Iniciar Sesión"}
          </button>
        </form>
        <p style={styles.toggleText}>
          {registrando ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}
          <a
            href="#"
            style={styles.toggleLink}
            onMouseEnter={(e) => (e.target.style.textDecoration = styles.toggleLinkHover.textDecoration)}
            onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
            onClick={(e) => {
              e.preventDefault();
              setRegistrando(!registrando);
            }}
          >
            {registrando ? "Inicia Sesión" : "Regístrate"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
