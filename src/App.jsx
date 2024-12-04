import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './credentials.js'

import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import CreatePost from './components/Post.jsx'


function App() {
  const [usuario, setUsuario] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase)
      } else {
        setUsuario(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!usuario ? <Login /> : <Navigate to="/" />} />
        <Route path="/" element={usuario ? <Home /> : <Navigate to="/login" />} />
        <Route path="/create-post" element={usuario ? <CreatePost /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App

