const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Le titre est requis'],
        trim: true,
        maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères']
    },
    amount: {
        type: Number,
        required: [true, 'Le montant est requis'],
        min: [0.01, 'Le montant doit être supérieur à 0']
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: [true, 'Le type est requis']
    },
    category: {
        type: String,
        required: [true, 'La catégorie est requise'],
        enum: [
            'salary',      // Salaire
            'freelance',   // Freelance
            'investment',  // Investissement
            'food',        // Alimentation
            'transport',   // Transport
            'housing',     // Logement
            'utilities',   // Services publics
            'entertainment', // Loisirs
            'health',      // Santé
            'education',   // Éducation
            'shopping',    // Shopping
            'other'        // Autre
        ],
        default: 'other'
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'La description ne peut pas dépasser 500 caractères']
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Index pour améliorer les performances des requêtes
budgetSchema.index({ user: 1, date: -1 });
budgetSchema.index({ user: 1, type: 1 });

module.exports = mongoose.model('Budget', budgetSchema);
