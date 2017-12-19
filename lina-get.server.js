const fs = require('fs');
var express = require('express');
var app = express();

const PORT = process.env.PORT || 20907;
app.listen(PORT, function () {
    console.log(`
    ${__filename} has run as a nodejs server,
    and has been listening at ${PORT} port.
    `);
});

const log = console.log;
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
const ticketsJsonStr = fs.readFileSync('lina.d/tickets.json', 'utf-8');
const ticketsAry = JSON.parse(ticketsJsonStr);
app.get('/lina/:id', function (req, res) {
    let {id} = req.params;
    if (id == 'all') {
        res.send(ticketsJsonStr);
    }
    else if (/\d+/.test(id)) {
        const ticketObj = ticketsAry.filter((ticket) => {
            return ticket.id == id;
        });
        if (ticketObj === undefined) {
            res.setHeader('statusCode: 404')
            res.send('No ticket found, please check the ticket id after path /lina/.');
        }
        const ticketJsonStr = JSON.stringify(ticketObj);
        log(ticketJsonStr);
        res.send(ticketJsonStr);
    }
});


