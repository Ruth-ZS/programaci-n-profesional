import React, { useState } from 'react';
import axios from 'axios';

function Formulario() {
  const [form, setForm] = useState({ 
    descripcion: '', 
    depto: '', 
    correo: ''  // Nuevo campo
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/paquetes', form);
      alert('¡Paquete registrado!');
      setForm({ descripcion: '', depto: '', correo: '' }); // Limpiar nuevo campo
    } catch (error) {
      alert('Error al registrar el paquete');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <input
        className="form-control mb-2"
        value={form.descripcion}
        onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        placeholder="Descripción"
        required
      />
      <input
        className="form-control mb-2"
        value={form.depto}
        onChange={(e) => setForm({ ...form, depto: e.target.value })}
        placeholder="Departamento"
        required
      />
      {/* Nuevo campo: Correo del destinatario */}
      <input
        className="form-control mb-2"
        type="email"  // Validación automática de email
        value={form.correo}
        onChange={(e) => setForm({ ...form, correo: e.target.value })}
        placeholder="Correo del destinatario"
        required
      />
      <button type="submit" className="btn btn-primary">Registrar</button>
    </form>
  );
}

export default Formulario;