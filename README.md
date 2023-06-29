### tujuan:
```
membandingan 2 folder, membandingkan struktur dan file-file yang ada di dalamnya apakah sama atau tidak
```

### contoh:
folder 1: ./f1/sub/file-diff.txt
```
console.log(your name)
nama saya
    lathif al leonhard
```

folder 2: ./f2/sub/file-diff.txt
```
console.log(your name)
nama saya
    lathif al rasyid
```

### run
```
index.js:
main('f1', 'f2')

$ npm init
$ npm start
```

### output
```
{
  same: false,
  the_diff: 'console.log(your name)\r\nnama saya\r\n    lathif al leonhard',
  file: '/sub/file-diff.txt'    
}
```

### other possible output
```
- have same folder structure and files
- have different folder structure or files name
```

### thx to
```
https://stackoverflow.com/a/45130990
```