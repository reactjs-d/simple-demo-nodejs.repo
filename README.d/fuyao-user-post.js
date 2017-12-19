const xhr = new XMLHttpRequest();
let userJsonStr = '';
xhr.open('POST', 'http://localhost:10907/fuyao', false);
xhr.onload = function () {
    if(/^2\d{2}$/.test(xhr.statusCode)){
        userJsonStr = xhr.responseText;
        console.log(userJsonStr);
    }
};
console.log(xhr.onload);
xhr.send(
    {
        username: "王五一",
        password: "4443",
        pid: "11286563526",
        email: "523593273@qq.com"
    }
);