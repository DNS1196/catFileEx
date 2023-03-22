const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path, outputFilePath) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.error(`#####${err}#####`);
            process.exit(1);
        }
        if (outputFilePath) {
            fs.writeFile(outputFilePath, data, function (err) {
                if (err) {
                    console.error(`Couldn't write ${outputFilePath}:`);
                    console.error(err);
                    process.exit(1);
                }
            });
        } else {
            console.log(data);
        }
    });
}

async function webCat(url, outputFilePath) {
    try {
        const res = await axios.get(url);
        const data = res.data;
        if (outputFilePath) {
            fs.writeFile(outputFilePath, data, function (err) {
                if (err) {
                    console.error(`Couldn't write ${outputFilePath}:`);
                    console.error(err);
                    process.exit(1);
                }
            });
        } else {
            console.log(data);
        }
    } catch (err) {
        console.error(`#####${err}#####`);
        process.exit(1);
    }
}

const args = process.argv.slice(2);

let outputFilePath = null;
let pathOrUrl = null;

if (args[0] === '--out') {
    outputFilePath = args[1];
    pathOrUrl = args[2];
} else {
    pathOrUrl = args[0];
}

if (pathOrUrl.slice(0, 4) === 'http') {
    webCat(pathOrUrl, outputFilePath);
} else {
    cat(pathOrUrl, outputFilePath);
}
