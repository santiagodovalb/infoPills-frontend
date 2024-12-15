import React, { useState } from 'react';
import PillForm from '../PillForm/PillForm';
import './Pill.css';
import axios from 'axios';

interface PillProps {
    color: string;
    dibujo: string;
    info: string;
    id: number;
    fecha: string;
}

const Pill: React.FC<PillProps> = ({ color, dibujo, info, fecha, id }) => {
    const [isEditing, setIsEditing] = useState(false);

        const handleDelete = async () => {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`, {
                    method: 'DELETE',
                })
                alert('Eliminada con éxito')
                window.location.reload();

            }
            catch {
                alert('Hubo un error')
            }
        };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="pill" style={{ borderLeft: `8px solid ${color}` }}>
            <div className="pill-content">
                <div className="pill-data">
                    <div>{`${dibujo} ${color}`}</div>
                    <div>{fecha}</div>
                </div>
                <div className="pill-info">{info}</div>
            </div>
            <div className="pill-buttons">
                <button className="pill-edit-button" onClick={handleEditClick}>{isEditing ? 'Cancel edit' : 'Edit'}</button>
                <button className="pill-delete-button" onClick={handleDelete}>Delete</button>
            </div>
            {isEditing && <PillForm id={id} initialColor={color} initialDibujo={dibujo} initialInfo={info} initialFecha={fecha} />}
        </div>
    );
};

export default Pill;
