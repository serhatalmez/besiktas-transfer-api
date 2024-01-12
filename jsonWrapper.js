// jsonWrapper.js

const fs = require('fs');

module.exports = {
  readJSON: (filePath) => {
    try {
      const jsonData = fs.readFileSync(filePath);
      return JSON.parse(jsonData);
    } catch (error) {
      console.error(`Error reading file: ${error}`);
      return null;
    }
  },
  
  writeJSON: (filePath, data) => {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      fs.writeFileSync(filePath, jsonData);
    } catch (error) {
      console.error(`Error writing file: ${error}`);
    }
  }
}