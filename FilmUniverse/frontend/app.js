import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Popular from './pages/Popular';
import Releases from './pages/Releases';
import MyList from './pages/MyList';
import Rated from './pages/Rated';
import Recent from './pages/Recent';
import Genres from './pages/Genres';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/main.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <div className="main-container">
            <Sidebar />
            <main className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/popular" element={<Popular />} />
                <Route path="/estrenos" element={<Releases />} />
                <Route path="/mi-lista" element={<PrivateRoute><MyList /></PrivateRoute>} />
                <Route path="/calificadas" element={<PrivateRoute><Rated /></PrivateRoute>} />
                <Route path="/recientes" element={<Recent />} />
                <Route path="/generos" element={<Genres />} />
                <Route path="/configuracion" element={<PrivateRoute><Settings /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;