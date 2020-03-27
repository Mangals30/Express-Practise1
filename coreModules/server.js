const http = require('http')
const fs = require('fs')
const squareModule = require('./square')

const {square,PI,name} = squareModule
console.log(square(2))
console.log(PI)
console.log(name('Mangalam','Krishnan'))
http.createServer((req,res) => {
    
    fs.appendFile('log.txt', content,(err)=> {
     if(err) {
         throw err
     }
     console.log('content appended')
    })
    res.writeHead(200,{ContentType : 'text/html'})
    res.end()
}).listen(5000)