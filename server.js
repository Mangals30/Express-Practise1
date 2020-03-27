const  express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const fs = require('fs')
const os = require('os')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()

app.use(express.static('public'))
app.use((req,res,next) => {
    const url = require('url')
    const dateModule = require('./coreModules/date')
    const user = os.hostname
    const page = url
    const date = dateModule.dateToday()
    const content = ` The activity : \n Time: ${date} \n User : ${user} \n Page : ${page}`
    fs.appendFile('log.txt', content,(err)=> {
        if(err) {
            throw err
        }
        console.log('content appended')
       })
       next()
})

const students = [
    {
        id : 1,
        firstName : 'Mangalam',
        lastName :  'Krishnan',
        age : 25,
        country : 'India',
        skills : ['HTML','CSS','JS']
    },
    {   id : 2,
        firstName : 'Sharanya',
        lastName :  'Sanjay',
        age : 20,
        country : 'Finland',
        skills : ['React','Redux','Node']
    },
    {   id : 3,
        firstName : 'Shwetha',
        lastName :  'Sanjay',
        age : 7,
        country : 'Sweden',
        skills : ['Mongo','SQL','Node']
    },
    {   id : 4, 
        firstName : 'Sanjay',
        lastName :  'Jayaraman',
        age : 35,
        country : 'Belgium',
        skills : ['HTML','CSS','JS']
    }
]


app.get('/',(req,res) => {
  res.sendFile(__dirname + '/Views/index.html')
})
app.get('/about',(req,res) => {
    res.sendFile(__dirname + '/Views/about.html')
  })
  app.get('/contact',(req,res) => {
    res.sendFile(__dirname + '/Views/contact.html')
  })  
  app.get('/text',(req,res) => {
    res.send('Some text')
  })  
  app.get('/students',(req,res) => {
    res.send(students)
  })  
  app.get('/students/:id',(req,res) => {
     const id = req.params.id 
     const student = students.find(student => student.id==id || student.firstName.toLowerCase() == id.toLowerCase())
    res.send(student) 
  }) 
  app.post('/students',(req,res) => {
      console.log(req.body)
   res.send('Data has been created')
  })
  app.put('/students/:id',(req,res) => {
    const id = req.params.id  
    const student = students.map(student => {
        if(student.id==id) {
            req.body.id = id
            return req.body
        }
    })
    
   res.send('Data has been updated')
  })
  app.delete('/students/:id',(req,res) => {
    console.log('A student has been deleted')
   res.send('Data has been deleted')
  })


app.listen(PORT, () => {
   console.log(`server ${PORT}`)
})