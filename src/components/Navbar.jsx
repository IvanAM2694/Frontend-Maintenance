// src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ username }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwtToken'); // Elimina el token JWT
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Bienvenido, {username}</h2>
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        onClick={handleLogout}
      >
        Cerrar sesión
      </button>
    </header>
  );
}

export default Navbar;
