const request = require('request');
const fs = require('fs');
const readline = require('readline');

const fetch = function() {
  const input = process.argv.slice(2);
  const url = input[0];
  const newFile = input[1];
  
  request(`${url}`, (error, response, body) => {
    if (error) {
      console.log('error:', error); 
      return;
    }
    
    if (response.statusCode === 200) {
      if (fs.existsSync(newFile)) {
        duplicateFile(newFile, body);
      } else {
        addFile(newFile, body);
      }
    }
  });
}

const duplicateFile = function(newFile, body) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });

  rl.question("This file aready exists. Do you want to override the file? Press 'y' to continue ", (answer) => {
    rl.close();
    if (answer === 'y') {
      addFile(newFile, body);
    } else if (answer !== 'y') {
      console.log(`You've cancelled the file creation`);
    }
  });

};

const addFile = function(newFile, body) {
  fs.writeFile(newFile, body, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Downloaded and saved ${body.length} bytes to ${newFile}`);
  });
};

fetch();