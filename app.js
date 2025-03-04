const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'temp', 'index.html'));
  })
  
const port = 3000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
    
});


