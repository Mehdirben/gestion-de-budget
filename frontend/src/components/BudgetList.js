import React, { useState, useEffect } from 'react';
import { getAllBudgets, deleteBudget, getBudgetStats } from '../services/budgetService';
import BudgetForm from './BudgetForm';

const categoryLabels = {
    salary: '💼 Salaire',
    freelance: '💻 Freelance',
    investment: '📈 Investissement',
    food: '🍔 Alimentation',
    transport: '🚗 Transport',
    housing: '🏠 Logement',
    utilities: '💡 Services',
    entertainment: '🎮 Loisirs',
    health: '🏥 Santé',
    education: '📚 Éducation',
    shopping: '🛒 Shopping',
    other: '📦 Autre'
};

function BudgetList() {
    const [budgets, setBudgets] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingBudget, setEditingBudget] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [budgetsData, statsData] = await Promise.all([
                getAllBudgets(),
                getBudgetStats()
            ]);
            setBudgets(budgetsData);
            setStats(statsData);
            setError('');
        } catch (err) {
            setError('Erreur lors du chargement des données');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette entrée ?')) {
            try {
                await deleteBudget(id);
                fetchData();
            } catch (err) {
                setError('Erreur lors de la suppression');
            }
        }
    };

    const handleEdit = (budget) => {
        setEditingBudget(budget);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingBudget(null);
    };

    const handleFormSuccess = () => {
        handleFormClose();
        fetchData();
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    };

    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    return (
        <div className="budget-container">
            <div className="budget-header">
                <h2>💰 Gestion de Budget</h2>
                <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                    + Nouvelle entrée
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {/* Stats Cards */}
            {stats && (
                <div className="stats-grid">
                    <div className="stat-card income">
                        <div className="stat-icon">📈</div>
                        <div className="stat-info">
                            <span className="stat-label">Revenus</span>
                            <span className="stat-value">{formatAmount(stats.totalIncome)}</span>
                        </div>
                    </div>
                    <div className="stat-card expense">
                        <div className="stat-icon">📉</div>
                        <div className="stat-info">
                            <span className="stat-label">Dépenses</span>
                            <span className="stat-value">{formatAmount(stats.totalExpense)}</span>
                        </div>
                    </div>
                    <div className={`stat-card balance ${stats.balance >= 0 ? 'positive' : 'negative'}`}>
                        <div className="stat-icon">💎</div>
                        <div className="stat-info">
                            <span className="stat-label">Solde</span>
                            <span className="stat-value">{formatAmount(stats.balance)}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Budget Form Modal */}
            {showForm && (
                <div className="modal-overlay" onClick={handleFormClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <BudgetForm
                            budget={editingBudget}
                            onSuccess={handleFormSuccess}
                            onCancel={handleFormClose}
                        />
                    </div>
                </div>
            )}

            {/* Budget List */}
            <div className="budget-list">
                <h3>📋 Transactions récentes</h3>
                {budgets.length === 0 ? (
                    <div className="empty-state">
                        <p>Aucune transaction pour le moment</p>
                        <p>Cliquez sur "Nouvelle entrée" pour commencer</p>
                    </div>
                ) : (
                    <div className="transactions-table">
                        <div className="table-header">
                            <span>Date</span>
                            <span>Titre</span>
                            <span>Catégorie</span>
                            <span>Montant</span>
                            <span>Actions</span>
                        </div>
                        {budgets.map((budget) => (
                            <div key={budget._id} className={`table-row ${budget.type}`}>
                                <span className="date">{formatDate(budget.date)}</span>
                                <span className="title">{budget.title}</span>
                                <span className="category">{categoryLabels[budget.category] || budget.category}</span>
                                <span className={`amount ${budget.type}`}>
                                    {budget.type === 'income' ? '+' : '-'}{formatAmount(budget.amount)}
                                </span>
                                <span className="actions">
                                    <button className="btn-icon edit" onClick={() => handleEdit(budget)} title="Modifier">
                                        ✏️
                                    </button>
                                    <button className="btn-icon delete" onClick={() => handleDelete(budget._id)} title="Supprimer">
                                        🗑️
                                    </button>
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BudgetList;
