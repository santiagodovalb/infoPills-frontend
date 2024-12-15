import React, { useState } from 'react';
import axios from 'axios';
import './PillForm.css'
import { useNavigate } from 'react-router-dom';

// Define the types for the form fields
interface PillFormData {
  color: string;
  dibujo: string;
  info: string;
  fecha: string;
}
interface PillFormProps {
  initialColor?: string;
  initialDibujo?: string;
  initialInfo?: string;
  initialFecha?: string;
  id?: number;
}

const PillForm: React.FC<PillFormProps> = ({ initialColor, initialDibujo, initialInfo, initialFecha, id }) => {
  // State to store form values and errors
  const [formData, setFormData] = useState<PillFormData>({
    color: initialColor || '',
    dibujo: initialDibujo || '',
    info: initialInfo || '',
    fecha: initialFecha || '',
  });

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const navigation = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.color || !formData.dibujo || !formData.info || !formData.fecha) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      let response;
      if (id) {
        response = await axios.put(`${import.meta.env.VITE_API_URL}/${id}`, null, {
          params: formData,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      else {
        response = await axios.post(import.meta.env.VITE_API_URL, null, {
          params: formData,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      setSuccess(response.data.message);
      setError('');

      // Reset the form
      setFormData({
        color: '',
        dibujo: '',
        info: '',
        fecha: '',
      });
      if (!id) {
        navigation('/');
      }
      else {
        navigation(0);
      }
    } catch (err) {
      setError('Error');
      setSuccess('');
    }
  };

  return (
      <form onSubmit={handleSubmit}>
      <h1>{`${id ? 'Editar' : 'Agregar'} pastilla`}</h1>
        <div>
          <label>Color</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Dibujo</label>
          <input
            type="text"
            name="dibujo"
            value={formData.dibujo}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Info</label>
          <textarea
            name="info"
            value={formData.info}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Fecha (dd/mm/yyyy)</label>
          <input
            type="text"
            name="fecha"
            value={formData.fecha}
            onChange={handleInputChange}
            placeholder="dd/mm/yyyy"
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <button type="submit">{id ? 'Editar' : 'Agregar'}</button>
      </form>
  );
};

export default PillForm;
