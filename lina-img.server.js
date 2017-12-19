const express = require('express');
const app = express();
app.use('/lina', express.static('.clina.d/img'));
const PORT = process.env.PORT || 30907;
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
app.listen(PORT, function () {
    console.log(`
    ${__filename} has run as a nodejs server,
    and has been listening at ${PORT} port.
    `);
});
