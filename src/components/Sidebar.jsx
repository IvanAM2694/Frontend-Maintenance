// src/components/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-gray-800 text-white h-full p-6">
      <h1 className="text-2xl font-bold mb-8">Menú</h1>
      <nav>
        <ul className="space-y-4">
          <li>
            <button
              className="w-full text-left hover:text-blue-400 transition"
              onClick={() => navigate('/dashboard/users')}
            >
              Usuarios
            </button>
          </li>
          {/* Puedes agregar más opciones aquí */}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
