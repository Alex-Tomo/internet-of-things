const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('dist'));

app.get('/', (req, res) => {
    
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));