const fs = require('fs');
const path = require('path');

const booksDataFile = path.join(__dirname, '../booksData.json');
let booksData = [];

// Initialize data from file
if (fs.existsSync(booksDataFile)) {
  const rawData = fs.readFileSync(booksDataFile, 'utf8');
  booksData = rawData.trim() ? JSON.parse(rawData) : [];
}

const addBook_fs = (req, res) => {
  try {
    const { title, author, description, price, stockQuantity, category, coverImage } = req.body;
    
    // Check if book already exists
    const existingBook = booksData.find(book => book.title === title && book.author === author);
    if (existingBook) {
      return res.status(400).json({ error: true, message: 'Book already exists', data: null });
    }
    
    const newBook = {
      id: booksData.length + 1,
      title,
      author,
      description,
      price,
      stockQuantity,
      category,
      coverImage
    };
    
    booksData.push(newBook);
    fs.writeFileSync(booksDataFile, JSON.stringify(booksData, null, 2));
    
    res.status(201).json({ error: false, message: 'Book Added Successfully', data: newBook });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const getAllBooks_fs = (req, res) => {
  try {
    res.status(200).json({ error: false, message: 'All Books found successfully', data: booksData });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const getBookById_fs = (req, res) => {
  try {
    const { id } = req.params;
    const book = booksData.find(b => b.id == id);
    
    if (!book) {
      return res.status(404).json({ error: true, message: `No book found with ID ${id}` });
    }
    
    res.status(200).json({ error: false, message: 'Book found successfully', data: book });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const deleteBookById_fs = (req, res) => {
  try {
    const { id } = req.params;
    const bookIndex = booksData.findIndex(b => b.id == id);
    
    if (bookIndex === -1) {
      return res.status(404).json({ error: true, message: `No book found with ID ${id}` });
    }
    
    const deletedBook = booksData.splice(bookIndex, 1)[0];
    fs.writeFileSync(booksDataFile, JSON.stringify(booksData, null, 2));
    
    res.status(200).json({ error: false, message: 'Book Deleted Successfully', data: deletedBook });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

module.exports = {
  addBook_fs,
  getAllBooks_fs,
  getBookById_fs,
  deleteBookById_fs
};