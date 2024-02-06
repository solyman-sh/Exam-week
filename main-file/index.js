

const http = require('http');
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5500;


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});


const upload = multer({ storage: storage });


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


app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  res.send('File uploaded successfully: ' + req.file.filename);
});


const server = http.createServer(app);


server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});






















