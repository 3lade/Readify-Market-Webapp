const fs = require('fs');

const writeDataToFileUsingFileSystem = () => {
  const booksArray = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A classic novel set in the Jazz Age.',
      price: 300,
      stockQuantity: 10,
      category: 'Fiction',
      coverImage: 'https://8080-dffaacaeadb333087780defeaefeone.premiumproject.examly.io/images/gatsby.jpg'
    },
    {
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      description: 'An overview of cosmology and the universe.',
      price: 500,
      stockQuantity: 5,
      category: 'Science',
      coverImage: 'https://8080-dffaacaeadb333087780defeaefeone.premiumproject.examly.io/images/history.jpg'
    }
  ];

  try {
    const jsonData = JSON.stringify(booksArray, null, 2);
    fs.writeFileSync('booksData.json', jsonData);
    console.log('Data has been written to booksData.json');
  } catch (error) {
    console.error('Error writing to file:', error);
  }
};

const readDataAndPrintUsingFileSystem = () => {
  try {
    const data = fs.readFileSync('booksData.json', 'utf8');
    const readData = JSON.parse(data);
    
    readData.forEach((book, index) => {
      console.log(`${index + 1}. Title: ${book.title}, Author: ${book.author}, Price: ${book.price}`);
    });
  } catch (error) {
    console.error('Error reading file:', error);
  }
};

module.exports = {
  writeDataToFileUsingFileSystem,
  readDataAndPrintUsingFileSystem
};