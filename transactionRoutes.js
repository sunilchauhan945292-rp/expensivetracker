const express = require("express");

const Transaction = require("../models/Transaction");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ======================
// Create Transaction
// ======================

router.post("/", authMiddleware, async (req, res) => {
    try {

        const {
            title,
            amount,
            type,
            category,
            date,
            note,
        } = req.body;

        const numericAmount = Number(amount);

        if (
            !title?.trim() ||
            !Number.isFinite(numericAmount) ||
            numericAmount <= 0 ||
            !type ||
            !category ||
            !date
        ) {
            return res.status(400).json({
                message: "Please provide valid transaction details",
            });
        }

        const transaction = await Transaction.create({
            user: req.user.userId,
            title: title.trim(),
            amount: numericAmount,
            type,
            category,
            date,
            note: note || "",
        });

        return res.status(201).json(transaction);

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: "Failed to create transaction",
        });

    }
});


// ======================
// Get All Transactions
// ======================

router.get("/", authMiddleware, async (req, res) => {
    try {

        const transactions = await Transaction.find({
            user: req.user.userId,
        }).sort({
            date: -1,
            createdAt: -1,
        });

        return res.status(200).json(transactions);

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: "Failed to fetch transactions",
        });

    }
});


// ======================
// Update Transaction
// ======================

router.put("/:id", authMiddleware, async (req, res) => {
    try {

        const {
            title,
            amount,
            type,
            category,
            date,
            note,
        } = req.body;

        const numericAmount = Number(amount);

        if (
            !title?.trim() ||
            !Number.isFinite(numericAmount) ||
            numericAmount <= 0 ||
            !type ||
            !category ||
            !date
        ) {
            return res.status(400).json({
                message: "Please provide valid transaction details",
            });
        }

        const transaction = await Transaction.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.userId,
            },
            {
                title: title.trim(),
                amount: numericAmount,
                type,
                category,
                date,
                note: note || "",
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found",
            });
        }

        return res.status(200).json(transaction);

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: "Failed to update transaction",
        });

    }
});


// ======================
// Delete Transaction
// ======================

router.delete("/:id", authMiddleware, async (req, res) => {
    try {

        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId,
        });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found",
            });
        }

        return res.status(200).json({
            message: "Transaction deleted successfully",
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: "Failed to delete transaction",
        });

    }
});

module.exports = router;