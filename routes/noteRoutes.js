const express = require('express');
const Note = require('../models/NoteModel');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({ title, content, user: req.user._id });
  await newNote.save();
  res.status(201).json(newNote);
});

router.get('/', verifyToken, async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

module.exports = router;