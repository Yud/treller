const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({ name: String });

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
