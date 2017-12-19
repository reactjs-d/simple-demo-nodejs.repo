const exec = require('shelljs').exec;
const fs = require('fs');
const linaObj = require('./lessons.js');
const list = linaObj.list;
const imgDirName = `img`;
if (!fs.existsSync(`./${imgDirName}`)) {
    exec(`
        mkdir ${imgDirName};
    `);
}
list.forEach(function (item) {
    const id = item.id;
    const idDir = `./${imgDirName}/${id}`;
    if (!fs.existsSync(`./${idDir}`)) {
        exec(`mkdir ${idDir}`);
    }
    for (let key in item) {
        if (/^url(?:\d+)*$/.test(key)) {
            const uri = item[key];
            const filename = uri.match(/[^\/]+\.[\w-.]+$/)[0];
            const localImagePath = `${idDir}/${filename}`;
            if (!fs.existsSync(localImagePath)) {
                exec(`
                    echo Downloading ${uri};
                    cd ${idDir};
                    pwd;
                    wget ${uri}; 
                    cd ../..;
                    echo Download for the ${uri} was Successed! It was store in ${localImagePath};
                    echo sleep 5 second, in order to avoid too much download task at the same time.
                    sleep 3;
                    echo sleep progress was completed.
               `)
            }
            const nonDotIdDir = idDir.substr(2);
            const urlPath = `http://icccc.cc:30907/${nonDotIdDir}/${filename}`;
            // const urlPath = path.resolve(controller, nonDotIdDir, filename);
            item[key] = urlPath;
        }
    }
});
console.log(JSON.stringify(list));
const listJsonStr = JSON.stringify(list);
const outputJsonFilePath = `./tickets.json`;
fs.writeFileSync(outputJsonFilePath, listJsonStr, 'utf-8');
