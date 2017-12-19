const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').createServer(app);

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.use(bodyParser.urlencoded({extended: true}));

//处理付瑶的数据
let userInfoJsonStr = fs.readFileSync('fuyao.d/users.json', 'utf-8');
const userInfoAry = JSON.parse(userInfoJsonStr);
app.get('/fuyao/:pid', function (req, res) {
    // const pid = req.body.pid;
    let {pid} = req.params;
    console.log(pid);
    if (/^\d{11}$/.test(pid)) {
        const userObj = userInfoAry.filter((user) => {
            return user.pid === pid;
        });
        const userJsonStr = JSON.stringify(userObj);
        console.log(userJsonStr);
        res.send(userJsonStr);
    } else if (pid === 'all') {
        res.send(userInfoJsonStr);
    }else{
        res.send({abc:`
        Not Found. You must post a json string,
        which can be convert to a Object with a pid property,
        the value of this pid must be a number (11 bit),
        this pid represents a moble phone number.
        `});
    }
});

app.post('/fuyao', function (req, res) {
    let userObj = req.body;
    console.log(userObj);
    let {pid, username, password, email} = userObj;
    let hasBeenToken = '';
    const valid = !userInfoAry.some(function (item) {
        if(pid == item.pid) {
            hasBeenToken = 'pid';
            return true }
        if(username == item.username) {
            hasBeenToken = 'username';
            return true }
        if(email == item.email) {
            hasBeenToken = 'email';
            return true }
    });
    if(valid){
       userInfoAry.push({
           pid,
           username,
           password,
           email,
       });
       userInfoJsonStr = JSON.stringify(userInfoAry);
       fs.writeFile('fuyao.d/users.json', userInfoJsonStr, 'utf-8', function (err) {
           if(err){
               res.setHeader("statusCode", 512);
               res.send('用户信息写入失败!');
           }
           res.setHeader("statusCode", 200);
           res.send('用户注册成功！');
       });
    } else {
        res.setHeader("statusCode", 400);
        res.send(`${hasBeenToken} has already been token.`);
    }

});

const PORT = process.env.PORT || 10907;
server.listen(PORT, function () {
    console.log(`
    ${__filename} has run as a nodejs server,
    and has been listening at ${PORT} port.
    `);
});