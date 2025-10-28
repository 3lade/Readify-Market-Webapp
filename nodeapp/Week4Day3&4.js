const fs = require('fs');

let dataArray = [];

// Day 3 Functions
const addData = (userData, callback) => {
  try {
    dataArray.push(userData);
    if (callback) {
      callback(null, userData);
    }
  } catch (error) {
    console.error('Error adding data:', error);
    if (callback) {
      callback(error, null);
    }
  }
};

const displayData = () => {
  dataArray.forEach((user, index) => {
    console.log(`${index + 1}. Username: ${user.username}, Email: ${user.email}, Mobile: ${user.mobileNumber}, Role: ${user.userRole}`);
  });
};

const callbackFunction = (err, addedUserData) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('User data added successfully:', addedUserData);
  }
};

// Day 4 Functions
const writeDataToFile = () => {
  const writeStream = fs.createWriteStream('userData.json');
  writeStream.write(JSON.stringify(dataArray, null, 2));
  writeStream.end();
  console.log('Data has been written to userData.json using streams');
};

const readDataAndPrint = () => {
  try {
    const readStream = fs.createReadStream('userData.json', { encoding: 'utf8' });
    let data = '';
    
    readStream.on('data', (chunk) => {
      data += chunk;
    });
    
    readStream.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        console.log('User Data from file:', parsedData);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
      }
    });
    
    readStream.on('error', (error) => {
      console.error('Error reading file:', error);
    });
  } catch (error) {
    console.error('Error creating read stream:', error);
  }
};

module.exports = {
  addData,
  displayData,
  callbackFunction,
  writeDataToFile,
  readDataAndPrint
};