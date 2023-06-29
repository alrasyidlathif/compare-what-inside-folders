const fs = require('fs')
const { resolve } = require('path');
const { readdir } = require('fs').promises;

// thx to for this awesome function https://stackoverflow.com/a/45130990
async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

function readFile(name) {
    return new Promise((resolve, reject) => {
        fs.readFile(name, 'utf8', function (err, data) {
            if (err) { reject(err); }
            resolve(data);
        })
    })
}

function theDiff(s) {
    let the_diff = s
    if (i+50 <= s.length) {
        the_diff = s.substring(i,i+50)
    }
    else if (i-50 >= 0) {
        the_diff = s.substring(i-50,i)
    }
    return {same: false, the_diff};            
}

function compareString(s1, s2) {
    const thes = s1.length > s2.length ? s1 : s2;
    for (i=0; i<thes.length; i++) {
        if (!s1[i]) {
            return theDiff(s2)
        }
        else if (!s2[i]) {
            return theDiff(s1)
        }
        if (s1[i] !== s2[i]) {
            return theDiff(s1)
        }
    }
    return {same: true, the_diff: ''};
}

function haveSameFile(dir1, dir2, dir1root, dir2root) {
    const files = []
    if (dir1.length !== dir2.length) return 0
    for (dir_i = 0; dir_i<dir1.length; dir_i++) {
        if (
            dir1[dir_i].split(dir1root)[1] !== dir2[dir_i].split(dir2root)[1]
        ) {
            return 0
        }
        files.push(dir1[dir_i].split(dir1root)[1].replaceAll('\\','/'));
    }
    return files
}

function falseOnly(filesRes) {
    let same = 1
    for (fr of filesRes) {
        if (!fr.same) {
            console.log(fr)
            same = 0
        }
    }
    if (same) console.log('have same folder structure and files')
}

async function main (dir1root, dir2root) {
    const dirs1 = await getFiles(`./${dir1root}`)
    const dirs2 = await getFiles(`./${dir2root}`)

    const allfiles = haveSameFile(dirs1, dirs2, dir1root, dir2root);

    if (!allfiles) return console.log('have different folder structure or files name')

    const filesRes = [];

    for (const f of allfiles) {
        const data = await Promise.all([
            readFile(`./${dir1root}${f}`), 
            readFile(`./${dir2root}${f}`)
        ]);
        const file1 = data[0].toString();
        const file2 = data[1].toString();
        const res = compareString(file1, file2);
        filesRes.push({...res, file: f});
    }
    falseOnly(filesRes);
}

main('f1', 'f2')