// src/components/Dashboard.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import authService from '../services/authServices';

export default function Dashboard() {
  const username = authService.getUsername();


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenedor principal */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Navbar */}
        <Navbar username={username} />

        {/* Contenido dinámico */}
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet /> {/* Carga las rutas anidadas aquí */}
        </main>
      </div>
    </div>
  );
}
