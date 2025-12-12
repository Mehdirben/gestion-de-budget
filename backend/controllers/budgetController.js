const Budget = require('../models/Budget');

// Récupérer toutes les entrées de budget de l'utilisateur
exports.getAllBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({ user: req.user._id })
            .sort({ date: -1 });
        res.json(budgets);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// Créer une nouvelle entrée de budget
exports.createBudget = async (req, res) => {
    try {
        const { title, amount, type, category, description, date } = req.body;

        const budget = new Budget({
            title,
            amount,
            type,
            category,
            description,
            date: date || Date.now(),
            user: req.user._id
        });

        const savedBudget = await budget.save();
        res.status(201).json(savedBudget);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// Modifier une entrée de budget
exports.updateBudget = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, amount, type, category, description, date } = req.body;

        const budget = await Budget.findOne({ _id: id, user: req.user._id });

        if (!budget) {
            return res.status(404).json({ message: 'Entrée non trouvée' });
        }

        // Mettre à jour les champs
        if (title) budget.title = title;
        if (amount) budget.amount = amount;
        if (type) budget.type = type;
        if (category) budget.category = category;
        if (description !== undefined) budget.description = description;
        if (date) budget.date = date;

        const updatedBudget = await budget.save();
        res.json(updatedBudget);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// Supprimer une entrée de budget
exports.deleteBudget = async (req, res) => {
    try {
        const { id } = req.params;

        const budget = await Budget.findOneAndDelete({ _id: id, user: req.user._id });

        if (!budget) {
            return res.status(404).json({ message: 'Entrée non trouvée' });
        }

        res.json({ message: 'Entrée supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// Obtenir les statistiques de budget
exports.getBudgetStats = async (req, res) => {
    try {
        const stats = await Budget.aggregate([
            { $match: { user: req.user._id } },
            {
                $group: {
                    _id: '$type',
                    total: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            }
        ]);

        const result = {
            totalIncome: 0,
            totalExpense: 0,
            balance: 0,
            incomeCount: 0,
            expenseCount: 0
        };

        stats.forEach(stat => {
            if (stat._id === 'income') {
                result.totalIncome = stat.total;
                result.incomeCount = stat.count;
            } else if (stat._id === 'expense') {
                result.totalExpense = stat.total;
                result.expenseCount = stat.count;
            }
        });

        result.balance = result.totalIncome - result.totalExpense;

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};
