// GemiDashboard.jsx
import React from 'react';
import './GemiDashboard.css'; // Importamos los estilos específicos
import { Dashboard, BarChart, Settings, Help } from '@mui/icons-material'; // Importar íconos

const GemiDashboard = () => {
    return (
        <div className="gemi-pannel">
            {/* Encabezado */}
            <header className="header">
                <h1>GEMINIS CODE</h1>
                <nav className="header-nav">
                    <ul>
                        <li><a href="#">Inicio</a></li>
                        <li><a href="#">Notificaciones</a></li>
                        <li><a href="#">Perfil</a></li>
                    </ul>
                </nav>
            </header>

            {/* Barra lateral (menú) */}
            <aside className="sidebar">
                <nav className="sidebar-nav">
                    <ul>
                        <li>
                            <a href="#">
                                <Dashboard /> {/* Ícono de Dashboard */}
                                <span>Resumen</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <BarChart /> {/* Ícono de Gráficos */}
                                <span>Reportes</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <Settings /> {/* Ícono de Configuración */}
                                <span>Configuración</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <Help /> {/* Ícono de Ayuda */}
                                <span>Ayuda</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Contenido principal */}
            <main className="content">
                <section className="content-section">
                    <h2>Bienvenido al Dashboard</h2>
                    <p>Aquí puedes visualizar tus datos y realizar acciones importantes.</p>
                </section>
                <section className="content-section">
                    <h3>Gráficos y Estadísticas</h3>
                    <div className="chart-container">
                        {/* Aquí podrías integrar gráficos con librerías como Chart.js o D3.js */}
                    </div>
                </section>
            </main>

            {/* Pie de página */}
            <footer className="footer">
                <p>&copy; 2023 Mi Empresa. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default GemiDashboard;