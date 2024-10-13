// src/components/UserFormModal.js
import React, { useState, useEffect } from 'react';

const newUser = {
  name: '',
  lastName: '',
  email: '',
  password: '',
  birthDate: '',
  gender: 'M',
};

export default function UserFormModal({ user, isOpen, onClose, onSave }) {
  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState(newUser);

  useEffect(() => {
    if (user) {
      setFormData({ ...user, password: '' }); // No mostramos la contraseña en edición
      setShowPassword(false);
    }
    else{
      setFormData(newUser);
      setShowPassword(true);
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Guardar los cambios
    onClose(); // Cerrar el modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">
          {user ? 'Editar Usuario' : 'Añadir Usuario'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre"
            className="w-full border px-4 py-2 rounded-lg"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Apellido"
            className="w-full border px-4 py-2 rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo"
            className="w-full border px-4 py-2 rounded-lg"
            required
          />
          {
            showPassword ? <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              className="w-full border px-4 py-2 rounded-lg"
              required={!user} // La contraseña es requerida solo al añadir
            /> : <></>
          }          
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
