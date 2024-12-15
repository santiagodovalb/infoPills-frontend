import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import Pill from '../../components/Pill/Pill';
import './Pills.css';
import { useNavigate } from 'react-router-dom';
import Layout from '../../layout/Layout';

interface Pill {
    id: number;
    dibujo: string;
    color: string;
    info: string;
    fecha: string;
}

const Pills: React.FC = () => {

    const [pills, setPills] = useState<Pill[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPills = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL);
                setPills(response.data);
            } catch (error) {
                console.error('Error fetching pills:', error);
            }
        };

        fetchPills();
    }, []);

    return (
        <Layout>
            <div className="pills-container">
                <button className="add-button" onClick={() => navigate('/add')}>Agregar nueva</button>
                <ul className="pills-list">
                    {pills?.map(pill => (
                        <Pill key={pill.id} id={pill.id} color={pill.color} dibujo={pill.dibujo} fecha={pill.fecha} info={pill.info} />
                    ))}
                </ul>
            </div>
        </Layout>
    );
};

export default Pills;