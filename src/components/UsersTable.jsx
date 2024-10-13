// src/components/UsersTable.js
import React, { useState, useEffect } from 'react';
import UserFormModal from './UserFormModal'; 
import userService from '../services/userService';
import authService from '../services/authServices';
import { useNavigate } from 'react-router-dom';

const genders = {
  M: "Masculino",
  F: "Femenino"
}

export default function UsersTable() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Para editar un usuario

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const handleAddUser = () => {
    setSelectedUser(null); // Resetea el formulario para añadir un usuario nuevo
    setIsModalOpen(true); // Abre el modal
  };

  const handleSaveUser = async (user) => {
    try {
      if (user.guid) {
        // Actualizar usuario existente
        await userService.updateUser(user);
      } else {
        // Añadir nuevo usuario
        await userService.addUser(user);
      }

      loadUsers(); // Recargar la lista de usuarios
      setIsModalOpen(false); // Cerrar el modal
    } catch (error) {
      console.error('Error al guardar usuario:', error);
    }
  };

  const handleDeleteUser = async (guid) => {
    try {
      await userService.deleteUser(guid);
      //Verificamos si eliminamos el usuario que inicio sesión
      const userGUID = authService.getUserGUID();
      if(guid === userGUID){
        authService.logout();        
        navigate('/');
      }
      else{
        loadUsers(); // Recargar la lista de usuarios
      }


      
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      {/* Encabezado con el botón de añadir y el título */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Usuarios</h2>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={handleAddUser}
        >
          Añadir
        </button>
        
      </div>

      {/* Tabla de usuarios */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Correo</th>
            <th className="border px-4 py-2">Fecha Nacimiento</th>
            <th className="border px-4 py-2">Genero</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.guid} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{user.name} {user.lastName}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.birthDate}</td>
              <td className="border px-4 py-2">{ genders[user.gender] }</td>
              <td className="border px-4 py-2">
                <button
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  onClick={() => {
                    setSelectedUser(user);
                    setIsModalOpen(true); // Abre el modal para editar
                  }}
                >
                  Editar
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteUser(user.guid)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de formulario de usuario */}
      <UserFormModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
      />
    </div>
  );
}
