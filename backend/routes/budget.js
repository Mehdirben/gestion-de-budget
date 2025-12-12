const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    getAllBudgets,
    createBudget,
    updateBudget,
    deleteBudget,
    getBudgetStats
} = require('../controllers/budgetController');

// Toutes les routes sont protégées
router.use(protect);

// Routes CRUD
router.get('/', getAllBudgets);
router.post('/', createBudget);
router.put('/:id', updateBudget);
router.delete('/:id', deleteBudget);

// Route statistiques
router.get('/stats', getBudgetStats);

module.exports = router;
