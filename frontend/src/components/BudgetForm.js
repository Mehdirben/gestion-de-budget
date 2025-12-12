import React, { useState, useEffect } from 'react';
import { createBudget, updateBudget } from '../services/budgetService';

const categories = [
    { value: 'salary', label: '💼 Salaire', type: 'income' },
    { value: 'freelance', label: '💻 Freelance', type: 'income' },
    { value: 'investment', label: '📈 Investissement', type: 'income' },
    { value: 'food', label: '🍔 Alimentation', type: 'expense' },
    { value: 'transport', label: '🚗 Transport', type: 'expense' },
    { value: 'housing', label: '🏠 Logement', type: 'expense' },
    { value: 'utilities', label: '💡 Services', type: 'expense' },
    { value: 'entertainment', label: '🎮 Loisirs', type: 'expense' },
    { value: 'health', label: '🏥 Santé', type: 'expense' },
    { value: 'education', label: '📚 Éducation', type: 'expense' },
    { value: 'shopping', label: '🛒 Shopping', type: 'expense' },
    { value: 'other', label: '📦 Autre', type: 'both' }
];

function BudgetForm({ budget, onSuccess, onCancel }) {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        type: 'expense',
        category: 'other',
        description: '',
        date: new Date().toISOString().split('T')[0]
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (budget) {
            setFormData({
                title: budget.title || '',
                amount: budget.amount || '',
                type: budget.type || 'expense',
                category: budget.category || 'other',
                description: budget.description || '',
                date: budget.date ? new Date(budget.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
            });
        }
    }, [budget]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = {
                ...formData,
                amount: parseFloat(formData.amount)
            };

            if (budget) {
                await updateBudget(budget._id, data);
            } else {
                await createBudget(data);
            }
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    const filteredCategories = categories.filter(
        cat => cat.type === 'both' || cat.type === formData.type
    );

    return (
        <div className="budget-form">
            <h3>{budget ? '✏️ Modifier' : '➕ Nouvelle entrée'}</h3>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <div className="type-selector">
                        <button
                            type="button"
                            className={`type-btn income ${formData.type === 'income' ? 'active' : ''}`}
                            onClick={() => setFormData(prev => ({ ...prev, type: 'income', category: 'salary' }))}
                        >
                            📈 Revenu
                        </button>
                        <button
                            type="button"
                            className={`type-btn expense ${formData.type === 'expense' ? 'active' : ''}`}
                            onClick={() => setFormData(prev => ({ ...prev, type: 'expense', category: 'other' }))}
                        >
                            📉 Dépense
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="title">Titre *</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Ex: Courses alimentaires"
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="amount">Montant (€) *</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="0.00"
                            step="0.01"
                            min="0.01"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date *</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="category">Catégorie</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        {filteredCategories.map(cat => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description (optionnel)</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Détails supplémentaires..."
                        rows="3"
                    />
                </div>

                <div className="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Annuler
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Enregistrement...' : (budget ? 'Modifier' : 'Ajouter')}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BudgetForm;
