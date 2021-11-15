const {checkCard} = require('./read');

const express = require('express');
const cors = require('cors');
const app = express();

const port = 8080;
var total = 0;

setInterval(() => {
    flag = checkCard();
    if(flag) {
        total += 10;
        console.log("New total: " + total);
    }
}, 500);

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({tot: total});
})

app.post('/setAmount', (req, res) => {
    var amount = req.body.amountSet;
    total = parseInt(total) + parseInt(amount,10);

    console.log(`total: ${total}`);
    res.send(req.body);
})

app.listen(port, () => {
    console.log(`server started on port: ${port}`);
})
