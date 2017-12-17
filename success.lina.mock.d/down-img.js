const exec = require('shelljs').exec;
const fs = require('fs');
const linaObj = require('./lessons.js');
const list = linaObj.list;
const controller = 'lina';

list.forEach(function (item) {
    const id = item.id;
    if (!fs.existsSync(`./${id}`)) {
        exec(`mkdir ${id}`);
    }
    for (let key in item) {
        if (/^url(?:\d+)*$/.test(key)) {
            const uri = item[key];
            const filename = uri.match(/[^\/]+\.[\w-.]+$/)[0];
            const localImagePath = `./${id}/${filename}`;
            if (!fs.existsSync(localImagePath)) {
                exec(`
                    echo Downloading ${uri};
                    cd ${id};
                    wget ${uri}; 
                    cd ..;
                    echo Download for the ${uri} was Successed! It was store in ${localImagePath};
                    echo sleep 5 second, in order to avoid too much download task at the same time.
                    sleep 5;
                    echo sleep progress was completed.
               `)
            }
            const urlPath = `${controller}/${id}/${filename}`;
            item.url = urlPath;
        }
    }
});
console.log(JSON.stringify(list));
const listJsonStr = JSON.stringify(list);
const outputJsonFilePath = `./${controller}.json`;
fs.writeFileSync(outputJsonFilePath, listJsonStr, 'utf-8');
