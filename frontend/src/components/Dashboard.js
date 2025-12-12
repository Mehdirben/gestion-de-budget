import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/authService';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.user);
      } catch (err) {
        console.error('Error fetching user:', err);
        logout();
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-card">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <h2>Dashboard</h2>
        <p>Bienvenue sur votre tableau de bord!</p>

        {user && (
          <div className="user-info">
            <h3>Informations utilisateur</h3>
            <p><strong>Nom:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Membre depuis:</strong> {new Date(user.createdAt).toLocaleDateString('fr-FR')}</p>
          </div>
        )}

        <div className="dashboard-nav">
          <Link to="/budget" className="btn btn-budget">
            💰 Gestion de Budget
          </Link>
        </div>

        <button onClick={handleLogout} className="btn logout-btn">
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
