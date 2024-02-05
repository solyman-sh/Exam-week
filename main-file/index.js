// var express = require('express');
// var multer = require('multer');

// var app = express();

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// })


// var upload = multer({ storage: storage }).single('file')


// app.post('/', function (req, res) {

//     upload(req, res, function (err) {
//         if (err) {
//             return res.end('Error uploading file');
//         }
//         res.end('File uploaded');
//     });
// } );



// app.listen(3000, function () {
//     console.log('Example app listening on port 3000!');
// });


// app.js

const http = require('http');
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5500;

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Create Multer instance
const upload = multer({ storage: storage });

// Set up routes
app.get('/', (req, res) => {
  res.end('This is Home Page');
});

app.get('/about', (req, res) => {
  res.end('This is About Page');
});

app.get('/contact', (req, res) => {
  res.end('This is Contact Page');
});

app.get('/file-write', (req, res) => {
  const content = 'hello world';

  fs.writeFile('demo.txt', content, (err) => {
    if (err) {
      console.error(err);
      res.status(500).end('Internal Server Error');
    } else {
      res.end('File "demo.txt" created and content written successfully.');
    }
  });
});

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  res.send('File uploaded successfully: ' + req.file.filename);
});

// Create HTTP server
const server = http.createServer(app);

// Listen on port 5500
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});











